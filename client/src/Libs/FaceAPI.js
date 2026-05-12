export const callFaceAPI = async (imageUrl) => {
    try {
      if (!imageUrl) return;

      // 1. Create a FormData object
      const formData = new FormData();
      
      // 2. Append your parameters
      formData.append("api_key", "g66Mrw3PvfmOv1X1gTZybdS6FSLUDZVm");
      formData.append("api_secret", "uq08oQeDLMgaTBQzDQWiUOIniWbDuCjF");

      formData.append("image_url", imageUrl);

      const response = await fetch(
        "https://api-us.faceplusplus.com/facepp/v3/detect",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();

      if (data.faces) {
        return data.faces;
      } else {
        return ("Error: " + (data.error_message || "Face detection failed"));
      }

    } catch (error) {
      throw Error(error);
    }
}