import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import s3Client from "../config/s3";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import ffmpeg from "fluent-ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";
// import { PassThrough } from "stream";
import { tmpdir } from "os";
import { writeFile, unlink } from "fs/promises";
import path from "path";

dotenv.config();
// Export folder names for easier reference
export const awsFolderNames = {
  sub1: "sub1",
  sub2: "sub2",
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

// Set ffprobe path
ffmpeg.setFfprobePath(ffprobeInstaller.path);

// Extract video duration from buffer
const getVideoDuration = async (buffer: Buffer): Promise<number> => {
  const tempPath = path.join(tmpdir(), `${uuidv4()}.mp4`);
  await writeFile(tempPath, buffer);

  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(tempPath, (err, metadata) => {
      unlink(tempPath); // cleanup
      if (err) return reject(err);

      const duration = metadata.format.duration;
      resolve(duration ?? 0);
    });
  });
};

// Upload video to S3 and return url, key, duration
export const uploadVideoToS3 = async (
  buffer: Buffer,
  folder: string,
  mimeType: string
): Promise<{ url: string; key: string; duration: number } | null> => {
  try {
    const duration = await getVideoDuration(buffer); // duration in seconds

    const fileExtension = mimeType.split("/")[1]; // e.g., "mp4"
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return {
      url,
      key: fileName,
      duration,
    };
  } catch (error: any) {
    console.error("Error uploading video to S3:", error);
    return null;
  }
};

const extractKeyFromS3Url = (s3Url: string): string | null => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME!;
    const region = process.env.AWS_REGION!;

    const regex = new RegExp(
      `https://${bucketName}.s3.${region}.amazonaws.com/(.*)`
    );
    const match = s3Url.match(regex);

    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }

    console.error("Could not extract key from S3 URL");
    return null;
  } catch (error) {
    console.error("Error extracting key from S3 URL:", error);
    return null;
  }
};


export const deleteFileFromS3 = async (fileUrl: string): Promise<boolean> => {
  try {
    const key = extractKeyFromS3Url(fileUrl);
    if (!key) {
      console.error("Cannot extract key from S3 URL");
      return false;
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(params));
    console.log(`File with key "${key}" deleted successfully from S3.`);
    return true;
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    return false;
  }
};