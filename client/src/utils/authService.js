import API_URL from "../config/api";

export const signInUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Sign in failed");
  }

  return await response.json();
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Registration failed");
  }

  return await response.json();
};

export const updateUserEntries = async (userId) => {
  const response = await fetch(`${API_URL}/users/image`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to update entries");
  }

  const data = await response.json();
  return data.entries || data;
};
