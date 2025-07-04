import { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { FilterQuery } from "mongoose";
import { inject, injectable } from "inversify";
import TYPES from "../di/types";

@injectable()
export class UserService  implements IUserService {

  constructor(
    @inject(TYPES.UserRepository) private userRepository:IUserRepository
  ){}
    
  async getAllUsers(page: number, limit: number, searchQuery?: string): Promise<any | null> {
    const skip = (Number(page) - 1) * Number(limit);

    let filter: FilterQuery<IUser> = { role: "user" };
    if (searchQuery) {
      filter = {
        ...filter,
        $or: [{ name: { $regex: searchQuery, $options: "i" } }, { email: { $regex: searchQuery, $options: "i" } }],
      };
    }

    const totalUsers = await this.userRepository.countDocuments(filter);
    const users = await this.userRepository.findAllUsers(skip, limit, filter)

    return {
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      users,
    };
  }
    async findUserByGoogleId(googleId: string): Promise<IUser | null> {
    return await this.userRepository.findUserByGoogleId(googleId);
  }

  async createGoogleUser(
    name: string,
    email: string,
    profileImageUrl: string,
    googleId: string
  ): Promise<IUser | null> {
    const password = await bcrypt.hash(Math.random().toString(36).substring(2, 10), 10);
    const user = this.userRepository.create({ name, email, profileImageUrl, googleId, password });
    if (!user) {
      throw new Error("cannot create user please try again");
    }
    return user;
  }

}