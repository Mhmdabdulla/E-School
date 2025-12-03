import { FilterQuery } from "mongoose";

import { IUserRepository } from "./interfaces/IUserRepository";

import { IUser, User } from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { AdminDashboardStats } from "../types/userTypes";

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
      ).select('-password -__v')
  }

  async findAllUsers(skip: number, limit: number, filter:FilterQuery<IUser>): Promise<IUser[] | null> {
    return await User.find(filter)
    .skip(skip).limit(limit)
  }

  async findUserByGoogleId(googleId: string): Promise<IUser | null> {
      return await User.findOne({googleId}).select('-password -__v')
  }

  async updateById(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
      return await User.findByIdAndUpdate(userId, updateData,{new:true}).select('-password -__v')
  }

  async getAdminDashboardData():Promise<AdminDashboardStats>{
    const result = await User.aggregate([
      {
        $facet: {
          totalUsers: [
            { $match: { role: 'user' } },  // Match users with the role 'user'
            { $count: 'count' }            // Count the number of users
          ],
          totalTutors: [
            { $match: { role: 'instructor' } },  // Match instructors
            { $count: 'count' }                  // Count the number of instructors
          ],
          totalCourses: [
            { $lookup: {  
                from: 'courses',            // Lookup from the 'courses' collection
                pipeline: [{ $count: 'count' }],  // Count the total number of courses
                as: 'courses'               // Store the result in 'courses'
            }},
            { $project: { totalCourses: { $ifNull: [{ $arrayElemAt: ['$courses.count', 0] }, 0] } } } // Safely extract the count or return 0 if no courses
          ]
        }
      },
      {
        $project: {
          totalUsers: { $ifNull: [{ $arrayElemAt: ['$totalUsers.count', 0] }, 0] },
          totalTutors: { $ifNull: [{ $arrayElemAt: ['$totalTutors.count', 0] }, 0] },
          totalCourses: { $ifNull: [{ $arrayElemAt: ['$totalCourses.totalCourses', 0] }, 0] }
        }
      }
    ]);
        

  

    return {
      totalUsers: result[0]?.totalUsers ?? 0,
      totalTutors: result[0]?.totalTutors ?? 0,
      totalCourses: result[0]?.totalCourses ?? 0
    };
  }


  
}