import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { STATUS_CODES } from "../utils/constants";

export const errorHandler = (err: any, req: Request, res: Response,next: NextFunction) => {
  let statusCode = err instanceof AppError ? err.statusCode :STATUS_CODES.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";
 if (err.name === "ValidationError") {
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = Object.values(err.errors).map((e: any) => e.message).join(", ");
    }
console.log(message,statusCode)

  res.status(statusCode).json({
    success: false,
    message,
  });
};
