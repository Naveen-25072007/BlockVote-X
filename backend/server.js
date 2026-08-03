import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

// ======================
// ES Module __dirname
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// Load Environment Variables
// ======================
const result = dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log("Dotenv Result:", result.error ? result.error : "Loaded Successfully");
console.log("Current Directory:", __dirname);
console.log("Loaded ADMIN_SECRET:", process.env.ADMIN_SECRET);
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);
console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);

// ======================
// Create Express App
// ======================
const app = express();

// ======================
// Connect Database
// ======================
connectDB();

// ======================
// Middleware
// ======================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================
// Home Route
// ======================
app.get("/", (req, res) => {
  res.send("🚀 BlockVote X Backend API is Running...");
});

// ======================
// Routes
// ======================
import authRoutes from "./routes/authRoutes.js";
import electionRoutes from "./routes/electionRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/candidates", candidateRoutes);


// ======================
// 404 Handler
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// Global Error Handler
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});