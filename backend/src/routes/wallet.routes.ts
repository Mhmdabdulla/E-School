import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/inversify.config";
import  TYPES  from "../di/types";
import { IWalletController } from "../controllers/interfaces/IWalletController";
import { UserRole } from "../utils/constants";

const router = express.Router();
const walletController = container.get<IWalletController>(TYPES.WalletController);

router.get("/", authMiddleware([UserRole.INSTRUCTOR]), walletController.getWallet);

export default router;