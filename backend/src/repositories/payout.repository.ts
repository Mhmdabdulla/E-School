import { IPayoutRepository } from "./interfaces/IPayoutRepository";
import { PayoutRequest, IPayoutRequest } from "../models/Payout";

export class PayoutRepository implements IPayoutRepository {
  async create(data: Partial<IPayoutRequest>): Promise<IPayoutRequest> {
    return await PayoutRequest.create(data);
  }

  async findById(id: string): Promise<IPayoutRequest | null> {
    return await PayoutRequest.findById(id);
  }

  async findAllPending(): Promise<IPayoutRequest[]> {
    return await PayoutRequest.find({ status: "pending" }).sort({ createdAt: -1 });
  }

  async findAllWithInstructor(): Promise<IPayoutRequest[]> {
    return await PayoutRequest.find().sort({ createdAt: -1 }).populate("instructorId", "name email");
  }

  async findByInstructorId(instructorId: string): Promise<IPayoutRequest[]> {
    return await PayoutRequest.find({ instructorId }).sort({ requestedAt: -1 });
  }

  async updateStatus(
    id: string,
    status: "approved" | "rejected",
    adminNote?: string
  ): Promise<IPayoutRequest | null> {
    return await PayoutRequest.findByIdAndUpdate(
      id,
      {
        status,
        adminNote,
        resolvedAt: new Date(),
      },
      { new: true }
    );
  }
}