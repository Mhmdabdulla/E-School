import type{ IUser } from "./user";

export interface IPayoutRequest extends Document {
  _id: string;
  instructorId: Partial<IUser>;
  amount: number;
  method: string;
  status: string;
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