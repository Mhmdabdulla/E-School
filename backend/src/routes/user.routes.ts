import { Router } from "express";

const router = Router()

import { authMiddleware } from "../middlewares/auth.middleware";

import { UserRole } from "../utils/constants";
import container from "../di/inversify.config";
import { IUserController } from "../controllers/interfaces/IUserController";
import TYPES from "../di/types";

const ctrl = container.get<IUserController>(TYPES.UserController)


// get users
//change users status
//get instructers

router.get("/",authMiddleware([UserRole.ADMIN]),ctrl.getAllUsers);
// router.patch("/:userId/status",authMiddleware([UserRole.ADMIN]), userController.toggleUserStatus)
export default router
