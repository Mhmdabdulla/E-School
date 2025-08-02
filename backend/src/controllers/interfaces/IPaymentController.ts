import { RequestHandler } from "express";

export interface IPaymentController {
    createCheckoutSession:RequestHandler
}