import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { IReviewRepository } from "../repositories/interfaces/IReviewRepository";
import { IReviewService } from "./interfaces/IReviewService"
import { IReview } from "../models/Review";
import { ICourseRepository } from "../repositories/interfaces/ICourseRepository";
import { InstructorRating } from "../types/userTypes";

@injectable()
export class ReviewService implements IReviewService {
    constructor(
      @inject(TYPES.ReviewRepository) private reviewRepository: IReviewRepository,
      @inject(TYPES.CourseRepository) private courseRepository: ICourseRepository
  ) {}
  
    async addReview(userId: string, courseId: string, rating: number, comment?: string): Promise<IReview> {
      const existing = await this.reviewRepository.findUserReview(courseId, userId);
      if (existing) throw new Error("You have already reviewed this course.");
      const course = await this.courseRepository.findById(courseId)
      const instructorId = course?.instructorId ? course.instructorId.toString() : "";
      return await this.reviewRepository.createReview({ userId,instructorId, courseId, rating, comment });
    }
  
    // async getCourseReviews(userId:string,  courseId: string,
    //   skip: number,
    //   limit: number,
    //   rating?: number): Promise<{ reviews: IReview[]; hasMore: boolean }> {
      
    //   const reviews = await this.reviewRepository.findReviewsByCourse(courseId,
    //     skip,
    //     limit,
    //     rating);

    //   let userReview = null
    //   if(skip === 0){
    //     userReview = await this.reviewRepository.findUserReview(courseId, userId)
    //   }
    //  const totalReviews = await this.reviewRepository.countDocuments({courseId})
     
    //  const hasMore = skip + limit < totalReviews;

    //  return {reviews, hasMore}
    // }

    async getCourseReviews(
      userId: string,
      courseId: string,
      skip: number,
      limit: number,
      rating?: number
    ): Promise<{ reviews: IReview[]; hasMore: boolean }> {
      let userReview: IReview | null = null;
      const adjustedSkip = skip;
      let adjustedLimit = limit;
    
      if (skip === 0) {
        const foundReview = await this.reviewRepository.findUserReview(courseId, userId);
      
        if (foundReview && (!rating || foundReview.rating === rating)) {
          userReview = foundReview;
          adjustedLimit = limit - 1;
        }
      }
    
      const reviews = await this.reviewRepository.findReviewsByCourse(
        courseId,
        adjustedSkip,
        adjustedLimit,
        rating,
        userReview?.id as string
      );
    
      const combinedReviews = userReview ? [userReview, ...reviews] : reviews;
    
      const totalReviews = await this.reviewRepository.countDocuments({
        courseId,
        ...(rating ? { rating } : {})
      });
    
      const hasMore = skip + reviews.length + (userReview ? 1 : 0) < totalReviews;
    
      return {
        reviews: combinedReviews,
        hasMore
      };
    }
    
  
    async updateUserReview(reviewId: string, userId: string, data: Partial<IReview>): Promise<IReview | null> {
      const review = await this.reviewRepository.updateReview(reviewId, data);
      if (!review || review.userId.toString() !== userId.toString()) throw new Error("Unauthorized or review not found");
      return review;
    }
  
    async removeUserReview(reviewId: string, userId: string): Promise<IReview | null> {
      const review = await this.reviewRepository.deleteReview(reviewId);
      if (!review || review.userId.toString() !== userId.toString()) throw new Error("Unauthorized or review not found");
      return review;
    }

    async getInstructorRating(instructorId: string): Promise<InstructorRating>{
      return await this.reviewRepository.getInstructorRatingStats(instructorId)
    }
  }
  