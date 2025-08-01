import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId | string;
  courses: ObjectId[];
  stripeSesstionId: string | null;
  sessionExpiresAt: Date | null;
  status: "pending" | "in_progress" | "paid" | "expired";
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
    courses: [{ type: Types.ObjectId, ref: "Course", default: [] }],
    status: { type: String, enum: ["pending", "in_progress", "paid", "expired"], default: "pending" },
    stripeSesstionId: { type: String, default: null },
    sessionExpiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);