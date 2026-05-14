import { useState, useRef, useCallback } from "react";
import API_URL from "../config/api";

export function useFaceDetection() {
  const [imageUrl, setImageUrl] = useState("");
  const [faces, setFaces] = useState([]);
  const [faceAttributes, setFaceAttributes] = useState([]);
  const [displaySize, setDisplaySize] = useState({
    width: 0,
    height: 0,
    naturalWidth: 1,
    naturalHeight: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const imgRef = useRef(null);

  const handleImageLoad = useCallback(() => {
    if (imgRef.current) {
      setFaces([]);
      setFaceAttributes([]);
      setDisplaySize({
        width: imgRef.current.clientWidth,
        height: imgRef.current.clientHeight,
        naturalWidth: imgRef.current.naturalWidth,
        naturalHeight: imgRef.current.naturalHeight,
      });
    }
  }, []);

  const calculateFacesLocations = useCallback(
    (detectedFaces) => {
      return detectedFaces.map((face) => {
        const { top, left, width, height } = face.face_rectangle;
        const scaleX = displaySize.width / displaySize.naturalWidth;
        const scaleY = displaySize.height / displaySize.naturalHeight;

        return {
          top: top * scaleY,
          left: left * scaleX,
          width: width * scaleX,
          height: height * scaleY,
        };
      });
    },
    [displaySize],
  );

  const detectFaces = useCallback(
    async (url) => {
      if (!url) {
        setError("Please enter an image URL");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/face/detect`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: url }),
        });

        if (!response.ok) {
          throw new Error("Failed to detect faces");
        }

        const data = await response.json();

        if (!data.faces || data.faces.length === 0) {
          setError("No faces detected in the image");
          setFaces([]);
          setFaceAttributes([]);
          return null;
        }

        const facesWithAttributes = data.faces.map((face) => {
          const age = face.attributes?.age?.value || "N/A";
          const gender = face.attributes?.gender?.value || "N/A";
          return {
            ...face.face_rectangle,
            age,
            gender,
          };
        });

        const boxFaces = calculateFacesLocations(data.faces);
        setFaces(boxFaces);
        setFaceAttributes(facesWithAttributes);
        setImageUrl(url);

        return data.faces;
      } catch (err) {
        setError(err.message || "Error detecting faces");
        setFaces([]);
        setFaceAttributes([]);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [calculateFacesLocations],
  );

  const resetFaceDetection = useCallback(() => {
    setImageUrl("");
    setFaces([]);
    setFaceAttributes([]);
    setError(null);
  }, []);

  return {
    imageUrl,
    setImageUrl,
    faces,
    faceAttributes,
    displaySize,
    loading,
    error,
    imgRef,
    handleImageLoad,
    detectFaces,
    resetFaceDetection,
  };
}
