
import { IEnrollment } from "../../models/Enrollment";
import { IBaseRepository } from "./IBaseRepository";

export interface IEnrollmentRepository extends IBaseRepository<IEnrollment> {

  createEnrollment(userId: string, courseId: string, instructorId: string, totalLessons: number): Promise<IEnrollment>;
  isUserEnrolled(userId:string, courseId:string): Promise<IEnrollment | null>

}