import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import { useEffect, useRef, useState } from "react";
import { callFaceAPI } from "./Libs/FaceAPI";

const IMAGE_URL_TEST = [
  "https://static.vecteezy.com/system/resources/thumbnails/048/887/349/small/portrait-of-a-serious-young-man-photo.jpg",
  "https://img.magnific.com/free-photo/people-collage-design_23-2148888275.jpg",
  "https://www.ispo.com/images/sports-business/alberto-gines-lopez-janja-garnbret-alex-.jpg",
  "https://static01.nyt.com/images/2026/03/18/travel/18trav-honnold-5-places-aa/18trav-honnold-5-places-aa-verticalTwoByThree735.jpg",
];

function App() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [imageUrl, setImageUrl] = useState("");
  const [faces, setFaces] = useState([]);
  const [displaySize, setDisplaySize] = useState({
    user: {
      width: 0,
      height: 0,
      naturalWidth: 1,
      naturalHeight: 1,
    },
  });
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });
  // Building Routes
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const imgRef = useRef(null);

  async function fetchData() {
    const request = await fetch(`${apiUrl}`);
    const face_data = await request.json();
    console.log(face_data);
  }

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    });
  };

  // Call FaceAPI on initial render
  useEffect(() => {
    fetchData();
  }, []);

  // Capture displayed image dimensions whenever the image loads or window resizes
  const handleImageLoad = () => {
    if (imgRef.current) {
      setFaces([]);
      setDisplaySize({
        width: imgRef.current.clientWidth,
        height: imgRef.current.clientHeight,
        naturalWidth: imgRef.current.naturalWidth,
        naturalHeight: imgRef.current.naturalHeight,
      });
    }
    console.log(displaySize, "dasdasdasdsd");
  };

  const calculateFacesLocations = (faces) => {
    console.log("faces", faces.length);
    const facesLocations = faces.map((face, index) => {
      const { top, left, width, height } = face.face_rectangle;
      console.log({ top, left, width, height });
      // Calculate scaling ratio
      const scaleX = displaySize.width / displaySize.naturalWidth;
      const scaleY = displaySize.height / displaySize.naturalHeight;

      return {
        top: top * scaleY,
        left: left * scaleX,
        width: width * scaleX,
        height: height * scaleY,
      };
    });

    return facesLocations;
  };

  const onInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  const onPictureSubmit = async (event) => {
    const data = await callFaceAPI(imageUrl);
    const boxFaces = calculateFacesLocations(data);
    const entriesCount = await fetch(`${apiUrl}/image`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
      }),
    });
    const entries = await entriesCount.json();
    setUser((prevUser) => ({
      ...prevUser,
      entries: entries,
    }));
    setFaces(boxFaces);
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <>
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onPictureSubmit={onPictureSubmit}
            />
            <FaceRecognition
              faces={faces}
              imageUrl={imageUrl}
              handleImageLoad={handleImageLoad}
              imgRef={imgRef}
            />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
        ) : (
          <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )}
      </div>
    </>
  );
}

export default App;
