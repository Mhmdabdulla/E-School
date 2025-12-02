import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { IPayoutController } from "./interfaces/IPayoutController";
import { IPayoutService } from "../services/interfaces/IPayoutService";
import  TYPES  from "../di/types";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class PayoutController implements IPayoutController {
  constructor(@inject(TYPES.PayoutService) private payoutService: IPayoutService) {}

  createRequest = async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const payout = await this.payoutService.createRequest(instructorId, req.body);
    res.status(STATUS_CODES.CREATED).json({ message: "Payout request submitted", payout });
  };

  getMyPayoutRequests = async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const payouts = await this.payoutService.getPayoutsByInstructor(instructorId,page,limit);
    res.status(STATUS_CODES.OK).json(payouts);
  };

  getAllPending = async (_req: Request, res: Response) => {
    const requests = await this.payoutService.getAllPending();
    res.status(STATUS_CODES.OK).json({ requests });
  };

  getAllPayoutRequests = async (req: Request, res: Response) => {
    const payouts = await this.payoutService.getAllPayouts();
    res.status(STATUS_CODES.OK).json(payouts);
  };

  approveRequest = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { adminNote } = req.body;
    const payout = await this.payoutService.approveRequest(id, adminNote);
    res.status(STATUS_CODES.OK).json({ message: "Payout approved", payout });
  };

  rejectRequest = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { adminNote } = req.body;
    const payout = await this.payoutService.rejectRequest(id, adminNote);
    res.status(STATUS_CODES.OK).json({ message: "Payout rejected", payout });
  };
}
 