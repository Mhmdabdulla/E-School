import { IPayoutRequest } from "../../models/Payout";

export interface IPayoutRepository {
  create(data: Partial<IPayoutRequest>): Promise<IPayoutRequest>;
  findById(id: string): Promise<IPayoutRequest | null>;
  findAllPending(): Promise<IPayoutRequest[]>;
  findAllWithInstructor(): Promise<IPayoutRequest[]>;
  findByInstructorId(instructorId: string): Promise<IPayoutRequest[]>
  updateStatus(
    id: string,
    status: "approved" | "rejected",
    adminNote?: string
  ): Promise<IPayoutRequest | null>;
}