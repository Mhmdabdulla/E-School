import { injectable } from "inversify";
import { IReview, Review } from "../models/Review";
import { IReviewRepository } from "./interfaces/IReviewRepository";
import { BaseRepository } from "./base.repository";
import { InstructorRating } from "../types/userTypes";
import mongoose from "mongoose";

@injectable()
export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepository {
  constructor(){
    super(Review)
  }
   
    async createReview(data: Partial<IReview>): Promise<IReview> {
      return (await Review.create(data)).populate("userId")
    }
  
    async findReviewsByCourse(courseId: string, skip: number, limit: number, rating?: number, userReviewId?:string): Promise<IReview[]> {
      const filter: any = { courseId };
      if (rating) filter.rating = rating;
      if (userReviewId) {
        filter._id = { $ne: userReviewId };
      }
    
      return await Review.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit).populate("userId", "name profileImageUrl");
    }
  
    async findUserReview(courseId: string, userId: string): Promise<IReview | null> {
      return await Review.findOne({ courseId, userId }).populate("userId", "name profileImageUrl");
    }
  
    async updateReview(reviewId: string, data: Partial<IReview>): Promise<IReview | null> {
      return await Review.findByIdAndUpdate(reviewId, data, { new: true })
    }
  
    async deleteReview(reviewId: string): Promise<IReview | null> {
      return await Review.findByIdAndDelete(reviewId);
    }

    async getInstructorRatingStats(instructorId: string): Promise<InstructorRating> {
      const objectId = new mongoose.Types.ObjectId(instructorId);
      const stats = await Review.aggregate([
        { $match: { instructorId: objectId} },
        {
          $group: {
            _id: "$rating",
            count: { $sum: 1 }
          }
        },
        {
          $facet: {
            breakdown: [
              {
                $project: {
                  rating: "$_id",
                  count: 1,
                  _id: 0
                }
              }
            ],
            average: [
              {
                $group: {
                  _id: null,
                  averageRating: { $avg: "$_id" },
                  totalReviews: { $sum: "$count" }
                }
              }
            ]
          }
        }
      ]);
    
      const breakdown = stats[0]?.breakdown || [];
      const averageData = stats[0]?.average?.[0] || {
        averageRating: 0,
        totalReviews: 0
      };
    
      const { totalReviews } = averageData;
    
      // Fill in missing stars and add percentage
      const fullBreakdown = [1, 2, 3, 4, 5].map((star) => {
        const found = breakdown.find((b: any) => b.rating === star);
        const count = found?.count || 0;
        const percentage = totalReviews ? (count / totalReviews) * 100 : 0;
        return {
          rating: star,
          count,
          percentage: Math.round(percentage * 10) / 10 // round to 1 decimal place
        };
      });
    
      return {
        averageRating: Math.round(averageData.averageRating * 10) / 10,
        totalReviews,
        breakdown: fullBreakdown
      };
    };
    
  }