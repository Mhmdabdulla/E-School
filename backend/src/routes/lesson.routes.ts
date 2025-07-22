import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/constants";
import upload from "../middlewares/upload.middleware";
import container from "../di/inversify.config";
import { ILessonController } from "../controllers/interfaces/ILessonController";
import  TYPES  from "../di/types";

const router = express.Router();

const lessonController = container.get<ILessonController>(TYPES.LessonController);

router.post("/", authMiddleware([UserRole.INSTRUCTOR]), upload.single("content"), lessonController.createLesson);
router.put(
  "/:lessonId",
  authMiddleware([UserRole.INSTRUCTOR]),
  upload.single("content"),
  lessonController.updateLesson
);
router.delete("/:lessonId", authMiddleware([UserRole.INSTRUCTOR]), lessonController.deleteLesson);
// router.get("/:lessonId/stream", lessonController.streamLesson)

export default router;