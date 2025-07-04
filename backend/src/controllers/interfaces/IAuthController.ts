import { Request, RequestHandler, Response } from "express";

export interface IAuthController {
  register: RequestHandler;
  verifyOtp: RequestHandler;
  resendOtp: RequestHandler;
  adminLogin: RequestHandler;
  login: RequestHandler;
  refreshToken: RequestHandler;
  logout: RequestHandler;
  forgotPassword: RequestHandler;
  resetPassword: RequestHandler;
  googleAuth: RequestHandler;
}