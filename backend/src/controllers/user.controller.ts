import { Request,  Response } from "express";
import { IUserController } from "./interfaces/IUserController";
import { IUserService } from '../services/interfaces/IUserService';
import {STATUS_CODES} from "../utils/constants"
import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { uploadImageToS3 } from "../utils/s3Services";



@injectable()
export class UserController implements IUserController {
   constructor(
    @inject(TYPES.UserService) private userService: IUserService
   ){} 


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

  toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    await this.userService.toggleStatus(userId);
    res.status(STATUS_CODES.OK).json({ message: "user status changed successfully" });
  };

 becomeInstructor = async(req:Request,res:Response):Promise<void>=>{
      const instructorData = req.body;
      console.log('user in user.controller',req.user)
    instructorData.userId =  req.user?._id;
    
    if (!req.file) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "file not found" });
      return;
    }

    // Upload to S3
    const mimeType = req.file.mimetype;
    const buffer = req.file.buffer;

    const imageUrl = await uploadImageToS3(buffer, "instructor/idCards", mimeType);

    if (!imageUrl) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Failed to upload image" });
      return;
    }
    console.log(imageUrl)

    instructorData.idCardImageUrl = imageUrl;

    await this.userService.becomeInstructor(instructorData);

    res.status(STATUS_CODES.OK).json({ message: "application submitted successfully" });
 }

 getUserProfile = async (req:Request, res:Response):Promise<void> => {
  const userId = req.user?._id as string;

    const user = await this.userService.getUserProfile(userId);

    if (user.status === "blocked") {
      res.status(STATUS_CODES.FORBIDDEN).json({ message: "you have been blocked" });
      return;
    }

    res.status(STATUS_CODES.OK).json({ user });
 }

 updateProfile = async (req:Request, res:Response): Promise<void> => {
  const userId = req.user?._id as string;
    const { name, title } = req.body;

    const updateData: { name: any; title: any; profileImageUrl?: string } = {
      name,
      title,
    };

    if (req.file) {
      const url = await uploadImageToS3(req.file.buffer, "users/profileImages",req.file.mimetype);
      if (url) updateData.profileImageUrl = url;
    }

    const response = await this.userService.updateUser(userId, updateData);
    res.status(STATUS_CODES.OK).json({ message: "user updated successfully", user: response });
 }

 changePassword = async (req:Request, res:Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body;
    const userId = req.user?._id as string;
    const updatedUser = await this.userService.changePassword(userId, currentPassword, newPassword);
    if (!updatedUser || updatedUser instanceof Error) {
      console.log(updatedUser);
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "please check the given passwords" });
      return;
    }

    res.status(STATUS_CODES.OK).json({ message: "password changed successfully" });
 }


 getDashboardData = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id as string;
    const dashboardData = await this.userService.getDashboardData(userId);
    res.status(STATUS_CODES.OK).json({ message: "user dashboard fetched successfully", dashboardData });
  };

}