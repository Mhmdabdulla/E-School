import express from "express";
import container from "../di/inversify.config";
import  TYPES  from "../di/types";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/constants";
import { IOrderController } from "../controllers/interfaces/IorderController";

const router = express.Router();

const orderController = container.get<IOrderController>(TYPES.OrderController);

router.get("/all", authMiddleware([UserRole.ADMIN]), orderController.getAllOrders)
router.get("/recent", authMiddleware([UserRole.ADMIN]), orderController.getRecentOrders)
router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), orderController.getUserOrders);

export default router;