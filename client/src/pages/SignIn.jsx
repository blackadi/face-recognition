import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../components/Signin/Signin";
import { useUser } from "../hooks/useUser";

export default function SignInPage() {
  const navigate = useNavigate();
  const { loadUser } = useUser();
  const [error, setError] = useState(null);

  const handleRouteChange = (route) => {
    if (route === "home") {
      navigate("/");
    } else if (route === "register") {
      navigate("/register");
    }
  };

  const handleLoadUser = (user) => {
    if (user && user.id) {
      loadUser(user);
      handleRouteChange("home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <Signin onRouteChange={handleRouteChange} loadUser={handleLoadUser} />
      {error && (
        <div className="ma3 pa3 bg-red white br2 tc">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
