import { Request, Response } from "express";
import { ICertificateController } from "./interfaces/ICertificateController";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { ICertificateService } from "../services/interfaces/ICertificateService";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class CertificateController implements ICertificateController {
  constructor(@inject(TYPES.CertificateService) private certificateService: ICertificateService) {}

  issueCertificate = async (req: Request, res: Response) => {
    const { courseId } = req.body;
    const userId = req.user?._id as string

    const certificate = await this.certificateService.issueCertificate(userId, courseId);
    res.status(STATUS_CODES.CREATED).json({ message: "certificate created successfully", certificateUrl: certificate.certificateUrl });
  };

  downloadCertificate = async (req: Request, res: Response): Promise<void> => {
    const certificateUrl = req.query.certificateUrl as string;
    if (!certificateUrl) {
        res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Certificate URL is required" });
        return
    }
    
    const response = await fetch(certificateUrl);

    if (!response.ok) {
       res.status(STATUS_CODES.BAD_GATEWAY).send("Could not fetch certificate from source");
       return
    }
  
    const buffer = await response.arrayBuffer();
  
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="certificate.pdf"');
    res.send(Buffer.from(buffer));
  }

  getCertificate = async (req: Request, res: Response) => {
    const { certificateId } = req.params;
    const certificate = await this.certificateService.getCertificateById(certificateId);

    res.status(STATUS_CODES.OK).json({ message: "certificate fetched successfully", certificate });
  };

  getMyCertificates = async (req: Request, res: Response) => {
    const userId = req.user?._id as string
    const certificates = await this.certificateService.getMyCertificates(userId)
    res.status(STATUS_CODES.OK).json({message: "certificates fetched succeefully", certificates})
  }
}