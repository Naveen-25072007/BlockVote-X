import express from "express";
import {
  addCandidate,
  getCandidates,
  updateCandidate,
  deleteCandidate,
} from "../controllers/candidateController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Candidate Routes
// ==========================

// Add Candidate
router.post("/:electionId", protect, adminOnly, addCandidate);

// Get All Candidates
router.get("/:electionId", protect, getCandidates);

// Update Candidate
router.put("/:candidateId", protect, adminOnly, updateCandidate);

// Delete Candidate
router.delete("/:candidateId", protect, adminOnly, deleteCandidate);

export default router;