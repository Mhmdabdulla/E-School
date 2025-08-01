import { IWallet } from "../../models/Wallet";

export interface IWalletService {
  getWallet(instructorId: string): Promise<IWallet>;
  creditWallet(instructorId: string, amount: number, method?: string, referenceId?: string): Promise<IWallet>;
  debitWallet(instructorId: string, amount: number, method?: string, referenceId?: string): Promise<IWallet>;
}