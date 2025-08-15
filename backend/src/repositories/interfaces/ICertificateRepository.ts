import { ICertificate } from "../../models/Certificate";
import { IBaseRepository } from "./IBaseRepository";

export interface ICertificateRepository extends IBaseRepository<ICertificate> {
    findByUserAndCourse(userId: string, courseId: string): Promise<ICertificate | null>;
    createCertificate(data: Partial<ICertificate>): Promise<ICertificate>;
    findByCertificateId(certificateId: string): Promise<ICertificate | null>;
    findMyCertificate(userId: string): Promise<ICertificate [] | null>
  }