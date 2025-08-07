interface DailyRevenue {
    date: string; // e.g., "2025-05-01"
    revenue: number;
  };
  
  interface WeeklyRevenue {
    week: string; // e.g., "2025-W18"
    revenue: number;
  };
  
  interface MonthlyRevenue {
    month: string; // e.g., "May"
    revenue: number;
  };
  
  export type RevenueStats = DailyRevenue[] | WeeklyRevenue[] | MonthlyRevenue[];

  export interface PayoutRequest {
      amount: number;
      method: string;
      upiId?: string | undefined;
      paypalEmail?: string | undefined;
      accountHolderName?: string | undefined;
      accountNumber?: string | undefined;
      ifsc?: string | undefined;
      bankName?: string | undefined;
  }

  export interface PayoutRequestData {
    _id:string;
    instructorId: string;
    amount: number;
    method: string
    status: string;
    upiId?: string;
    bankAccountNumber?: string;
    ifsc?: string;
    bankName?: string;
    accountHolderName?: string;
    paypalEmail?: string;
    adminNote?: string;
    requestedAt: Date;
    resolvedAt?: Date;
  }
  