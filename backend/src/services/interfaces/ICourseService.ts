import { ICourse } from "../../models/Course";
import { PaginatedCoursesResponse } from "../../types/userTypes";
import { IBaseService } from "./IBaseService";

interface getAllCoursesArgument {
  page: number;
  limit: number;
  sortBy: string;
  searchQuery: string;
  subCategory: string[];
}

export interface ICourseService extends IBaseService<ICourse> {
  createCourse(
    courseData: Partial<ICourse>,
    files: { [fieldname: string]: Express.Multer.File[] },
    thumbnailMimeType:string,
    trailerMimeType:string
  ): Promise<ICourse | null>;
  getCoursesByInstructorId(instructorId: string): Promise<ICourse[] | null>;
  getFullCourse(courseId: string): Promise<ICourse | null>;
  updatePublishStatus(courseId: string): Promise<ICourse | null>;
  getAllCourses(arg0: getAllCoursesArgument): Promise<PaginatedCoursesResponse | null>;
  updateCourse(
    courseId: string,
    data: Partial<ICourse>,
    files?: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<ICourse | null>;
  getMycourses(
    arg0: { page: number; limit: number; search: string; category: string; subCategory: string; sortBy: string },
    instructorId: string
  ): Promise<PaginatedCoursesResponse | null>;
  getAllCoursesForAdmin(page: number, limit: number, searchQuery?: string): Promise<PaginatedCoursesResponse | null>;
  toggleCourseStatus(courseId: string): Promise<ICourse | null>;
}