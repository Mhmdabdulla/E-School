import { RequestHandler } from "express";

export interface IReviewController {
  addReview: RequestHandler;
  getCourseReviews: RequestHandler;
  updateReview: RequestHandler;
  deleteReview: RequestHandler;
  getInstructorRating: RequestHandler;
}