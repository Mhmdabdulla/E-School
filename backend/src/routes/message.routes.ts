import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/inversify.config";
import  TYPES  from "../di/types";
import { IMessageController } from "../controllers/interfaces/IMessageController";
import { UserRole } from "../utils/constants";
import upload from "../middlewares/upload.middleware";

const router = express.Router();
const messageController = container.get<IMessageController>(TYPES.MessageController);

router.get("/:chatId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), messageController.getMessages);
router.post("/send", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), upload.single("attachment"), messageController.createMessage);
router.patch("/:messageId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), messageController.updateMessage)
router.delete("/:messageId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), messageController.deleteMessage)

export default router;