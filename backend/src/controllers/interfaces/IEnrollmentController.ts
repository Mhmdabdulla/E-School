import { RequestHandler } from "express";

export interface IEnrollmentController {
isUserEnrolled: RequestHandler;
  enroll: RequestHandler;
  getEnrolledCourses: RequestHandler;
  completeLesson: RequestHandler;
  getOneEnrolledCourse: RequestHandler;
  updateLastVisitedLesson: RequestHandler;
  getEnrolledStudentsOfACourse: RequestHandler;
  getInstructorStats: RequestHandler;

}