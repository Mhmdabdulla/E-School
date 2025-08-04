import mongoose, { Types } from "mongoose";
import { ITransactionRepository } from "./interfaces/ITransactionRepository";
import { ITransaction, Transaction } from "../models/Transaction";
import { RevenueStats } from "../types/revenue.types";

export class TransactionRepository implements ITransactionRepository {
  async createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
    return Transaction.create(data);
  }

  async getTransactions(instructorId: string): Promise<ITransaction[]> {
    return Transaction.find({ instructorId }).sort({ createdAt: -1 });
  }

  async getRevenueBetweenDates(instructorId: string, start: Date, end: Date): Promise<number> {
    const objectId = new Types.ObjectId(instructorId);
    const result = await Transaction.aggregate([
      {
        $match: {
          instructorId: objectId,
          type: "credit",
          status: "completed",
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);
    return result[0]?.totalRevenue || 0;
  }
  
  async getRevenueStats(instructorId: string, type:string): Promise<RevenueStats> {
    const now = new Date();
  let start: Date;
  let groupId: any;
  const dateBuckets: string[] = [];

  if (type === "daily") {
    // Last 7 days
    start = new Date(now);
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dateBuckets.push(date.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }

    groupId = {
      date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
    };
  } else if (type === "weekly") {
    // Last 4 weeks
    const current = new Date(now);
  const day = current.getDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const startOfCurrentWeek = new Date(current);
  startOfCurrentWeek.setDate(current.getDate() + diffToMonday);
  startOfCurrentWeek.setHours(0, 0, 0, 0);

  // Go back 4 weeks (total 5 weeks including current)
  start = new Date(startOfCurrentWeek);
  start.setDate(start.getDate() - 7 * 4);

  for (let i = 0; i < 5; i++) {
    const weekStart = new Date(start);
    weekStart.setDate(start.getDate() + i * 7);
    const week = getISOWeek(weekStart);
    const year = weekStart.getFullYear();
    dateBuckets.push(`${year}-W${String(week).padStart(2, "0")}`);
  }

  groupId = {
    year: { $year: "$createdAt" },
    week: { $isoWeek: "$createdAt" },
  };
  } else {
    // Last 6 months
    start = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    for (let i = 0; i < 6; i++) {
      const monthDate = new Date(start.getFullYear(), start.getMonth() + i, 1);
      const label = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`;
      dateBuckets.push(label);
    }

    groupId = {
      year: { $year: "$createdAt" },
      month: { $month: "$createdAt" },
    };
  }

  const pipeline = [
    {
      $match: {
        instructorId: new mongoose.Types.ObjectId(instructorId),
        type: "credit",
        status: "completed",
        createdAt: { $gte: start, $lte: now },
      },
    },
    {
      $group: {
        _id: groupId,
        revenue: { $sum: "$amount" },
      },
    },
    { $sort: { "_id": 1 as 1 | -1 } },
  ];

  const results = await Transaction.aggregate(pipeline);

  // Format and fill missing
  if (type === "daily") {
    const map = new Map(results.map(r => [r._id.date, r.revenue]));
    return dateBuckets.map(date => ({
      date,
      revenue: map.get(date) || 0
    }));
  }

  if (type === "weekly") {
    const map = new Map(results.map(r => {
      const label = `${r._id.year}-W${String(r._id.week).padStart(2, "0")}`;
      return [label, r.revenue];
    }));
    return dateBuckets.map(week => ({
      week,
      revenue: map.get(week) || 0
    }));
  }

  // Monthly
  const map = new Map(results.map(r => {
    const label = `${r._id.year}-${String(r._id.month).padStart(2, "0")}`;
    return [label, r.revenue];
  }));
  return dateBuckets.map(month => {
    const [year, monthNum] = month.split("-");
    const label = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(+year, +monthNum - 1));
    return {
      month: label,
      revenue: map.get(month) || 0
    };
  });

  

  function getISOWeek(date: Date): number {
    const tmp = new Date(date.getTime());
    tmp.setHours(0, 0, 0, 0);
    tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));
    const yearStart = new Date(tmp.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((tmp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }
}
}