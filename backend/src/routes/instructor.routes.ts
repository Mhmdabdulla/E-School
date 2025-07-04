import { Router } from "express";

const router = Router()

import { authMiddleware } from "../middlewares/auth.middleware";

import { UserRole } from "../utils/constants";
import container from "../di/inversify.config";
import { IAuthController } from "../controllers/interfaces/IAuthController";
import TYPES from "../di/types";

const ctrl = container.get<IAuthController>(TYPES.AuthController)
// get instructors


router.get("/",authMiddleware([UserRole.ADMIN]),);
// router.patch("/:userId/status",authMiddleware([UserRole.ADMIN]), userController.toggleUserStatus)
export default router
