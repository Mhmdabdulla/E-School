import express from "express";
import cors from "cors";
// import userRoutes from "./routes/user.routes"; // sample route

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/users", userRoutes); // mount routes
app.use('/api/user',(req,res)=>{
    res.send('helo server working')
})

export default app;
