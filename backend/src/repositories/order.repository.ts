import { injectable } from "inversify";
import { IOrderRepository } from "./interfaces/IOrderRepository";
import Order, { IOrder } from "../models/Order";
import { BaseRepository } from "./base.repository";

@injectable()
export class OrderRepository extends BaseRepository<IOrder> implements IOrderRepository {
  constructor(){
    super(Order)
  }
    async createOrder(userId:string, courseIds:string[], amount:number, paymentIntentId:string) {
        return Order.create({
          userId,
          courseIds,
          totalAmount: amount,
          paymentIntentId,
          status: "Paid"
        });
      }
      async getOrdersByUser(userId:string) {
        return Order.find({ userId }).sort({ createdAt: -1 }).populate("courseIds");
      }

     async findAllOrders(skip: number, limit: number): Promise<IOrder[] | null> {
       return await Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate({path: "userId", select: "name"}).populate("courseIds")
     }
     
     async getRecentOrders(limit: number): Promise<IOrder[]> {
      return await Order.find().sort({ createdAt: -1 }).limit(limit).populate("userId")
    }

    async getTotalRevenue(): Promise<number> {
      const result = await Order.aggregate([
      { $match: { status: "Paid" } },      // Only paid orders count as revenue
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
     ]);

  return result.length > 0 ? result[0].total : 0;
}

async getMonthlyRevenue(year: number): Promise<{ month: number; revenue: number }[]> {
  return await Order.aggregate([
    { 
      $match: { 
        status: "Paid",
        createdAt: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31)
        }
      }
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        revenue: { $sum: "$totalAmount" }
      }
    },
    { 
      $project: {
        _id: 0,
        month: "$_id.month",
        revenue: 1
      }
    },
    { $sort: { month: 1 } }
  ]);
}


}