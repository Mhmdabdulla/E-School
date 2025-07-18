import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";
import logger from "./config/logger";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
    // console.log(`Server running on port ${PORT}`);
  });
});
