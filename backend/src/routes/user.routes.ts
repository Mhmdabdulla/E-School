import { RequestHandler, Router } from "express";

const router = Router()

import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/constants";
import container from "../di/inversify.config";
import { IUserController } from "../controllers/interfaces/IUserController";
import TYPES from "../di/types";
import upload, { imageUpload } from "../middlewares/upload.middleware";
import { IInstructorController } from "../controllers/interfaces/IInstructorController";

const ctrl = container.get<IUserController>(TYPES.UserController)
const instructorController = container.get<IInstructorController>(TYPES.InstructorController)



// get users
//change users status
//get instructers

router.get("/",authMiddleware([UserRole.ADMIN]),ctrl.getAllUsers);
router.patch("/:userId/status",authMiddleware([UserRole.ADMIN]), ctrl.toggleUserStatus)
router.post(
  "/become-instructor", authMiddleware([UserRole.USER]), imageUpload.single("idCardImage"), ctrl.becomeInstructor as unknown as RequestHandler
);
router.patch("/change-password", authMiddleware([UserRole.USER, UserRole.ADMIN]), ctrl.changePassword);
router.get("/profile",authMiddleware([UserRole.USER,UserRole.ADMIN]),ctrl.getUserProfile)
router.put("/profile", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR, UserRole.ADMIN]), upload.single("profileImage"), ctrl.updateProfile);
router.get("/applications", authMiddleware([UserRole.USER]), instructorController.getUserApplications);

export default router
