import express from "express";

import {
  createElection,
  getAllElections,
  getElectionById,
  updateElection,
  deleteElection,
} from "../controllers/electionController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllElections);
router.get("/:id", getElectionById);

// Admin
router.post("/", protect, adminOnly, createElection);
router.put("/:id", protect, adminOnly, updateElection);
router.delete("/:id", protect, adminOnly, deleteElection);

export default router;