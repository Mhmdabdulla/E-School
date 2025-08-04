import { RequestHandler } from "express";

export interface ITransactionController {
  getAllTransactions: RequestHandler;
  getRevenueStats: RequestHandler;
}