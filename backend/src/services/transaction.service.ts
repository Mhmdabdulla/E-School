import { ITransactionService } from "./interfaces/ITransactionService";
import { ITransaction } from "../models/Transaction";
import { ITransactionRepository } from "../repositories/interfaces/ITransactionRepository";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { RevenueStats } from "../types/revenue.types";

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject(TYPES.TransactionRepository) private transactionRepository: ITransactionRepository
  ) {}

  async getInstructorTransactions(instructorId: string): Promise<ITransaction[]> {
    return await this.transactionRepository.getTransactions(instructorId);
  }

  async createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
    return await this.transactionRepository.createTransaction(data)
  }

  async getRevenueStats(instructorId: string, type: string): Promise<RevenueStats>{
   return await this.transactionRepository.getRevenueStats(instructorId, type);
  }
}