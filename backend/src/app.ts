import express from "express";
import cors from "cors";
// import userRoutes from "./routes/user.routes"; // sample route
import authRoutes from './routes/auth.routes'
import adminRoute from './routes/admin.routes'
import userRoute from './routes/user.routes'

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/users", userRoutes); // mount routes
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoute)
app.use('/api/users',userRoute)


export default app;
