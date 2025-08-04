import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IWalletService } from "../services/interfaces/IWalletService";
import  TYPES  from "../di/types";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class WalletController {
  constructor(@inject(TYPES.WalletService) private walletService: IWalletService) {}

  getWallet = async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const wallet = await this.walletService.getWallet(instructorId);
    res.status(STATUS_CODES.OK).json({ wallet });
  };

  creditWallet = async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const { amount, method, referenceId } = req.body;
    const wallet = await this.walletService.creditWallet(instructorId, amount, method, referenceId);
    res.status(STATUS_CODES.OK).json({ message: "Credited successfully", wallet });
  };

  debitWallet = async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const { amount, method, referenceId } = req.body;
    const wallet = await this.walletService.debitWallet(instructorId, amount, method, referenceId);
    res.status(STATUS_CODES.OK).json({ message: "Debit initiated", wallet });
  };
}