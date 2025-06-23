import { FilterQuery } from "mongoose";
import { IUser } from "../../models/user.model";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<IUser> {
  // updateById(userId: string, updateData: Partial<IUser>): Promise<IUser | null>;
  findUserById(userId: string): Promise<IUser | null>;
  // findUserByGoogleId(googleId: string): Promise<IUser | null>;
  // getAdminDashboardData():Promise<any>
  findAllUsers(skip: number, limit: number, filter:FilterQuery<IUser>): Promise<IUser[] | null>
}