import mongoose, { Schema, Document } from "mongoose";

export interface IWallet extends Document {
  instructorId: mongoose.Types.ObjectId | string;
  balance: number;
  totalEarnings: number;
  totalWithdrawn: number;
  todayRevenue?:number
  currency: string;
  updatedAt: Date;
}

const WalletSchema = new Schema<IWallet>(
  {
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    balance: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    totalWithdrawn: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },
  },
  { timestamps: true }
);

export const Wallet = mongoose.model<IWallet>("Wallet", WalletSchema);