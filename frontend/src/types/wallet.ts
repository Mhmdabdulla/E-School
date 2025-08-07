export interface Wallet {
    instructorId: string;
    balance: number;
    totalEarnings: number;
    totalWithdrawn: number;
    todayRevenue: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
  }