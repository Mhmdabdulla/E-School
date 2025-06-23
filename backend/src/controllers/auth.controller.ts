// src/controllers/auth.controller.ts
import { Request, RequestHandler, Response } from "express";
import { AuthService } from "../services/auth.service";
import {STATUS_CODES, MESSAGES} from "../utils/constants"
import { IAuthController } from "./interfaces/IAuthController";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

const authService = new AuthService();

export class AuthController implements IAuthController{
  async register(req: Request, res: Response):Promise<void> {
    const { name, email, password } = req.body;
    try {
      await authService.register(name, email, password);
      res.status(STATUS_CODES.CREATED).json({ message: MESSAGES.SUCCESS.SIGNUP });
    } catch (e) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: (e as Error).message });
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      const tokens = await authService.verifyOtp(req.body.email, req.body.otp);
      res.status(STATUS_CODES.OK).json(tokens);
    } catch (e) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: (e as Error).message });
    }
  }

    async resendOtp(req: Request, res: Response) {
    try {
      await authService.resendOtp(req.body.email);
      res.status(STATUS_CODES.OK).json({ message: "OTP resent to email" });
    } catch (e) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: (e as Error).message });
    }
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { email,password } = req.body 
    const { refreshToken, ...user } = await authService.login(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(STATUS_CODES.OK).json(user);
  };
  
  
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    console.log(req)
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(403).json({ error: "Refresh token required" });
      return;
    }

    const { role } = req.body;
    const { accessToken, user } = await authService.refreshAccessToken(refreshToken);
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
    await authService.sendMagicLink(email);
    res.status(STATUS_CODES.OK).json({ message: "A reset link has been sent to your email" });
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.status(STATUS_CODES.OK).json({ message: "password reseted successfully" });
  };

   adminLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const { refreshToken, ...user } = await authService.adminLogin(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(STATUS_CODES.OK).json(user);
  };


}
