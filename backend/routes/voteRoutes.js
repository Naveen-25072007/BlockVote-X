import express from "express";
import { castVote } from "../controllers/voteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student Vote
router.post("/", protect, castVote);

export default router;