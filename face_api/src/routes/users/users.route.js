import express from "express";

import {
  handleGetAllUsers,
  handleGetUserProfile,
  handleRegisterUser,
  handleSignInUser,
  handleUpdateUserEntries,
} from "./users.controller.js";

const usersRouter = express.Router();

usersRouter.get("/", handleGetAllUsers);
usersRouter.get("/:id", handleGetUserProfile);
usersRouter.post("/register", handleRegisterUser);
usersRouter.post("/signin", handleSignInUser);
usersRouter.put("/image", handleUpdateUserEntries);

export default usersRouter;
