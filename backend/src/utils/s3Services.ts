import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import s3Client from "../config/s3";
import {  PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config(); 
// Export folder names for easier reference
export const awsFolderNames = {
    sub1: 'sub1',
    sub2: 'sub2'
};

// Function to upload image buffer to S3
export const uploadImageToS3 = async (
  buffer: Buffer,
  folder: string,
  mimeType: string
): Promise<string | null> => {
  try {
    const fileExtension = mimeType.split("/")[1]; // e.g., "jpeg", "png"
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return url;
  } catch (error: any) {
    console.error("Error uploading image to S3:", error);
    return null;
  }
};