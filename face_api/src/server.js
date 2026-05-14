import http from "http";
import dotenv from "dotenv";
import app from "./app.js";

import sequelize from "./config/database.js";

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Sync database models
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
