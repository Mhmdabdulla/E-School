import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

// Define log format
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Create logger instance
const logger = createLogger({
  level: "info", // default log level
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // to log stack traces
    customFormat
  ),
  transports: [
    new transports.Console(), // logs to console
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" })
  ],
  exceptionHandlers: [
    new transports.File({ filename: "logs/exceptions.log" })
  ]
});

export default logger;
