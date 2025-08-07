import { IUser } from "../../models/user.model";

export interface IAdminRepository {
  getUsers(): Promise<IUser[]>;
  toggleUserStatus(userId: string): Promise<IUser | null>;
}