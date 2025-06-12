// src/services/auth.service.ts
import { IAuthService } from "./interfaces/IAuthService";
import { AuthRepository } from "../repositories/auth.repository";
import {
  hashPassword,
  comparePassword
} from "../utils/password";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../utils/jwt";
import { transporter } from "../config/mail.config";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";

export class AuthService implements IAuthService {
  private repo: IAuthRepository = new AuthRepository();

  async register(name: string, email: string, password: string): Promise<void> {
    const existing = await this.repo.findByEmail(email);
    if (existing) throw new Error("Email already exists");
    const hashed = await hashPassword(password);
    console.log('i am working')
    await this.repo.createUser(name, email, hashed);
  }

  async sendOTP(email: string): Promise<void> {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await this.repo.saveOTP(user._id.toString(), otp, expires);

    await transporter.sendMail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. Expires in 10 minutes.`
    });
  }

  async verifyOTP(userId: string, otp: string) {
    const user = await this.repo.verifyOTP(userId, otp);
    if (!user) throw new Error("Invalid or expired OTP");

    user.otp = undefined!;
    user.otpExpires = undefined!;
    await user.save();

    const accessToken = generateAccessToken(userId, user.role);
    const refreshToken = generateRefreshToken(userId, user.role);
    await this.repo.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");
    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString(), user.role);
    await this.repo.saveRefreshToken(user._id.toString(), refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(oldToken: string) {
    const payload = verifyRefreshToken(oldToken);
    const user = await this.repo.findById(payload.id);
    if (!user || user.refreshToken !== oldToken) throw new Error("Invalid refresh token");

    const accessToken = generateAccessToken(payload.id, payload.role);
    const refreshToken = generateRefreshToken(payload.id, payload.role);
    await this.repo.saveRefreshToken(payload.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    await this.repo.removeRefreshToken(userId);
  }
}
