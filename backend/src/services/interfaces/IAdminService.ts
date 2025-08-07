import { IUser } from "../../models/user.model";
import { AdminDashboardStats } from "../../types/userTypes";

export interface IAdminService {
    getUsers(): Promise<IUser[]>;
    toggleUserStatus(userId: string): Promise<IUser|null>;
     getDashboardDetails():Promise<AdminDashboardStats>
  }