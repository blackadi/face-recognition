import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register/Register";
import { useUser } from "../hooks/useUser";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { loadUser } = useUser();
  const [error, setError] = useState(null);

  const handleRouteChange = (route) => {
    if (route === "home") {
      navigate("/");
    } else if (route === "signin") {
      navigate("/signin");
    }
  };

  const handleLoadUser = (user) => {
    if (user && user.id) {
      loadUser(user);
      handleRouteChange("home");
    } else {
      setError("Registration failed");
    }
  };

  return (
    <div>
      <Register onRouteChange={handleRouteChange} loadUser={handleLoadUser} />
      {error && (
        <div className="ma3 pa3 bg-red white br2 tc">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
