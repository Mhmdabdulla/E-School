// src/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();
const ctrl = new AuthController();

router.post("/register", ctrl.register);
router.post("/send-otp", ctrl.sendOtp);
router.post("/verify-otp", ctrl.verifyOtp);
router.post("/login", ctrl.login);
router.post("/refresh-token", ctrl.refreshToken);
router.post("/logout", protect, ctrl.logout);

export default router;
