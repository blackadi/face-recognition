import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import api_v1 from "./routes/api_v1.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/api/v1", api_v1);

// Add this Error Handling Middleware AFTER all POST GET routes
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Bad JSON formatting" });
  }
  next();
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

export default app;
