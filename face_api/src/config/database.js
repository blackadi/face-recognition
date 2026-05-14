import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_HOST, DB_PORT } =
  process.env;

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false, // Set to console.log to see raw SQL queries in your terminal
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test the connection immediately
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
testConnection();

export default sequelize;
