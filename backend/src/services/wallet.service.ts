import { IWalletService } from "./interfaces/IWalletService";
import { IWallet } from "../models/Wallet";
import { IWalletRepository } from "../repositories/interfaces/IWalletRepository";
import { ITransactionRepository } from "../repositories/interfaces/ITransactionRepository";
import { injectable, inject } from "inversify";
import  TYPES  from "../di/types";

@injectable()
export class WalletService implements IWalletService {
  constructor(
    @inject(TYPES.WalletRepository) private walletRepo: IWalletRepository,
    @inject(TYPES.TransactionRepository) private transactionRepo: ITransactionRepository
  ) {}

  async getWallet(instructorId: string): Promise<IWallet> {
    let wallet = await this.walletRepo.findByInstructor(instructorId);
    if (!wallet) {
      wallet = await this.walletRepo.createWallet({ instructorId });
    }
    const newWallet = wallet.toObject()
    const now = new Date();

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const todayRevenue = await this.transactionRepo.getRevenueBetweenDates(instructorId,startOfDay, endOfDay);
    newWallet.todayRevenue = todayRevenue

    return newWallet;
  }

  async creditWallet(instructorId: string, amount: number, method?: string, referenceId?: string): Promise<IWallet> {
    let wallet = await this.walletRepo.findByInstructor(instructorId);
    if (!wallet) {
      wallet = await this.walletRepo.createWallet({ instructorId });
    }
    const updatedWallet = await this.walletRepo.updateBalance(instructorId, amount, true);
    if (!updatedWallet) throw new Error("Wallet update failed");

    // await this.transactionRepo.createTransaction({
    //   instructorId,
    //   amount,
    //   method,
    //   status: "completed",
    //   type: "credit",
    //   referenceId,
    // });

    return updatedWallet;
  }

  async debitWallet(instructorId: string, amount: number, method?: string, referenceId?: string): Promise<IWallet> {
    const updatedWallet = await this.walletRepo.updateBalance(instructorId, amount, false);
    if (!updatedWallet) throw new Error("Wallet update failed");

    // await this.transactionRepo.createTransaction({
    //   instructorId,
    //   amount,
    //   method,
    //   status: "pending",
    //   type: "debit",
    //   referenceId,
    // });

    return updatedWallet;
  }
}