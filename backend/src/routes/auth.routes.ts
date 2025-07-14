import { Router } from "express";
import passport from "passport";
import container from "../di/inversify.config";
import { IAuthController } from "../controllers/interfaces/IAuthController";
import TYPES from "../di/types";
import { validateRequest } from "../middlewares/validate.middleware";
import { LoginRequestDTO, OtpVerifyRequestDTO, RegisterRequestDTO } from "../dto/request/auth.request.dto";


const router = Router();

const ctrl = container.get<IAuthController>(TYPES.AuthController)


router.post("/register",validateRequest(RegisterRequestDTO), ctrl.register);
router.post("/verify-otp",validateRequest(OtpVerifyRequestDTO), ctrl.verifyOtp);
router.post("/resend-otp", ctrl.resendOtp)
router.post("/login", validateRequest(LoginRequestDTO), ctrl.login);
router.post("/admin/login" , validateRequest(LoginRequestDTO),ctrl.adminLogin)
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
