import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";
import { User, Login } from "./users.postgresql.js";

export const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

export const registerUser = async (email, name, password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  const newUser = await sequelize.transaction(async (t) => {
    const createdUser = await User.create({ name, email }, { transaction: t });
    await Login.create({ email, hash }, { transaction: t });
    return createdUser;
  });

  return newUser;
};

export const signInUser = async (email, password) => {
  const loginEntry = await Login.findOne({ where: { email } });
  console.log("Login entry:", loginEntry);
  if (!loginEntry) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, loginEntry.hash);
  console.log("Password validation result:", isPasswordValid);
  if (!isPasswordValid) {
    return null;
  }

  const user = await User.findOne({ where: { email } });
  return user;
};

export const getUserProfile = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

export const updateUserEntries = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  const entries = Number(user.entries);
  user.entries = entries + 1;
  await user.save();
  return user.entries;
};
