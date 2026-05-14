import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

async function handleFaceDetection(req, res) {
  const { imageUrl } = req.body;
  const apiKey = process.env.FACE_API_KEY;
  const apiSecret = process.env.FACE_API_SECRET;
  const apiUrl =
    process.env.FACE_API_URL ||
    "https://api-us.faceplusplus.com/facepp/v3/detect";

  try {
    const response = await axios.post(
      apiUrl,
      new URLSearchParams({
        api_key: apiKey,
        api_secret: apiSecret,
        image_url: imageUrl,
        return_attributes:
          "gender,age,smiling,headpose,facequality,blur,eyestatus,emotion",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error calling Face++ API:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Error processing image" });
  }
}

export default handleFaceDetection;
