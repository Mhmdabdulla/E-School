import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/inversify.config";
import { ICartController } from "../controllers/interfaces/ICartController";
import  TYPES  from "../di/types";
import { UserRole } from "../utils/constants";

const router = express.Router();

const cartController = container.get<ICartController>(TYPES.CartController);

router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), cartController.getCart);
router.post("/add", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), cartController.addItemToCart);
router.post("/remove", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), cartController.removeItemFromCart);

export default router;