import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorHandlling.js";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import videoRouter from "./routes/videos.js";
import commentRouter from "./routes/comment.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);

//Handle Errors
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
