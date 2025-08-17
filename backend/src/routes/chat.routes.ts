import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/inversify.config";
import  TYPES  from "../di/types";
import { IChatController } from "../controllers/interfaces/IChatController";
import { UserRole } from "../utils/constants";

const router = express.Router();
const chatController = container.get<IChatController>(TYPES.ChatController);

router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), chatController.getChats);
router.post("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), chatController.createChat);

export default router;