import { inject, injectable } from "inversify";
import { IOrderService } from "./interfaces/IOrderService";
import  TYPES  from "../di/types";
import { IOrderRepository } from "../repositories/interfaces/IOrderRepository";
import { PaginatedOrdersResponse } from "../types/userTypes";
import { IOrder } from "../models/Order";

@injectable()
export class OrderService implements IOrderService {
  constructor(@inject(TYPES.OrderRepository) private orderRepository: IOrderRepository) {}

  createOrder(userId: string, courseIds: string[], amount: number, paymentIntentId: string) {
    return this.orderRepository.createOrder(userId, courseIds, amount, paymentIntentId);
  }

  getUserOrders(userId: string) {
    return this.orderRepository.getOrdersByUser(userId);
  }

  async getAllOrder(page: number, limit: number): Promise<PaginatedOrdersResponse | null>{
    const skip = (Number(page) - 1) * Number(limit);
    
    const orders = await this.orderRepository.findAllOrders( skip, limit)
    const totalOrders = await this.orderRepository.countDocuments({})
    return {
      totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
        orders
      };
  }

  async getRecentOrders(limit: number): Promise<IOrder[]> {
    return await this.orderRepository.getRecentOrders(limit);
  }

  async getTotalRevenue(): Promise<number> {
  return await this.orderRepository.getTotalRevenue();
}


}