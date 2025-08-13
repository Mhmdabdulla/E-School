import mongoose, { Schema, Document } from "mongoose";

export interface IPayoutRequest extends Document {
  instructorId: mongoose.Types.ObjectId | string;
  amount: number;
  method: string
  status: "pending" | "approved" | "rejected";
  upiId?: string;
  bankAccountNumber?: string;
  ifsc?: string;
  bankName?: string;
  accountHolderName?: string;
  paypalEmail?: string;
  adminNote?: string;
  requestedAt: Date;
  resolvedAt?: Date;
}

const PayoutRequestSchema = new Schema<IPayoutRequest>(
  {
    instructorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["bank", "upi", "paypal"], required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    upiId: { type: String },
    bankAccountNumber: { type: String },
    ifsc: { type: String },
    bankName: { type: String },
    accountHolderName: { type: String },
    paypalEmail: { type: String },
    adminNote: { type: String },
    requestedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

export const PayoutRequest = mongoose.model<IPayoutRequest>("PayoutRequest", PayoutRequestSchema);