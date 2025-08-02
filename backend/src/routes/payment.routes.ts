import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/inversify.config";
import  TYPES  from "../di/types";
import { IPaymentController } from "../controllers/interfaces/IPaymentController";
import { UserRole } from "../utils/constants";

const router = express.Router();

const paymentController = container.get<IPaymentController>(TYPES.PaymentController);

router.post(
  "/create-checkout-session",
  authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]),
  paymentController.createCheckoutSession
);

export default router;