import express from "express"
import { config } from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser";
import cors from "cors"

config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
app.use("/api/user",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("DB Connected"))
.catch(()=>console.log("Error Connecting DB"))

app.listen(process.env.PORT || 5000,()=>{
    console.log("Server listening at 5000");
});