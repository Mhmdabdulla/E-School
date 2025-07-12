import { RequestHandler, Router } from "express";

const router = Router()

import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/constants";
import container from "../di/inversify.config";
import { IUserController } from "../controllers/interfaces/IUserController";
import TYPES from "../di/types";
import upload from "../middlewares/upload.middleware";

const ctrl = container.get<IUserController>(TYPES.UserController)



// get users
//change users status
//get instructers

router.get("/",authMiddleware([UserRole.ADMIN]),ctrl.getAllUsers);
router.patch("/:userId/status",authMiddleware([UserRole.ADMIN]), ctrl.toggleUserStatus)
router.post(
  "/become-instructor", authMiddleware([UserRole.USER]), upload.single("idCardImage"), ctrl.becomeInstructor as unknown as RequestHandler
);
export default router
