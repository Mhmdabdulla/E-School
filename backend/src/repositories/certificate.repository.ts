import { injectable } from "inversify";
import { ICertificateRepository } from "./interfaces/ICertificateRepository";
import { Certificate, ICertificate } from "../models/Certificate";
import { BaseRepository } from "./base.repository";

@injectable()
export class CertificateRepository extends BaseRepository<ICertificate> implements ICertificateRepository {
  constructor(){
    super(Certificate)
  }  
  async findByUserAndCourse(userId: string, courseId: string): Promise<ICertificate | null> {
      return await Certificate.findOne({ userId, courseId });
    }
  
    async createCertificate(data: Partial<ICertificate>): Promise<ICertificate> {
      return await Certificate.create(data);
    }
  
    async findByCertificateId(certificateId: string): Promise<ICertificate | null> {
      return await Certificate.findOne({ certificateId });
    }

    async findMyCertificate(userId: string): Promise<ICertificate [] | null> {
      return await Certificate.find({userId}).populate("courseId", "title ")
    }
  }
  