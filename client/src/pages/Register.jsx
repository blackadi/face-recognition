import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register/Register";
import { useUser } from "../hooks/useUser";
import { registerUser } from "../utils/authService";

const validateRegister = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return "Name, email, and password are required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return null;
};

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

  const handleRegister = async ({ name, email, password }) => {
    const validationError = validateRegister({ name, email, password });
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const user = await registerUser(name, email, password);
      if (user && user.id) {
        loadUser(user);
        setError(null);
        handleRouteChange("home");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Register
        onRouteChange={handleRouteChange}
        onSubmit={handleRegister}
        error={error}
      />
    </div>
  );
}
