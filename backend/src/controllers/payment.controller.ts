import { inject, injectable } from "inversify";
import { IPaymentController } from "./interfaces/IPaymentController";
import  TYPES  from "../di/types";
import { IPaymentService } from "../services/interfaces/IPaymentService";
import { Request, Response } from "express";

import { STATUS_CODES } from "../utils/constants";

@injectable()
export class PaymentController implements IPaymentController {
    constructor(@inject(TYPES.PaymentService) private paymentService:IPaymentService)
    {}

    createCheckoutSession = async (req:Request, res:Response) => {
        const {courseIds} = req.body
        const userId = req.user?._id
        
        const sessionUrl = await this.paymentService.createStripeSession(userId as string, courseIds)
        res.status(STATUS_CODES.OK).json({ url: sessionUrl });
    }

}