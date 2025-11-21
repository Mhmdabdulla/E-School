import { inject, injectable } from "inversify";
import { getUserEnrollmentsArgument, IEnrollmentService } from "./interfaces/IEnrollmentService";
import  TYPES  from "../di/types";
import { IEnrollmentRepository } from "../repositories/interfaces/IEnrollmentRepository";
import { ICourseRepository } from "../repositories/interfaces/ICourseRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { ILessonRepository } from "../repositories/interfaces/ILessonRepository"
import { IEnrollment } from "../models/Enrollment";
import { FilterQuery } from "mongoose";
import { EnrolledStudent, InstructorStats } from "../types/userTypes";
import { BaseService } from "./base.service";
import { mapEnrollmentToDTO } from "../mappers/enrollment.mapper";




@injectable()
export class EnrollmentService extends BaseService<IEnrollment>  implements IEnrollmentService {
  constructor(
    @inject(TYPES.EnrollmentRepository) private enrollmentRepository: IEnrollmentRepository,
    @inject(TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.LessonRepository) private lessonRepository: ILessonRepository
  ) {
    super(enrollmentRepository)
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


  async getUserEnrollments(
    { page = 1, limit = 12, search = "", filter = "all" }: getUserEnrollmentsArgument,
    userId: string
  ) {
    const skip = (page - 1) * limit;

    const filterData: any = {
      userId,
    };

    switch (filter) {
      case "completed":
        filterData.completed = true;
        break;
      case "not-started":
        filterData["progress.percentage"] = { $eq: 0 };
        break;
      case "in-progress":
        filterData["progress.percentage"] = { $gt: 0, $lt: 100 };
        break;
    }

    const courses = (await this.enrollmentRepository.getEnrollmentsWithPagination(filterData, skip, limit)) as any;
    let filteredCourses = courses;

    if (search) {
      search.toLowerCase();

      filteredCourses = courses.filter((course: any) => {
        const title = course.courseId?.title?.toLowerCase() || "";
        const subtitle = course.courseId?.subtitle?.toLowerCase() || "";
        return title.includes(search) || subtitle.includes(search);
      });
    }

    const mapped = filteredCourses.map((c: any) => mapEnrollmentToDTO(c));
    const totalCourses = await this.enrollmentRepository.countDocuments({ userId });

    return {
      totalItems: totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
      data: mapped,
    };
  }

  async completeLesson(userId: string, courseId: string, lessonId: string) {
    return await this.enrollmentRepository.updateLessonCompletion(userId, courseId, lessonId);
  }

  async updateLastVisitedLesson(
    filter: FilterQuery<IEnrollment>,
    lessonId: string
  ): Promise<IEnrollment | null> {
    return await this.enrollmentRepository.updateLastVisitedLesson(filter, lessonId)
  }

  async getEnrolledStudentsOfACourse(courseId: string): Promise<EnrolledStudent[] | null>{
    return await this.enrollmentRepository.getEnrolledStudentsOfACourse(courseId)
  }

  async getInstructorStats(instructorId: string): Promise<InstructorStats> {
      const [coursesSold, studentCount] = await Promise.all([
        this.enrollmentRepository.countEnrollmentsByInstructor(instructorId),
        this.enrollmentRepository.countDistinctStudentsByInstructor(instructorId),
      ]);

      return {
        coursesSold,
        studentCount,
      };
 
  }


}