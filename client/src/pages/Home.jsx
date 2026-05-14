import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import { useUser } from "../hooks/useUser";
import { useFaceDetection } from "../hooks/useFaceDetection";
import { updateUserEntries } from "../utils/authService";

export default function Home() {
  const navigate = useNavigate();
  const { user, updateEntries } = useUser();
  const {
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
  } = useFaceDetection();

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!user.id) {
      navigate("/signin");
    }
  }, [user.id, navigate]);

  const handleInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handlePictureSubmit = async (event) => {
    event?.preventDefault();

    const detectedFaces = await detectFaces(imageUrl);

    if (detectedFaces) {
      try {
        const entries = await updateUserEntries(user.id);
        updateEntries(entries);
      } catch (err) {
        console.error("Error updating entries:", err);
      }
    }
  };

  if (!user.id) {
    return null;
  }

  return (
    <div>
      <Logo />
      <Rank name={user.name} entries={user.entries} />
      <ImageLinkForm
        onInputChange={handleInputChange}
        onPictureSubmit={handlePictureSubmit}
        imageUrl={imageUrl}
        loading={loading}
        error={error}
      />
      {imageUrl && (
        <FaceRecognition
          faces={faces}
          imageUrl={imageUrl}
          handleImageLoad={handleImageLoad}
          imgRef={imgRef}
          faceAttributes={faceAttributes}
        />
      )}
    </div>
  );
}
