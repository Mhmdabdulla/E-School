import { Router } from "express";

const router = Router()

import { authMiddleware } from "../middlewares/auth.middleware";

import { UserRole } from "../utils/constants";
import container from "../di/inversify.config";
import TYPES from "../di/types";
import { IInstructorController } from "../controllers/interfaces/IInstructorController";

const ctrl = container.get<IInstructorController>(TYPES.InstructorController)
// get instructors


router.get("/",authMiddleware([UserRole.ADMIN]),ctrl.getAllInstructors);
router.get("/applications",authMiddleware([UserRole.ADMIN]),ctrl.getInstructorApplications)
router.patch("/applications/:instructorId/status",ctrl.reviewInstructor)


export default router
