import { Router } from "express";

const router = Router()

import { authMiddleware } from "../middlewares/auth.middleware";

import { UserRole } from "../utils/constants";
import container from "../di/inversify.config";
import TYPES from "../di/types";
import { IInstructorController } from "../controllers/interfaces/IInstructorController";
import { ITransactionController } from "../controllers/interfaces/ITransactionController";

const instructorController = container.get<IInstructorController>(TYPES.InstructorController)
const transactionController = container.get<ITransactionController>(TYPES.TransactionController)



router.get("/",authMiddleware([UserRole.ADMIN]),instructorController.getAllInstructors);
router.get("/applications",authMiddleware([UserRole.ADMIN]),instructorController.getInstructorApplications)
router.patch("/applications/:instructorId/status",authMiddleware([UserRole.ADMIN]),instructorController.reviewInstructor)
router.get("/:userId/profile", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), instructorController.getInstructorProfile);
router.put("/:userId/profile", authMiddleware([UserRole.INSTRUCTOR]), instructorController.updateInstrucotrProfile)
router.get("/enrolled", authMiddleware([UserRole.USER]), instructorController.getEnrolledInstructorsForUser)
router.get("/revenue", authMiddleware([UserRole.INSTRUCTOR]), transactionController.getRevenueStats )


export default router
