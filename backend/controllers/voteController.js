import Election from "../models/Election.js";
import User from "../models/User.js";

export const castVote = async (req, res) => {
  try {
    const { electionId, candidateId } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.hasVoted) {
      return res.status(400).json({
        success: false,
        message: "You have already voted.",
      });
    }

    const election = await Election.findById(electionId);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    if (election.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Election is not active.",
      });
    }

    const candidate = election.candidates.id(candidateId);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    // Increment vote
    candidate.votes += 1;

    await election.save();

    // Update student
    user.hasVoted = true;
    user.votedElection = election._id;
    user.selectedCandidate = candidate._id;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Vote cast successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};