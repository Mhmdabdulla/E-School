import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/constants";
import { IReviewController } from "./interfaces/IReviewController";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { IReviewService } from "../services/interfaces/IReviewService";

@injectable()
export class ReviewController implements IReviewController {
  constructor(@inject(TYPES.ReviewService) private reviewService: IReviewService) {

  }

  addReview = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id
    const { courseId, rating, comment } = req.body;
    const review = await this.reviewService.addReview(userId as string,courseId as string, rating, comment);
    res.status(STATUS_CODES.CREATED).json({ message: "Review added", review });
  };

  getCourseReviews = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id as string
    const {courseId} = req.params
    const { skip = "0", limit = "5", rating } = req.query;

    const parsedSkip = parseInt(skip as string);
    const parsedLimit = parseInt(limit as string);
    const parsedRating = rating && rating !== 'all' ? parseInt(rating as string) : undefined;

    const {reviews, hasMore} = await this.reviewService.getCourseReviews( userId, courseId,
      parsedSkip,
      parsedLimit,
      parsedRating);
    res.status(STATUS_CODES.OK).json({ message: "Reviews fetched success", reviews, hasMore });
  };

  updateReview = async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?._id
    const {reviewId } = req.params
    const updated = await this.reviewService.updateUserReview(reviewId, userId as string, req.body);
    res.status(STATUS_CODES.OK).json({ message: "Review updated", updated });
  };

  deleteReview = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id as string
    const { reviewId }= req.params
    await this.reviewService.removeUserReview(reviewId, userId);
    res.status(STATUS_CODES.OK).json({ message: "Review deleted" });
  };

  getInstructorRating = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user?._id as string
    const instructorRating = await this.reviewService.getInstructorRating(instructorId) 
    res.status(STATUS_CODES.OK).json({message: "instructor rating fetched successfully", instructorRating})
  }
}