import express from "express";
import container from "../di/inversify.config";
import { ICertificateController } from "../controllers/interfaces/ICertificateController";
import  TYPES  from "../di/types";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/constants";
const router = express.Router();

const certificateController = container.get<ICertificateController>(TYPES.CertificateController)

router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), certificateController.getMyCertificates)
router.get("/download", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]) ,certificateController.downloadCertificate)
router.post("/issue",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]) ,certificateController.issueCertificate);
router.get("/:certificateId",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]) ,certificateController.getCertificate);

export default router;