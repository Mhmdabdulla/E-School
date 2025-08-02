import { FilterQuery } from "mongoose";
import { IEnrollment } from "../../models/Enrollment";



export interface getUserEnrollmentsArgument {
  page: number;
  limit: number;
  search: string;
  filter: string | FilterQuery<IEnrollment>;
}

export interface IEnrollmentService {
  isUserEnrolled(userId: string, courseId: string): Promise<IEnrollment | null>;
  enrollUserInCourses(userId: string, courseIds: string[]): Promise<void>;
  enrollUserIntoCourse(userId: string, courseId: string): Promise<void>;

}