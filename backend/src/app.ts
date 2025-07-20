import express from "express";
import cors from "cors";
import  "./config/passport"
import cookieParser from "cookie-parser";
// import userRoutes from "./routes/user.routes"; // sample route
import authRoutes from './routes/auth.routes'
import adminRoute from './routes/admin.routes'
import userRoute from './routes/user.routes'
import instructorRoute from './routes/instructor.routes'
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

const allowedOrigin = process.env.CLIENT_URL;

app.use(cors({
  origin: allowedOrigin,
  credentials: true, //  allow cookies/credentials
}));
app.use(express.json());
app.use(cookieParser());

// app.use("/api/users", userRoutes); // mount routes
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoute)
app.use('/api/users',userRoute)
app.use('/api/instructors',instructorRoute)

app.use(errorHandler)


export default app;
