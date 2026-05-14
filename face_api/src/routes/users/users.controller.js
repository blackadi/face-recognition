import {
  getAllUsers,
  getUserProfile,
  registerUser,
  signInUser,
  updateUserEntries,
} from "../../models/users.model.js";

async function handleGetAllUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
}

async function handleGetUserProfile(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserProfile(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Error fetching user profile" });
  }
}

async function handleRegisterUser(req, res) {
  const { email, name, password } = req.body;
  try {
    const newUser = await registerUser(email, name, password);
    res.json(newUser);
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Error registering user" });
  }
}

async function handleSignInUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await signInUser(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error signing in user:", err);
    res.status(500).json({ error: "Error signing in user" });
  }
}

async function handleUpdateUserEntries(req, res) {
  const { id } = req.body;
  try {
    const updatedEntries = await updateUserEntries(id);
    if (updatedEntries !== null) {
      res.json(updatedEntries);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error updating user entries:", err);
    res.status(500).json({ error: "Error updating user entries" });
  }
}

export {
  handleGetAllUsers,
  handleGetUserProfile,
  handleRegisterUser,
  handleSignInUser,
  handleUpdateUserEntries,
};
