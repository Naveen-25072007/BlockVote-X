import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/authRoutes.js";
import electionRoutes from "./routes/electionRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Database
import connectDB from "./config/db.js";

// ======================
// Load Environment Variables
// ======================
dotenv.config();

// ======================
// Connect Database
// ======================
connectDB();

// ======================
// Create Express App
// ======================
const app = express();

// ======================
// Middleware
// ======================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app",
    ],
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
// API Routes
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
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
  console.error(err);

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
  console.log(`🚀 Server running on port ${PORT}`);
});