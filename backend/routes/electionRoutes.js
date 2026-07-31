import express from "express";
import {
  createElection,
  getAllElections,
  getElectionById,
} from "../controllers/electionController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin Routes
router.post("/", protect, adminOnly, createElection);

// Public Routes
router.get("/", getAllElections);
router.get("/:id", getElectionById);

export default router;