import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../components/Signin/Signin";
import { useUser } from "../hooks/useUser";
import { signInUser } from "../utils/authService";

const validateSignIn = ({ email, password }) => {
  if (!email || !password) {
    return "Please enter both email and password.";
  }
  return null;
};

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

  const handleSignIn = async ({ email, password }) => {
    const validationError = validateSignIn({ email, password });
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const user = await signInUser(email, password);
      if (user && user.id) {
        loadUser(user);
        setError(null);
        handleRouteChange("home");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    }
  };

  return (
    <div>
      <Signin
        onRouteChange={handleRouteChange}
        onSubmit={handleSignIn}
        error={error}
      />
    </div>
  );
}
