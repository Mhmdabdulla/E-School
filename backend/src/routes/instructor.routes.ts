import { Router } from "express";

const router = Router()

import { authMiddleware } from "../middlewares/auth.middleware";

import { UserRole } from "../utils/constants";



// get instructors


router.get("/",authMiddleware([UserRole.ADMIN]),);
// router.patch("/:userId/status",authMiddleware([UserRole.ADMIN]), userController.toggleUserStatus)
export default router
