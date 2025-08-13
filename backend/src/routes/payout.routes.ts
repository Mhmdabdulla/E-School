import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/inversify.config";
import  TYPES  from "../di/types";
import { IPayoutController } from "../controllers/interfaces/IPayoutController";
import { UserRole } from "../utils/constants";

const router = express.Router();
const payoutController = container.get<IPayoutController>(TYPES.PayoutController);

// Instructor - create payout request, view own requests
router.post("/", authMiddleware([UserRole.INSTRUCTOR]), payoutController.createRequest);
router.get("/", authMiddleware([UserRole.INSTRUCTOR]), payoutController.getMyPayoutRequests);

// Admin - approve/reject payout requests
router.get("/all", authMiddleware([UserRole.ADMIN]), payoutController.getAllPayoutRequests);
router.patch("/:id/approve", authMiddleware([UserRole.ADMIN]), payoutController.approveRequest);
router.patch("/:id/reject", authMiddleware([UserRole.ADMIN]), payoutController.rejectRequest);

export default router;