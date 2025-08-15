import { inject, injectable } from "inversify";
import { ICertificateService } from "./interfaces/ICertificateService";
import { ICertificate } from "../models/Certificate";
import { generateAndUploadCertificateToS3 } from "../utils/certificateService";
import  TYPES  from "../di/types";
import { ICourseRepository } from "../repositories/interfaces/ICourseRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { ICertificateRepository } from "../repositories/interfaces/ICertificateRepository";
import { AppError } from "../utils/AppError";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class CertificateService implements ICertificateService {
    constructor(
        @inject(TYPES.CourseRepository) private courseRepository: ICourseRepository,
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.CertificateRepository) private certificateRepository: ICertificateRepository
      ) {}
  
  async issueCertificate(userId: string, courseId: string): Promise<ICertificate> {

    const existing = await this.certificateRepository.findByUserAndCourse(userId, courseId);
    if (existing) return existing;


    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new AppError("Course not found", STATUS_CODES.NOT_FOUND);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", STATUS_CODES.NOT_FOUND);
    }

    const folder = `course/certificates`;

    // 4) Generate PDF and upload to S3 (returns { url, key } | null)
    const uploaded = await generateAndUploadCertificateToS3(
      user.name,
      course.title,
      folder
    );

    if (!uploaded) {
      throw new AppError("Cannot create certificate. Please try again", STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

    // 5) Persist certificate record (store both url and key for future signed downloads)
    const certificate = await this.certificateRepository.createCertificate({
      userId,
      courseId,
      certificateUrl: uploaded.url, // public URL (if bucket is public)
      issuedAt: new Date(),
    });

    return certificate;
  }
  
    async getCertificateById(certificateId: string): Promise<ICertificate | null> {
      return await this.certificateRepository.findByCertificateId(certificateId);
    }

    async getMyCertificates(userId: string): Promise<ICertificate[] | null> {
      return await this.certificateRepository.findMyCertificate(userId)
    }
  }
  