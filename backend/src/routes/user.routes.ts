import { Router } from "express";

const router = Router()

import { authMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { UserRole } from "../utils/constants";

const ctrl = new UserController()


// get users
//change users status
//get instructers

router.get("/",authMiddleware([UserRole.ADMIN]),ctrl.getAllUsers);
// router.patch("/:userId/status",authMiddleware([UserRole.ADMIN]), userController.toggleUserStatus)
export default router
