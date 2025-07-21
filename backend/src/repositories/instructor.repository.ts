import mongoose, { Types } from "mongoose";
import { IInstructor, Instructor } from "../models/instructor.model";
import { BaseRepository } from "./base.repository";
import { IInstructorRepository } from "./interfaces/IInstructorRepository";

export class InstructorRepository
  extends BaseRepository<IInstructor>
  implements IInstructorRepository
{
  constructor() {
    super(Instructor);
  }

  async findAllInstructors(
    skip: number,
    limit: number,
    searchQuery?: string
  ): Promise<IInstructor[] | null> {
    const pipeline: any[] = [
      {
        $match: {
          "adminApproval.status": "approved",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
    ];

    if (searchQuery) {
      pipeline.push({
        $match: {
          "userId.name": { $regex: searchQuery, $options: "i" },
        },
      });
    }

    pipeline.push({ $skip: skip }, { $limit: limit });

    return await Instructor.aggregate(pipeline);
  }

  async findInstructorByUserId(userId: string): Promise<IInstructor | null> {
    return Instructor.findOne({ userId: new Types.ObjectId(userId) });
  }

  async createInstructor(instructor: any): Promise<IInstructor | null> {
    instructor.userId = new mongoose.Types.ObjectId(
      instructor.userId as string
    );

    return await Instructor.create(instructor);
  }

  getInstructorApplications = async (): Promise<IInstructor[] | null> => {
    return await Instructor.find({
      "adminApproval.status": "pending",
    }).populate("userId");
  };

  updateInstructorStatus = async (
    id: string,
    updates: Partial<IInstructor>
  ): Promise<IInstructor | null> => {
    return await Instructor.findByIdAndUpdate(id, updates, { new: true });
  };

  async getUserApplications(userId: string): Promise<IInstructor[] | null> {
    return await Instructor.find({ userId: new Types.ObjectId(userId) }).populate("userId");
  }
  
}
