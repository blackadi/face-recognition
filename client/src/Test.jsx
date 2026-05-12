import React, { useState, useRef, useEffect } from "react";

// Replace with your actual credentials from the Face++ Console
const API_KEY = "g66Mrw3PvfmOv1X1gTZybdS6FSLUDZVm";
const API_SECRET = "uq08oQeDLMgaTBQzDQWiUOIniWbDuCjF";
const API_URL = "https://api-us.faceplusplus.com/facepp/v3/detect";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [faces, setFaces] = useState([]);
  const [displaySize, setDisplaySize] = useState({
    width: 0,
    height: 0,
    naturalWidth: 1,
    naturalHeight: 1,
  });
  const imgRef = useRef(null);

  // Function to call Face++ API
  const detectFaces = async () => {
    if (!imageUrl) return;

    // We use FormData because Face++ expects multipart/form-data or x-www-form-urlencoded
    const formData = new FormData();
    formData.append("api_key", API_KEY);
    formData.append("api_secret", API_SECRET);
    formData.append("image_url", imageUrl);
    formData.append("return_attributes", "gender,age"); // Optional attributes

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.faces) {
        setFaces(data.faces);
      } else {
        alert("Error: " + (data.error_message || "Face detection failed"));
        setFaces([]);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert(
        "Failed to connect to Face++ API. Note: Browser CORS policy may block direct requests.",
      );
    }
  };

  // Capture displayed image dimensions whenever the image loads or window resizes
  const handleImageLoad = () => {
    if (imgRef.current) {
      setDisplaySize({
        width: imgRef.current.clientWidth,
        height: imgRef.current.clientHeight,
        naturalWidth: imgRef.current.naturalWidth,
        naturalHeight: imgRef.current.naturalHeight,
      });
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <h1>Face++ React Detector</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Paste Image URL here..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{
            width: "60%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={detectFaces}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Detect Faces
        </button>
      </div>

      {/* Container for Image and Rectangles */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
          maxWidth: "100%",
        }}
      >
        {imageUrl && (
          <img
            ref={imgRef}
            src={imageUrl}
            alt="Detection Target"
            onLoad={handleImageLoad}
            style={{
              maxWidth: "800px",
              height: "auto",
              display: "block",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        )}

        {/* Draw Rectangles */}
        {faces.map((face, index) => {
          const { top, left, width, height } = face.face_rectangle;

          // Calculate scaling ratio
          const scaleX = displaySize.width / displaySize.naturalWidth;
          const scaleY = displaySize.height / displaySize.naturalHeight;

          return (
            <div
              key={face.face_token || index}
              style={{
                position: "absolute",
                border: "3px solid #00ff00",
                // Map the original coordinates to the scaled image dimensions
                top: top * scaleY,
                left: left * scaleX,
                width: width * scaleX,
                height: height * scaleY,
                boxSizing: "border-box",
                pointerEvents: "none", // Allow clicking through to image
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-25px",
                  left: "0",
                  background: "#00ff00",
                  color: "#000",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "2px 5px",
                  whiteSpace: "nowrap",
                }}
              >
                Face {index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
