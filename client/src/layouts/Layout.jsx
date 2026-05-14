import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import ParticlesBg from "particles-bg";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const handleRouteChange = (route) => {
    if (route === "signout") {
      clearUser();
      navigate("/signin");
    } else if (route === "signin") {
      navigate("/signin");
    } else if (route === "register") {
      navigate("/register");
    } else if (route === "home") {
      navigate("/");
    }
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation onRouteChange={handleRouteChange} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
