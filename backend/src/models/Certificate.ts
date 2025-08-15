import mongoose, { Document, Schema, Types } from "mongoose";
import { generateId } from "../utils/uniqueIdService";

export interface ICertificate extends Document {
  userId: Types.ObjectId | string;
  courseId: Types.ObjectId | string;
  issuedAt: Date;
  certificateUrl: string;
  certificateId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    issuedAt: { type: Date, default: Date.now },
    certificateUrl: { type: String, required: true },
    certificateId: {
      type: String,
      required: true,
      unique: true,
      default: () => `CERT-${generateId(10)}`
    },
  },
  { timestamps: true }
);

CertificateSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Certificate = mongoose.model<ICertificate>("Certificate", CertificateSchema);