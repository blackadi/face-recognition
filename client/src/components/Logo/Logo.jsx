import Tilt from "react-parallax-tilt";
import "./logo.css";
import brain from "../../assets/happy.png";

function Logo() {
  return (
    <>
      <div className="ma4 mt0 center">
        <Tilt>
          <div className="tilt br2 shadow-2 center w-10">
            <img src={brain} alt="logo" />
          </div>
        </Tilt>
      </div>
    </>
  );
}

export default Logo;
