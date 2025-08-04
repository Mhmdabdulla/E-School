import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/inversify.config";
import  TYPES  from "../di/types";
import { UserRole } from "../utils/constants";
import { ITransactionController } from "../core/interfaces/controller/ITransactionConroller";

const router = express.Router();
const transactionController = container.get<ITransactionController>(TYPES.TransactionController);

// Instructor - view their own transactions
router.get("/", authMiddleware([UserRole.INSTRUCTOR]), transactionController.getAllTransactions);

// Admin - view transactions of a specific instructor
// router.get("/:instructorId", authMiddleware([UserRole.ADMIN]), transactionController.getInstructorTransactions);

export default router;