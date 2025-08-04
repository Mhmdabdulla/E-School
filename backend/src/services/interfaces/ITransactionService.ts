import { ITransaction } from "../../models/Transaction";
import { RevenueStats } from "../../types/revenue.types";

export interface ITransactionService {
  getInstructorTransactions(instructorId: string): Promise<ITransaction[]>;
  createTransaction(data: Partial<ITransaction>): Promise<ITransaction>;
  getRevenueStats(instructorId: string, type: string): Promise<RevenueStats>
}