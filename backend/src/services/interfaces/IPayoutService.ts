import { IPayoutRequest } from "../../models/Payout";

export interface IPayoutService {
  createRequest(
    instructorId: string,
    data: Partial<IPayoutRequest>
  ): Promise<IPayoutRequest>;
  getAllPending(): Promise<IPayoutRequest[]>;
  getPayoutsByInstructor(
    instructorId: string,page: number , limit: number
  ): Promise<{ payouts: IPayoutRequest[]; total: number; totalPages: number }>;
  getAllPayouts(): Promise<IPayoutRequest[]>;
  approveRequest(id: string, adminNote?: string): Promise<IPayoutRequest>;
  rejectRequest(id: string, adminNote: string): Promise<IPayoutRequest>;
}
