import { IWalletRepository } from "./interfaces/IWalletRepository";
import { Wallet, IWallet } from "../models/Wallet";
import mongoose from "mongoose";

export class WalletRepository implements IWalletRepository {
  async findByInstructor(instructorId: string): Promise<IWallet | null> {
    return Wallet.findOne({ instructorId: new mongoose.Types.ObjectId(instructorId) });
  }

  async createWallet(data: Partial<IWallet>): Promise<IWallet> {
    return Wallet.create(data);
  }

  async updateBalance(instructorId: string, amount: number, isCredit: boolean): Promise<IWallet | null> {
    const update = isCredit
      ? { $inc: { balance: amount, totalEarnings: amount } }
      : { $inc: { balance: -amount, totalWithdrawn: amount } };

    return Wallet.findOneAndUpdate({ instructorId }, update, { new: true });
  }
}