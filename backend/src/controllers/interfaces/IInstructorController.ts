import { RequestHandler } from "express";

export interface IInstructorController {
  getInstructorApplications: RequestHandler;
  getInstructorProfile: RequestHandler;
  updateInstrucotrProfile: RequestHandler;
  getUserApplications: RequestHandler;
  reviewInstructor: RequestHandler;
//   getEnrolledInstructorsForUser:RequestHandler;
  getAllInstructors: RequestHandler;
}