import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ITransactionService } from "../services/interfaces/ITransactionService";
import  TYPES  from "../di/types";
import { STATUS_CODES } from "../utils/constants";
import { ITransactionController } from "./interfaces/ITransactionController";

@injectable()
export class TransactionController implements ITransactionController {
  constructor(@inject(TYPES.TransactionService) private transactionService: ITransactionService) {}

  getAllTransactions = async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string 
    const transactions = await this.transactionService.getInstructorTransactions(instructorId);
    res.status(STATUS_CODES.OK).json({ transactions });
  };

  getRevenueStats = async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const type = req.query.type as string
    const data = await this.transactionService.getRevenueStats(instructorId, type);
    res.status(STATUS_CODES.OK).json({data});
  }
}