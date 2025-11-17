import { BecomeInstructorResponseDTO } from "../../dto/response/instructor.response.dto";
import { GoogleAuthUserIdDTO, UserResponseDTO } from "../../dto/response/user.response.dto";
import { IInstructor } from "../../models/instructor.model";
import { IUser } from "../../models/user.model";
import { DashboardData, PaginatedUsersResponse } from "../../types/userTypes";

import { IBaseService } from "./IBaseService";

export interface IUserService extends IBaseService<IUser> {
  updateUser(userId: string, updateData: Partial<IUser>): Promise<UserResponseDTO>;
  changePassword(userId: string,currentPassword: string,newPassword: string): Promise<UserResponseDTO>;
  getUserProfile(userId: string): Promise<UserResponseDTO>;
  becomeInstructor(instructorData:Partial<IInstructor>): Promise<BecomeInstructorResponseDTO|null>
  findUserByGoogleId(googleId:string):Promise<GoogleAuthUserIdDTO | null>
  createGoogleUser(name:string, email:string, profileImageUrl?:string,googleId?:string): Promise<GoogleAuthUserIdDTO | null>
  getDashboardData(userId: string): Promise<DashboardData>
  getAllUsers(page: number, limit: number, searchQuery?: string): Promise<PaginatedUsersResponse | null> 
}