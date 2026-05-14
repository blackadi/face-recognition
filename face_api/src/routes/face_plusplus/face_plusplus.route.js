import express from "express";
import handleFaceDetection from "./face_plusplus.controller.js";

const faceRouter = express.Router();

// Define your face_plusplus routes here
faceRouter.post("/detect", handleFaceDetection);

export default faceRouter;
