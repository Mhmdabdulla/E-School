import { RequestHandler } from "express";

export interface ICourseController {
  createCourse: RequestHandler;
  getMyCourses: RequestHandler;
  getCourseWithContent: RequestHandler;
  updatePublishStatus: RequestHandler;
  getAllCourses: RequestHandler;
  updateCourse: RequestHandler;
  getAllcoursesForAdmin: RequestHandler;
  getMyActiveCourseCount: RequestHandler;
  toggleStatus: RequestHandler;
}