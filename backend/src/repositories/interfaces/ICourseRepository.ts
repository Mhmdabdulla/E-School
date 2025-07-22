import { FilterQuery } from "mongoose";
import { ICourse } from "../../models/Course";
import { IBaseRepository } from "./IBaseRepository";

export interface ICourseRepository extends IBaseRepository<ICourse> {
  getCoursesByInstructorId(instructorId: string): Promise<ICourse[] | null>;
  getCourseWithModulesAndLessons(courseId:string): Promise<ICourse|null>
  updateCoursePublishStatus(courseId:string):Promise<ICourse|null>
  getAllCourses(filter:any, skip:any, perPage:any, sort:any):Promise<ICourse[] | null>
  getCoursescount (filter:any):Promise<number>
  getCoursesByIds(courseIds:string[]):Promise<ICourse[] | null>
  getAllCoursesForAdmin(skip: number, limit: number, filter:FilterQuery<ICourse>): Promise<ICourse[] | null>
  toggleCourseStatus(courseId: string): Promise<ICourse | null>
}