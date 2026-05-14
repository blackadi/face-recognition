//Create V1 API router
import express from "express";
import usersRouter from "./users/users.route.js";
import faceRouter from "./face_plusplus/face_plusplus.route.js";

const api_v1 = express.Router();

// Define your API routes here
api_v1.use("/users", usersRouter);
api_v1.use("/face", faceRouter);

export default api_v1;
