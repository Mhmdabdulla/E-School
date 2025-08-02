
import { IEnrollmentRepository } from "./interfaces/IEnrollmentRepository";
import Enrollment, { IEnrollment } from "../models/Enrollment";
import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";


@injectable()
export class EnrollmentRepository extends BaseRepository<IEnrollment> implements IEnrollmentRepository {

  constructor(){
    super(Enrollment)
  }

  async isUserEnrolled(userId:string, courseId:string): Promise<IEnrollment | null>{
    return await Enrollment.findOne({userId, courseId})
  }
  async createEnrollment(userId:string, courseId:string,instructorId: string, totalLessons:number) {
    return Enrollment.create({
      userId,
      courseId,
      instructorId,
      enrolledAt: new Date(),
      progress: {
        completedLessons: [],
        lastVisited: null,
        totalLessons,
        percentage: 0,
      },
      completed: false,
    });
  }


 
}