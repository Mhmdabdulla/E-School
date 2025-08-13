// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import {STATUS_CODES, MESSAGES} from "../utils/constants"
import { IAuthController } from "./interfaces/IAuthController";
import { IUserService } from "../services/interfaces/IUserService";
import { generateRefreshToken } from "../utils/jwt";
import { IAuthService } from "../services/interfaces/IAuthService";
import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import logger from "../config/logger";


@injectable()
export class AuthController implements IAuthController{
  constructor(
    @inject(TYPES.AuthService) private authService:IAuthService,
    @inject(TYPES.UserService) private userService:IUserService
  ){}

  register = async (req: Request, res: Response):Promise<void> =>{
    const { name, email, password } = req.body;

      await this.authService.register(name, email, password);
      res.status(STATUS_CODES.CREATED).json({ message: MESSAGES.SUCCESS.SIGNUP });

  }

  verifyOtp = async (req: Request, res: Response) =>{

    const { refreshToken, ...user } = await this.authService.verifyOtp(req.body.email, req.body.otp);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(STATUS_CODES.OK).json(user);

  }

    resendOtp = async (req: Request, res: Response) => {

      await this.authService.resendOtp(req.body.email);
      res.status(STATUS_CODES.OK).json({ message: "OTP resent to email" });
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { email,password } = req.body 
    const { refreshToken, ...user } = await this.authService.login(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(STATUS_CODES.OK).json(user);
  };
  
  
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(403).json({ error: "Refresh token required" });
      return;
    }

    const { accessToken, user } = await this.authService.refreshAccessToken(refreshToken);
    res.status(STATUS_CODES.OK).json({ accessToken, user });
  };
  logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(STATUS_CODES.OK).json({ message: "Logged out successfully" });
  };

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    await this.authService.sendMagicLink(email);
    res.status(STATUS_CODES.OK).json({ message: "A reset link has been sent to your email" });
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;
    await this.authService.resetPassword(token, newPassword);
    res.status(STATUS_CODES.OK).json({ message: "password reseted successfully" });
  };

  adminLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const { refreshToken, ...user } = await this.authService.adminLogin(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(STATUS_CODES.OK).json(user);
  };

    googleAuth = async (req: Request, res: Response): Promise<void> => {
    const { id, displayName, emails, photos } = req.user as any;

    if (!emails || emails.length === 0) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    //add _ before variables
    const email = emails[0].value;
    const profileImageUrl = photos ? photos[0].value : null;

    let user = await this.userService.findUserByGoogleId(id);
    if (!user) {
      user = await this.userService.createGoogleUser(displayName, email, profileImageUrl, id);
    }

    if (!user || !user.id) { 
    logger.error("User or user ID not found after fetch/create");
    res.status(500).json({ message: "Failed to authenticate user" });
    return;
  }

    console.log(user.id, user)
    const refreshToken = generateRefreshToken(user.id, "user");
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.redirect(process.env.CLIENT_URL!);
  };


}
