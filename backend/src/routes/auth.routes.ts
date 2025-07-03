// src/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import passport from "passport";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";


const router = Router();
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const ctrl = new AuthController(authService)
// const ctrl = new AuthController();

router.post("/register", ctrl.register);
router.post("/verify-otp", ctrl.verifyOtp);
router.post("/resend-otp", ctrl.resendOtp)
router.post("/login", ctrl.login);
router.post("/admin/login",ctrl.adminLogin)
router.post("/refresh-token", ctrl.refreshToken);
router.post("/logout", ctrl.logout);
router.post("/forgot-password",ctrl.forgotPassword)
router.post("/reset-password",ctrl.resetPassword)

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"], prompt: "select_account" }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false,
  }),
  ctrl.googleAuth
);

export default router;
