import { ITransaction } from "../../models/Transaction";
import { RevenueStats } from "../../types/revenue.types";

export interface ITransactionRepository {
  createTransaction(data: Partial<ITransaction>): Promise<ITransaction>;
  getTransactions(instructorId: string): Promise<ITransaction[]>;
  getRevenueBetweenDates(instructorId: string, start: Date, end: Date): Promise<number>
  getRevenueStats(instructorId: string, type:string): Promise<RevenueStats>
}