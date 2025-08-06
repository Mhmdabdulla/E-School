
import { FilterQuery } from "mongoose";
import { IEnrollment } from "../../models/Enrollment";
import { IBaseRepository } from "./IBaseRepository";
import { EnrolledStudent } from "../../types/userTypes";

export interface IEnrollmentRepository extends IBaseRepository<IEnrollment> {

  getEnrollmentsWithPagination(filter: FilterQuery<IEnrollment>, skip: number, limit: number): Promise<IEnrollment[]>;
  isUserEnrolled(userId:string, courseId:string): Promise<IEnrollment | null>
  createEnrollment(userId: string, courseId: string, instructorId: string, totalLessons: number): Promise<IEnrollment>;
  findEnrollmentsByUser(userId: string): Promise<IEnrollment[]>;
  updateLessonCompletion(userId: string, courseId: string, lessonId: string): Promise<IEnrollment | null>;
  updateLastVisitedLesson(filter: FilterQuery<IEnrollment>, lessonId: string): Promise<IEnrollment | null>;
  findDistinctInstructors(userId: string): Promise<string[]>;
  getEnrolledStudentsOfACourse(courseId: string):Promise<EnrolledStudent[] | null>
  countDistinctStudentsByInstructor(instructorId: string): Promise<number>
  countEnrollmentsByInstructor(instructorId: string): Promise<number>

}