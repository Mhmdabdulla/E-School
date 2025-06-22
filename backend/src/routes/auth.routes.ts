// src/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


const router = Router();
const ctrl = new AuthController();

router.post("/register", ctrl.register);
router.post("/verify-otp", ctrl.verifyOtp);
router.post("/resend-otp", ctrl.resendOtp)
router.post("/login", ctrl.login);
// router.post("/admin/login",)
router.post("/refresh-token", ctrl.refreshToken);
router.post("/logout", ctrl.logout);
router.post("/forgot-password",ctrl.forgotPassword)
router.post("/reset-password",ctrl.resetPassword)

export default router;
