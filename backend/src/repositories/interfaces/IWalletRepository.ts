import { IWallet } from "../../models/Wallet";

export interface IWalletRepository {
  findByInstructor(instructorId: string): Promise<IWallet | null>;
  createWallet(data: Partial<IWallet>): Promise<IWallet>;
  updateBalance(instructorId: string, amount: number, isCredit: boolean): Promise<IWallet | null>;
}