import express from "express";
import container from "../di/inversify.config";
import { IReviewController } from "../controllers/interfaces/IReviewController";
import  TYPES  from "../di/types";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/constants";

const router = express.Router();

const reviewController = container.get<IReviewController>(TYPES.ReviewController);

router.post("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), reviewController.addReview);
router.get("/instructor", authMiddleware([UserRole.INSTRUCTOR]), reviewController.getInstructorRating)
router.patch("/:reviewId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), reviewController.updateReview);
router.get("/:courseId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), reviewController.getCourseReviews);
router.delete("/:reviewId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), reviewController.deleteReview);

export default router;