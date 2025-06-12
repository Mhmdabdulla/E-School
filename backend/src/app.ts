import express from "express";
import cors from "cors";
// import userRoutes from "./routes/user.routes"; // sample route
import authRoutes from './routes/auth.routes'

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/users", userRoutes); // mount routes
app.use('/api/auth',authRoutes)

export default app;
