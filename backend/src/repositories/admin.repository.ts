import { injectable } from "inversify";
import { IAdminRepository } from "./interfaces/IAdminRepository";
import { IUser, User } from "../models/user.model";



@injectable()
export class AdminRepository implements IAdminRepository{

  async getUsers(): Promise<IUser[]> {
    return await User.find({ role: "user" }).select('-password -__v');
  }

  async toggleUserStatus(userId: string): Promise<IUser|null> {
    const user: IUser | null = await User.findById(userId).select('-password -__v');

    if (!user) throw new Error("user not found");

    user.status = user.status === "active" ? "blocked" : "active";

    await user.save();
    return user;
  }
}