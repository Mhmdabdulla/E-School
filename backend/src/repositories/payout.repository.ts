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

  async findByInstructorId(instructorId: string, page: number = 1, limit: number = 10): Promise<{ payouts: IPayoutRequest[], total: number, totalPages: number }> {
    const skip = (page - 1) * limit;
  
  const [payouts, total] = await Promise.all([
    PayoutRequest.find({ instructorId })
      .sort({ requestedAt: -1 })
      .skip(skip)
      .limit(limit),
    PayoutRequest.countDocuments({ instructorId })
  ]);
  
  return {
    payouts,
    total,
    totalPages: Math.ceil(total / limit)
  };
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