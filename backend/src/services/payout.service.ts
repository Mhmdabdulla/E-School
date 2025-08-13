import { injectable, inject } from "inversify";
import { IPayoutService } from "./interfaces/IPayoutService";
import { IPayoutRepository } from "../repositories/interfaces/IPayoutRepository";
import { ITransactionRepository } from "../repositories/interfaces/ITransactionRepository";
import { IWalletRepository } from "../repositories/interfaces/IWalletRepository";
import  TYPES  from "../di/types";
import { IPayoutRequest } from "../models/Payout";
import { AppError } from "../utils/AppError";

@injectable()
export class PayoutService implements IPayoutService {
  constructor(
    @inject(TYPES.PayoutRepository) private payoutRepo: IPayoutRepository,
    @inject(TYPES.WalletRepository) private walletRepo: IWalletRepository,
    @inject(TYPES.TransactionRepository) private transactionRepo: ITransactionRepository
  ) {}

  async createRequest(instructorId: string, data: Partial<IPayoutRequest>): Promise<IPayoutRequest> {
    return await this.payoutRepo.create({ ...data, instructorId });
  }

  async getAllPending(): Promise<IPayoutRequest[]> {
    return await this.payoutRepo.findAllPending();
  }

  async getPayoutsByInstructor(instructorId: string): Promise<IPayoutRequest[]> {
    return await this.payoutRepo.findByInstructorId(instructorId);
  }

  async getAllPayouts(): Promise<IPayoutRequest[]> {
    return await this.payoutRepo.findAllWithInstructor();
  }
  
  async approveRequest(id: string, adminNote?: string): Promise<IPayoutRequest> {
    const PayoutRequest = await this.payoutRepo.findById(id)
    if (!PayoutRequest) throw new Error("Payout request not found.");
    const wallet = await this.walletRepo.findByInstructor(PayoutRequest?.instructorId as string)
    if (!wallet) throw new Error("Wallet not found.");

    if(wallet.balance < PayoutRequest.amount){
      throw new AppError("insufficient balance to approve")
    }
    
    const payout = await this.payoutRepo.updateStatus(id, "approved", adminNote);
    if (!payout) throw new AppError("Payout request not found.");
    
    await this.walletRepo.updateBalance(payout.instructorId.toString(), payout.amount, false);
    await this.transactionRepo.createTransaction({
      instructorId: payout.instructorId,
      type: "debit",
      amount: payout.amount,
      method: payout.method.toLowerCase() as any,
      status: "completed",
      referenceId: id,
      note: "Payout approved by admin",
    });

    return payout;
  }

  async rejectRequest(id: string, adminNote: string): Promise<IPayoutRequest> {
    const payout = await this.payoutRepo.updateStatus(id, "rejected", adminNote);
    if (!payout) throw new AppError("Payout request not found.");
    return payout;
  }
}