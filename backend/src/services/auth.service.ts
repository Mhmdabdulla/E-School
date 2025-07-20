// src/services/auth.service.ts

import { IAuthService } from "./interfaces/IAuthService";
import { hashPassword, comparePassword } from "../utils/password";

import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { sendForgotPasswordMail, sendOtpEmail } from "../utils/emailService";
import RedisClient from "../config/redis";
import {
  generateAccessToken,
  generateRefreshToken,
  resetPasswordTocken,
  verifyRefreshToken,
  verifyResetToken,
} from "../utils/jwt";
import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { refreshedUser, verifiedUer } from "../types/userTypes";
import { LoginResponseDTO } from "../dto/response/auth.response.dto";
import logger from "../config/logger";
import { AppError } from "../utils/AppError";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(TYPES.AuthRepository) private repo: IAuthRepository) {}
  // private repo: IAuthRepository = new AuthRepository();

  async register(name: string, email: string, password: string): Promise<void> {
    logger.info(`Register attempt for ${email}`);
    const existing = await this.repo.findUserByEmail(email);
    if (existing)
      throw new AppError("Email already exists", STATUS_CODES.BAD_REQUEST);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    logger.debug(`Generated OTP for ${email}: ${otp}`);

    const hashedPassword = await hashPassword(password);

    await sendOtpEmail(email, otp);

    await RedisClient.setex(`otp:${email}`, 150, JSON.stringify({ otp }));
    await RedisClient.setex(
      `user_session:${email}`,
      600,
      JSON.stringify({ name, email, hashedPassword })
    );
  }

  async verifyOtp(email: string, otp: string): Promise<verifiedUer> {
    const data = await RedisClient.get(`otp:${email}`);
    if (!data)
      throw new AppError("OTP expired or invalid", STATUS_CODES.UNAUTHORIZED);

    const { otp: storedOtp } = JSON.parse(data);
    if (otp !== storedOtp)
      throw new AppError("Invalid OTP", STATUS_CODES.BAD_REQUEST);

    const userData = await RedisClient.get(`user_session:${email}`);
    if (!userData)
      throw new AppError(
        "User data not found. Please register again",
        STATUS_CODES.UNAUTHORIZED
      );

    const { name, hashedPassword } = JSON.parse(userData);

    const user = await this.repo.createUser(name, email, hashedPassword);
    if (!user)
      throw new AppError(
        "Cannot create account. Please try again",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    const userId = user._id;
    const accessToken = generateAccessToken(userId, "user");
    const refreshToken = generateRefreshToken(userId, "user");

    await RedisClient.del(`otp:${email}`);
    await RedisClient.del(`user_session:${email}`);

    logger.info(`User registered successfully: ${email}`);

    return {
      accessToken,
      refreshToken,
      user: LoginResponseDTO.fromEntity(user),
    };
  }

  async resendOtp(email: string): Promise<void> {
    const user = await RedisClient.get(`user_session:${email}`);
    if (!user)
      throw new AppError(
        "User session expired. Please register again",
        STATUS_CODES.UNAUTHORIZED
      );

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOtpEmail(email, otp);

    await RedisClient.setex(`otp:${email}`, 120, JSON.stringify({ otp }));
  }

  async login(email: string, password: string): Promise<verifiedUer> {
    const user = await this.repo.findUserByEmail(email);
    if (!user)
      throw new AppError("Invalid email address", STATUS_CODES.NOT_FOUND);

    if (user.role === "admin") {
      throw new AppError("Access denied: Not an User", STATUS_CODES.FORBIDDEN);
    }

    if ("status" in user && user.status === "blocked") {
      logger.warn(`Blocked user tried to login: ${email}`);
      throw new AppError("you have been blocked", STATUS_CODES.FORBIDDEN);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      logger.error(`Invalid password for: ${email}`);
      throw new AppError("Incorrect password", STATUS_CODES.UNAUTHORIZED);
    }
    const userId = user._id;
    const accessToken = generateAccessToken(userId, user.role);
    const refreshToken = generateRefreshToken(userId, user.role);

    return {
      accessToken,
      refreshToken,
      user: LoginResponseDTO.fromEntity(user),
    };
  }

  async adminLogin(email: string, password: string): Promise<verifiedUer> {
    const user = await this.repo.findUserByEmail(email);
    if (!user) {
      throw new AppError("Invalid email address", STATUS_CODES.NOT_FOUND);
    }

    if (user.role !== "admin") {
      logger.error(`Non-admin tried admin login: ${email}`);
      throw new AppError("Access denied: Not an admin", STATUS_CODES.FORBIDDEN);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Incorrect Credentials", STATUS_CODES.UNAUTHORIZED);
    }

    const userId = user._id;
    const accessToken = generateAccessToken(userId.toString(), user.role);
    const refreshToken = generateRefreshToken(userId.toString(), user.role);

    return {
      accessToken,
      refreshToken,
      user: LoginResponseDTO.fromEntity(user),
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<refreshedUser> {
    try {
      const decoded = await verifyRefreshToken(refreshToken);
      const userId = decoded.userId;
      const role = decoded.role;
      const newAccessToken = generateAccessToken(userId.toString(), role);
      const user = await this.repo.findUserById(decoded.userId);

      if (!user) {
        throw new AppError("User not found", STATUS_CODES.NOT_FOUND);
      }

      return { accessToken: newAccessToken, user };
    } catch (error) {
      logger.error("Invalid refresh token", error);
      throw new AppError("Invalid refresh token", STATUS_CODES.UNAUTHORIZED);
    }
  }

  async sendMagicLink(email: string): Promise<void> {
    try {
      const user = await this.repo.findUserByEmail(email);
      if (!user)
        throw new AppError("Invalid email address", STATUS_CODES.NOT_FOUND);
      const token = resetPasswordTocken(user.id, email);
      const magicLink = `${process.env.CLIENT_URL}/login?token=${token}`;
      logger.debug(`Generated magic link: ${magicLink}`);
      await sendForgotPasswordMail(email, magicLink);
      await RedisClient.setex(
        `magicLink:${email}`,
        900,
        JSON.stringify({ magicLink })
      );
      // const link = await RedisClient.get(`magicLink:${email}`);
    } catch (error: any) {
      logger.error(`Error sending magic link: ${error.message}`);
      throw new Error(error.message);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const { userId, email, purpose } = await verifyResetToken(
        token,
        "reset-password"
      );
      if (!userId || purpose !== "reset-password") {
        logger.error(`Invalid or expired reset token`);
        throw new AppError("Invalid or expired token", STATUS_CODES.UNAUTHORIZED);
      }

      const hashedPassword = await hashPassword(newPassword);

      await this.repo.updateUserPassword(userId, hashedPassword);

      await RedisClient.del(`magicLink:${email}`);
    } catch (error: any) {
      throw new AppError(error.message, STATUS_CODES.BAD_REQUEST);
    }
  }
}
