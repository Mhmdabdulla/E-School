import { Request, Response } from "express";
import { IOrderController } from "./interfaces/IorderController";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { IOrderService } from "../services/interfaces/IOrderService";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class OrderController implements IOrderController{
    constructor(
        @inject(TYPES.OrderService) private orderService: IOrderService
    ){}    
    getUserOrders= async(req: Request, res:Response) :Promise<void> => {
        const userId = req.user?._id;
        const orders = await this.orderService.getUserOrders(userId as string);
        res.status(STATUS_CODES.OK).json({message: "order fetched successfully", orders});
    }

    getAllOrders = async(req: Request, res:Response) :Promise<void> => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const ordersWithPagination = await this.orderService.getAllOrder(page, limit)
        res.status(STATUS_CODES.OK).json({message: "order fetched successfully", ordersWithPagination })
    }

    getRecentOrders = async (req: Request, res: Response) => {
        const limit = Number(req.query.limit) || 10;
        const orders = await this.orderService.getRecentOrders(limit);
        res.status(STATUS_CODES.OK).json({orders});
      };
}