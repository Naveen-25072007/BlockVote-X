import express from "express";

import {
  getProfile,
  getAllStudents,
  verifyStudent,
} from "../controllers/userController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged-in User Profile
router.get("/profile", protect, getProfile);

// Admin - Get All Students
router.get(
  "/students",
  protect,
  adminOnly,
  getAllStudents
);

// Admin - Verify Student
router.put(
  "/students/:id/verify",
  protect,
  adminOnly,
  verifyStudent
);

export default router;