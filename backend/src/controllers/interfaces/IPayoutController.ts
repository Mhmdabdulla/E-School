import { RequestHandler } from "express";

export interface IPayoutController {
  createRequest: RequestHandler;
  getAllPending: RequestHandler;
  getMyPayoutRequests: RequestHandler;
  getAllPayoutRequests:RequestHandler;
  approveRequest: RequestHandler;
  rejectRequest: RequestHandler;
}