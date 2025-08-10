import { IReview } from "../../models/Review";
import { InstructorRating } from "../../types/userTypes";

export interface IReviewService {
    addReview(userId: string, courseId: string, rating: number, comment?: string): Promise<IReview>;
    getCourseReviews( 
      userId: string,  
      courseId: string,
      skip: number,
      limit: number,
      rating?: number,
    ): Promise<{ reviews: IReview[]; hasMore: boolean }>;
    updateUserReview(reviewId: string, userId: string, data: Partial<IReview>): Promise<IReview | null>;
    removeUserReview(reviewId: string, userId: string): Promise<IReview | null>;
    getInstructorRating(instructorId: string): Promise<InstructorRating>
  }