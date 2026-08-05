import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getProfile,
  getAllStudents,
  verifyStudent,
} from "../controllers/userController.js";

const router = express.Router();

// Logged-in User
router.get("/profile", protect, getProfile);

// Get All Students
router.get("/students", protect, getAllStudents);

// Verify Student
router.put("/students/:id/verify", protect, verifyStudent);

export default router;