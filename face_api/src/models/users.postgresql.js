// Create users schema and model for PostgreSQL
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    entries: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    joined: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: false, // Disable createdAt and updatedAt fields
  },
);

const Login = sequelize.define(
  "Login",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "login",
    timestamps: false, // Disable createdAt and updatedAt fields
  },
);

User.hasOne(Login, { foreignKey: "email", sourceKey: "email" });
Login.belongsTo(User, { foreignKey: "email", targetKey: "email" });

export { User, Login };
