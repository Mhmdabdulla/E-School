import { RequestHandler } from "express";

export interface ICertificateController {
  issueCertificate: RequestHandler;
  getCertificate: RequestHandler;
  downloadCertificate: RequestHandler;
  getMyCertificates: RequestHandler;
}