import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/inversify.config";
import { IAdminController } from "../controllers/interfaces/IAdminController";
import  TYPES  from "../di/types";
import { UserRole } from "../utils/constants";

const router = express.Router();

const adminController = container.get<IAdminController>(TYPES.AdminController)

router.get("/dashboard", authMiddleware([UserRole.ADMIN]), adminController.getDashboard)

export default router;