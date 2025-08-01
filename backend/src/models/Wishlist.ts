import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";

export interface IWishlist extends Document {
    userId: mongoose.Schema.Types.ObjectId | string;
    courses: ObjectId[];
  }
  
  const WishlistSchema = new Schema<IWishlist>({
    userId: { type:Types.ObjectId, ref: "User", required: true, unique: true },
    courses: [{ type:Types.ObjectId, ref: "Course" }],
  });
  
  export const Wishlist = mongoose.model<IWishlist>("Wishlist", WishlistSchema);
  