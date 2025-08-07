import type { IUser } from "./user";

export interface IReview {
    _id: string
    userId: string;
    courseId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
  }

export interface IPopulatedReview {
    _id: string
    userId: Partial<IUser>;
    courseId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InstructorRating {
  averageRating: number
  totalReviews: number
  breakdown: {
    rating: number;
    count: any;
    percentage: number;
}[]
}