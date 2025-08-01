import { RequestHandler } from "express";

export interface IWalletController {
  getWallet: RequestHandler;
  creditWallet: RequestHandler;
  debitWallet: RequestHandler;
}