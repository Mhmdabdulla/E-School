import PDFDocument from "pdfkit";
import { uploadPdfToS3 } from "../utils/s3Services"; // adjust path as needed

export interface CertificateUploadResult {
  url: string;
  key: string;
}

export const generateAndUploadCertificateToS3 = async (
  studentName: string,
  courseName: string,
  folder: string // e.g., "certificates" or `certificates/${courseId}/${userId}`
): Promise<CertificateUploadResult | null> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      const chunks: Uint8Array[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));

      doc.on("end", async () => {
        try {
          const pdfBuffer = Buffer.concat(chunks);
          const uploaded = await uploadPdfToS3(pdfBuffer, folder);
          if (!uploaded) return resolve(null);
          resolve(uploaded); // { url, key }
        } catch (err) {
          reject(err);
        }
      });

      doc.on("error", (err) => reject(err));

      // Border
      doc
        .rect(25, 25, doc.page.width - 50, doc.page.height - 50)
        .lineWidth(2)
        .stroke("#bfa46f");

      // Title
      doc
        .font("Times-Bold")
        .fontSize(28)
        .fillColor("#bfa46f")
        .text("Certificate of Completion", 0, 120, {
          align: "center",
        });

      // Texts
      doc
        .font("Helvetica")
        .fontSize(16)
        .fillColor("#333")
        .text("This is to certify that", 0, 250, { align: "center" });

      doc
        .font("Times-Bold")
        .fontSize(24)
        .fillColor("#000")
        .text(studentName, 0, 280, { align: "center" });

      doc
        .font("Helvetica")
        .fontSize(16)
        .text("has successfully completed the course", 0, 310, {
          align: "center",
        });

      doc
        .font("Times-Italic")
        .fontSize(20)
        .fillColor("#000")
        .text(courseName, 0, 340, { align: "center" });

      doc
        .font("Times-Italic")
        .fontSize(16)
        .fillColor("#333")
        .text("From E-School", 0, 370, { align: "center" });

      // Signature and date
      doc
        .font("Helvetica")
        .fontSize(12)
        .fillColor("#000")
        .text("__________________________", 50, 620);

      doc.font("Helvetica-Bold").fontSize(12).text("Instructor", 50, 640);

      doc
        .font("Helvetica-Oblique")
        .fontSize(12)
        .text(`Date: ${new Date().toLocaleDateString()}`, doc.page.width - 150, 640);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
