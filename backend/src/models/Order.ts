import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IOrder extends Document {
  _id: string;
  userId: ObjectId;
  courseIds: ObjectId[];
  totalAmount: number;
  paymentIntentId: string;
  status: "Paid" | "Failed";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseIds: [{ type: Schema.Types.ObjectId, ref: "Course", required: true }],
    totalAmount: { type: Number, required: true },
    paymentIntentId: { type: String, required: true },
    status: { type: String, enum: ["Paid", "Failed"], default: "Paid" },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);