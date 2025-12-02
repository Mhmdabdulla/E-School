import { IPayoutRequest } from "../../models/Payout";

export interface IPayoutRepository {
  create(data: Partial<IPayoutRequest>): Promise<IPayoutRequest>;
  findById(id: string): Promise<IPayoutRequest | null>;
  findAllPending(): Promise<IPayoutRequest[]>;
  findAllWithInstructor(): Promise<IPayoutRequest[]>;
  findByInstructorId(instructorId: string, page: number, limit: number): Promise<{ payouts: IPayoutRequest[], total: number, totalPages: number }>
  updateStatus(
    id: string,
    status: "approved" | "rejected",
    adminNote?: string
  ): Promise<IPayoutRequest | null>;
}