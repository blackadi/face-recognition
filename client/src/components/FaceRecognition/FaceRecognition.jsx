import "./FaceRecognition.css";

function FaceRecognition({
  faces,
  imageUrl,
  handleImageLoad,
  imgRef,
  faceAttributes,
}) {
  return (
    <>
      <div
        className="center ma"
        style={{ position: "relative", display: "inline-block" }}
      >
        <div className="mt2">
          <img
            ref={imgRef}
            id="inputimage"
            src={imageUrl}
            onLoad={handleImageLoad}
            alt="photo"
            width="500px"
            height="auto"
          />
          {faces &&
            faces.map((face, index) => {
              console.log("assad", face);
              return (
                <div
                  className="face-rectangle"
                  key={face.face_token || index}
                  style={{
                    top: `${face.top}px`,
                    left: `${face.left}px`,
                    width: `${face.width}px`,
                    height: `${face.height}px`,
                  }}
                >
                  <div className="face-lable">
                    Face {index + 1}: {faceAttributes[index]?.age} years,{" "}
                    {faceAttributes[index]?.gender}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default FaceRecognition;
