import { Request, Response } from "express";
import { IUserController } from "./interfaces/IUserController";
import { IUserService } from '../services/interfaces/IUserService';import {STATUS_CODES, MESSAGES} from "../utils/constants"
import { UserService } from "../services/user.service";


export class UserController implements IUserController {
   private userService: IUserService = new UserService()


  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.searchQuery as string)?.trim() || '';

    const usersWithPagination = await this.userService.getAllUsers(page, limit, search)
    if (!usersWithPagination) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "users not found" });
      return;
    }
    res.status(STATUS_CODES.OK).json({ usersWithPagination });
  };

//   toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
//     const { userId } = req.params;
//     const user = await this.userService.toggleStatus(userId);
//     res.status(StatusCodes.OK).json({ message: "user status changed successfully" });
//   };



}