import { FilterQuery } from "mongoose";

import { IUserRepository } from "./interfaces/IUserRepository";

import { IUser, User } from "../models/user.model";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {

    constructor() {
    super(User);
  }

  async findUserById(userId: string):Promise<IUser| null> {
    return await User.findById(userId)
  }


  async toggleStatus(id: string): Promise<IUser | null> {
      return await User.findByIdAndUpdate(id, 
        [
          {
            $set: {
              status: {
                $cond: { if: { $eq: ["$status", "active"] }, then: "blocked", else: "active" },
              },
            },
          },
        ],
        { new: true }
      )
  }

  async findAllUsers(skip: number, limit: number, filter:FilterQuery<IUser>): Promise<IUser[] | null> {
    return await User.find(filter).skip(skip).limit(limit)
  }

  async findUserByGoogleId(googleId: string): Promise<IUser | null> {
      return await User.findOne({googleId})
  }

  async updateById(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
      return await User.findByIdAndUpdate(userId, updateData,{new:true})
  }
}