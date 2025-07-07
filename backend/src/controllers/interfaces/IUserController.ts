import { NextFunction, Request, RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../../types/custom";

export interface IUserController {
//   updateProfile: RequestHandler;
//   changePassword: RequestHandler;
//   getUserProfile: RequestHandler;
  becomeInstructor: (req: AuthenticatedRequest, res: Response) => Promise<void>;
  getAllUsers: RequestHandler;
  toggleUserStatus: RequestHandler;
//   getDashboardData: RequestHandler;
}