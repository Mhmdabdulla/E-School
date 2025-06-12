// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      await authService.register(name, email, password);
      res.status(201).json({ message: "Registered successfully" });
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  }

  async sendOtp(req: Request, res: Response) {
    try {
      await authService.sendOTP(req.body.email);
      res.status(200).json({ message: "OTP sent to email" });
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      const tokens = await authService.verifyOTP(req.body.userId, req.body.otp);
      res.status(200).json(tokens);
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const tokens = await authService.login(req.body.email, req.body.password);
      res.status(200).json(tokens);
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const tokens = await authService.refreshToken(req.body.refreshToken);
      res.status(200).json(tokens);
    } catch (e) {
      res.status(403).json({ error: (e as Error).message });
    }
  }

  async logout(req: Request & any, res: Response) {
    try {
      await authService.logout(req.user.id);
      res.status(200).json({ message: "Logged out" });
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  }
}
