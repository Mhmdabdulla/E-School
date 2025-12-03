import { IOrder } from "../../models/Order";
import { IBaseRepository } from "./IBaseRepository";

export interface IOrderRepository extends IBaseRepository<IOrder> {
    createOrder(userId: string, courseIds: string[], amount: number, paymentIntentId: string): Promise<IOrder>;
    getOrdersByUser(userId: string): Promise<IOrder[]>;
    findAllOrders(skip: number, limit: number): Promise<IOrder[] | null>
    getRecentOrders(limit: number): Promise<IOrder[]>;
    getTotalRevenue(): Promise<number>
}