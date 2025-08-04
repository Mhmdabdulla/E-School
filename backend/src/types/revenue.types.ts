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
  