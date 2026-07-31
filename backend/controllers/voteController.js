import Vote from "../models/Vote.js";
import Election from "../models/Election.js";
import User from "../models/User.js";

// ===============================
// Cast Vote
// ===============================
export const castVote = async (req, res) => {
  try {
    const { electionId, candidateId } = req.body;

    // Validate request
    if (!electionId || !candidateId) {
      return res.status(400).json({
        success: false,
        message: "Election ID and Candidate ID are required.",
      });
    }

    // Find election
    const election = await Election.findById(electionId);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found.",
      });
    }

    // Election must be active
    if (election.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Election is not active.",
      });
    }

    // Check if student already voted in this election
    const existingVote = await Vote.findOne({
      student: req.user._id,
      election: electionId,
    });

    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: "You have already voted in this election.",
      });
    }

    // Find candidate
    const candidate = election.candidates.id(candidateId);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found.",
      });
    }

    // Increase vote count
    candidate.votes += 1;

    await election.save();

    // Save vote
    const vote = await Vote.create({
      student: req.user._id,
      election: electionId,
      candidate: candidateId,
    });

    res.status(201).json({
      success: true,
      message: "Vote cast successfully!",
      vote,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};