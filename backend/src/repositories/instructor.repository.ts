import { IInstructor,Instructor } from "../models/instructor.model";
import { BaseRepository } from "./base.repository";
import { IInstructorRepository } from "./interfaces/IInstructorRepository";

// apply for instructor

export class InstructorRepository extends BaseRepository<IInstructor> implements IInstructorRepository{
      constructor() {
    super(Instructor);
  }

  async findAllInstructors(skip: number, limit: number, searchQuery?: string): Promise<IInstructor[] | null> {
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
}