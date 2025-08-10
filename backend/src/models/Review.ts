import mongoose, { Document,  Schema, Types } from "mongoose";

export interface IReview extends Document {
  userId: Types.ObjectId | string;
  instructorId: Types.ObjectId | string;
  courseId: Types.ObjectId | string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    instructorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

ReviewSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Review = mongoose.model<IReview>("Review", ReviewSchema);