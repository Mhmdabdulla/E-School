import { IOrder } from "../../models/Order";
import { PaginatedOrdersResponse } from "../../types/userTypes";

export interface IOrderService {
    createOrder(userId: string, courseIds: string[], amount: number, paymentIntentId: string): Promise<IOrder>;
    getUserOrders(userId: string): Promise<IOrder[]>;
    getAllOrder(page: number, limit: number): Promise<PaginatedOrdersResponse | null>
    getRecentOrders(limit: number): Promise<IOrder[]>;
    getTotalRevenue(): Promise<number>;
  }