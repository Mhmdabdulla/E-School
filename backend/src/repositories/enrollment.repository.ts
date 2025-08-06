
import { IEnrollmentRepository } from "./interfaces/IEnrollmentRepository";
import Enrollment, { IEnrollment } from "../models/Enrollment";
import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError";
import { EnrolledStudent } from "../types/userTypes";
import { IUser } from "../models/user.model";


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

async getEnrollmentsWithPagination(filter: mongoose.FilterQuery<IEnrollment>, skip: number, limit: number): Promise<IEnrollment[]> {
      return await Enrollment.find(filter).skip(skip).limit(limit).populate("courseId")
  }

  async findEnrollmentsByUser(userId:string) {
    return Enrollment.find({ userId }).populate("courseId");
  }

  // async updateLessonCompletion(userId:string, courseId:string, lessonId:string) {
  //   const enrollment = await Enrollment.findOne({ userId, courseId });
  //   if (!enrollment) return null;

  //   if (!enrollment.progress.completedLessons.includes(new mongoose.Types.ObjectId(lessonId))) {
  //     enrollment.progress.completedLessons.push(new mongoose.Types.ObjectId(lessonId));
  //   }

  //   enrollment.progress.lastVisited = new mongoose.Types.ObjectId(lessonId);
  //   enrollment.progress.percentage = Math.floor(
  //     (enrollment.progress.completedLessons.length / enrollment.progress.totalLessons) * 100
  //   );
  //   enrollment.completed = enrollment.progress.percentage === 100;

  //   return enrollment.save();
  // }

  async updateLessonCompletion(userId: string, courseId: string, lessonId: string) {
    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) return null;

    if(! enrollment.progress.visitedLessons.includes(lessonId)){
      throw new AppError("cannot complete lesson before watch it",400)
    }
  
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);
    const { completedLessons } = enrollment.progress;
  
    const isCompleted = completedLessons.some(id => id.equals(lessonObjectId));
  
    if (isCompleted) {
      enrollment.progress.completedLessons = completedLessons.filter(id => !id.equals(lessonObjectId));
    } else {
      enrollment.progress.completedLessons.push(lessonObjectId);
    }

    enrollment.progress.lastVisited = lessonObjectId;
  
    enrollment.progress.percentage = Math.floor(
      (enrollment.progress.completedLessons.length / enrollment.progress.totalLessons) * 100
    );
  
    enrollment.completed = enrollment.progress.percentage === 100;
  
    return enrollment.save();
  }

    async updateLastVisitedLesson(filter: mongoose.FilterQuery<IEnrollment>, lessonId: string): Promise<IEnrollment | null> {
     console.log(filter)
      return await Enrollment.findOneAndUpdate(filter, {
        $set: { 'progress.lastVisited': lessonId },
        $addToSet: { 'progress.visitedLessons': lessonId }
      }, {new: true})
    }

  async findDistinctInstructors(userId: string): Promise<string[]> {
    const objectId = new mongoose.Types.ObjectId(userId);
    const result = await Enrollment.aggregate([
      {
        $match: { userId: objectId }
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course"
        }
      },
      {
        $unwind: "$course"
      },
      {
        $group: {
          _id: "$course.instructorId"
        }
      },
      {
        $project: {
          instructorId: "$_id",
          _id: 0
        }
      }
    ]);
  
    return result.map((r) => r.instructorId.toString());
  }

  async getEnrolledStudentsOfACourse(courseId: string):Promise<EnrolledStudent[] | null> {
    const enrollments = await Enrollment.find({ courseId })
    .populate<{ userId: Partial<IUser> }>("userId", "name profileImageUrl _id")
    .lean()
    .exec();

  return enrollments.map((enrollment) => {
    const user = enrollment.userId as Partial<IUser>;
    return {
      user: {
        _id: user?._id?.toString(),
        name: user?.name,
        profileImageUrl: user?.profileImageUrl,
      },
      enrollmentDate: enrollment.enrolledAt,
    };
  });
  }

  async countEnrollmentsByInstructor(instructorId: string): Promise<number> {
      return await Enrollment.countDocuments({
        instructorId: new mongoose.Types.ObjectId(instructorId),
      });
  }

  async countDistinctStudentsByInstructor(instructorId: string): Promise<number> {
      const result = await Enrollment.aggregate([
        { $match: { instructorId: new mongoose.Types.ObjectId(instructorId) } },
        { $group: { _id: "$userId" } },
        { $count: "studentCount" },
      ]);
      return result.length > 0 ? result[0].studentCount : 0;
  }
 
}