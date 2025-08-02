import { inject, injectable } from "inversify";
import { IEnrollmentService } from "./interfaces/IEnrollmentService";
import  TYPES  from "../di/types";
import { IEnrollmentRepository } from "../repositories/interfaces/IEnrollmentRepository";
import { ICourseRepository } from "../repositories/interfaces/ICourseRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { ILessonRepository } from "../repositories/interfaces/ILessonRepository"
import { IEnrollment } from "../models/Enrollment";




@injectable()
export class EnrollmentService  implements IEnrollmentService {
  constructor(
    @inject(TYPES.EnrollmentRepository) private enrollmentRepository: IEnrollmentRepository,
    @inject(TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.LessonRepository) private lessonRepository: ILessonRepository
  ) {
    
  }

  async isUserEnrolled(userId: string, courseId: string): Promise<IEnrollment | null> {
    return this.enrollmentRepository.isUserEnrolled(userId, courseId);
  }

  async enrollUserInCourses(userId: string, courseIds: string[]) {
    for (const courseId of courseIds) {
      const course = await this.courseRepository.findById(courseId);
      if (!course) continue;

      const instructorId = course.instructorId.toString()
      const totalLessons = await this.lessonRepository.countDocuments({ courseId: courseId });
      
      await this.enrollmentRepository.createEnrollment(userId, courseId,instructorId, totalLessons);

      await this.userRepository.updateWithOperators(userId, { $addToSet: { enrolledCourses: courseId } });
      await this.courseRepository.updateWithOperators(courseId, { $inc: { enrolledCount: 1 } });
    }
  }

  async enrollUserIntoCourse(userId: string, courseId: string): Promise<void> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new Error("course not found");
    }
    const instructorId = course.instructorId.toString()
    const totalLessons = await this.lessonRepository.countDocuments({ courseId: courseId });
    console.log(totalLessons);
    await this.enrollmentRepository.createEnrollment(userId, courseId,instructorId, totalLessons);

    await this.courseRepository.updateWithOperators(courseId, { $inc: { enrollmentCount: 1 } });
  }




}