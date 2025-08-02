import { RequestHandler } from "express";

export interface IOrderController {
  getUserOrders: RequestHandler;
  getAllOrders: RequestHandler;
  getRecentOrders: RequestHandler;
}