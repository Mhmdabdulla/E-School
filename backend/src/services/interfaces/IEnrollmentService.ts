import { FilterQuery } from "mongoose";
import { IEnrollment } from "../../models/Enrollment";
import { EnrolledStudent, InstructorStats } from "../../types/userTypes";
import { IBaseService } from "./IBaseService";



export interface getUserEnrollmentsArgument {
  page: number;
  limit: number;
  search: string;
  filter: string | FilterQuery<IEnrollment>;
}

export interface IEnrollmentService extends IBaseService<IEnrollment>{
  isUserEnrolled(userId: string, courseId: string): Promise<IEnrollment | null>;
  enrollUserInCourses(userId: string, courseIds: string[]): Promise<void>;
  enrollUserIntoCourse(userId: string, courseId: string): Promise<void>;
  getUserEnrollments(
    arg0: getUserEnrollmentsArgument,
    userId: string
  ): Promise<{ data: IEnrollment[]; totalItems: number; totalPages: number; currentPage: number }>;
  completeLesson(userId: string, courseId: string, lessonId: string): Promise<IEnrollment | null>;
  updateLastVisitedLesson(
    filter: FilterQuery<IEnrollment>,
    lessonId: string
  ): Promise<IEnrollment | null>
  getEnrolledStudentsOfACourse(courseId: string): Promise<EnrolledStudent[] | null>
  getInstructorStats(instructorId: string): Promise<InstructorStats>
}