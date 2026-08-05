import express from "express";

import {
  castVote,
  getBlockchain,
  getMyVotingHistory,
} from "../controllers/voteController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Cast Vote
router.post("/", protect, castVote);

// Student Voting History
router.get("/history", protect, getMyVotingHistory);

// Blockchain Explorer
router.get("/blockchain", protect, getBlockchain);

export default router;