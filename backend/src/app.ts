import express from "express";
import cors from "cors";
import "./config/passport";
import cookieParser from "cookie-parser";
// import userRoutes from "./routes/user.routes"; // sample route
import authRoutes from "./routes/auth.routes";
import adminRoute from "./routes/admin.routes";
import userRoute from "./routes/user.routes";
import instructorRoute from "./routes/instructor.routes";
import categoryRoute from "./routes/category.routes";
import courseRoute from "./routes/course.routes";
import lessonRoute from "./routes/lesson.routes";
import moduleRoute from "./routes/module.routes";
import cartRoute from "./routes/cart.routes";
import paymentRoute from "./routes/payment.routes";
import orderRoute from "./routes/order.routes";
import webhookRoutes from "./routes/webhook.routes";
import walletRoute from "./routes/wallet.routes";
import transactionRoute from "./routes/transaction.routes";
import enrollmentRoute from "./routes/enrollment.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

const allowedOrigin = process.env.CLIENT_URL;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, //  allow cookies/credentials
  })
);

app.use("/api/webhook", webhookRoutes);

app.use(express.json());
app.use(cookieParser());

// app.use("/api/users", userRoutes); // mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoute);
app.use("/api/users", userRoute);
app.use("/api/instructors", instructorRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/courses", courseRoute);
app.use("/api/lessons", lessonRoute);
app.use("/api/modules", moduleRoute);
app.use("/api/carts", cartRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/orders", orderRoute);
app.use("/api/wallets", walletRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/enrollments", enrollmentRoute);


app.use(errorHandler);

export default app;
