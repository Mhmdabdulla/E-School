import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  instructorId: mongoose.Types.ObjectId | string;
  userId?: mongoose.Types.ObjectId | string;
  courseId?: mongoose.Types.ObjectId | string;
  type: "credit" | "debit"; // 'credit' for earnings, 'debit' for withdrawals
  amount: number;
  method: string;
  status: "pending" | "completed" | "failed";
  referenceId?: string; // Order ID or Withdrawal Request ID
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["bank", "upi", "paypal", "stripe"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    referenceId: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);