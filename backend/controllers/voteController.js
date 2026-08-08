import Vote from "../models/Vote.js";
import Election from "../models/Election.js";
import User from "../models/User.js";
import { generateBlock } from "../utils/blockchain.js";

// ===============================================
// Cast Vote
// ===============================================
export const castVote = async (req, res) => {
  try {
    const { electionId, candidateId } = req.body;

    // -------------------------------------------
    // Validate Request
    // -------------------------------------------
    if (!electionId || !candidateId) {
      return res.status(400).json({
        success: false,
        message: "Election ID and Candidate ID are required.",
      });
    }

    // -------------------------------------------
    // Find Election
    // -------------------------------------------
    const election = await Election.findById(electionId);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found.",
      });
    }

    // -------------------------------------------
    // Check Election Status
    // -------------------------------------------
    if (election.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Election is not active.",
      });
    }

    // -------------------------------------------
    // Find Current Logged-in Student
    // -------------------------------------------
    const student = await User.findById(req.user._id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student account not found.",
      });
    }

    console.log("Voting User:", {
      id: student._id.toString(),
      email: student.email,
      isVerified: student.isVerified,
    });

    // -------------------------------------------
    // Check Student Verification
    // -------------------------------------------
    if (student.isVerified !== true) {
      return res.status(403).json({
        success: false,
        message:
          "Your account is not verified by the administrator.",
      });
    }

    // -------------------------------------------
    // Prevent Double Voting
    // -------------------------------------------
    const existingVote = await Vote.findOne({
      student: student._id,
      election: election._id,
    });

    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: "You have already voted in this election.",
      });
    }

    // -------------------------------------------
    // Find Candidate
    // -------------------------------------------
    const candidate = election.candidates.id(candidateId);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found.",
      });
    }

    // -------------------------------------------
    // Generate Blockchain Block FIRST
    // -------------------------------------------
    const block = await generateBlock(
      student._id.toString(),
      election._id.toString(),
      candidate._id.toString()
    );

    // -------------------------------------------
    // Save Vote
    // -------------------------------------------
    const vote = await Vote.create({
      student: student._id,
      election: election._id,
      candidate: candidate._id,

      blockchainHash: block.blockchainHash,
      previousHash: block.previousHash,
      blockNumber: block.blockNumber,
      votedAt: block.votedAt,
    });

    // -------------------------------------------
    // Increase Candidate Vote Count
    // -------------------------------------------
    candidate.votes += 1;

    await election.save();

    // -------------------------------------------
    // Update Student Voting Status
    // -------------------------------------------
    student.hasVoted = true;
    student.votedElection = election._id;
    student.selectedCandidate = candidate._id;

    await student.save();

    // -------------------------------------------
    // Success Response
    // -------------------------------------------
    return res.status(201).json({
      success: true,
      message: "Vote Cast Successfully!",
      vote,
      blockchain: {
        blockNumber: block.blockNumber,
        blockchainHash: block.blockchainHash,
        previousHash: block.previousHash,
      },
    });

  } catch (error) {
    console.error("CAST VOTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


// ===============================================
// Blockchain Explorer
// ===============================================
export const getBlockchain = async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate("student", "fullName email")
      .populate("election", "title")
      .sort({ blockNumber: 1 });

    const blockchain = [];

    for (const vote of votes) {
      const election = await Election.findById(
        vote.election._id
      );

      const candidate = election?.candidates.id(
        vote.candidate
      );

      blockchain.push({
        _id: vote._id,

        blockNumber: vote.blockNumber,

        student: {
          name: vote.student?.fullName || "Unknown",
          email: vote.student?.email || "Unknown",
        },

        election: {
          title: vote.election?.title || "Unknown",
        },

        candidate: candidate
          ? {
              name: candidate.name,
              party: candidate.party,
            }
          : {
              name: "Unknown",
              party: "-",
            },

        blockchainHash: vote.blockchainHash,

        previousHash: vote.previousHash,

        votedAt: vote.votedAt,
      });
    }

    return res.status(200).json({
      success: true,
      count: blockchain.length,
      blockchain,
    });

  } catch (error) {
    console.error("BLOCKCHAIN FETCH ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blockchain.",
    });
  }
};


// ===============================================
// Verify Blockchain Integrity
// ===============================================
export const verifyBlockchain = async (req, res) => {
  try {
    const votes = await Vote.find().sort({
      blockNumber: 1,
    });

    if (votes.length === 0) {
      return res.status(200).json({
        success: true,
        verified: true,
        totalBlocks: 0,
        invalidBlocks: [],
      });
    }

    const invalidBlocks = [];

    for (let i = 1; i < votes.length; i++) {
      if (
        votes[i].previousHash !==
        votes[i - 1].blockchainHash
      ) {
        invalidBlocks.push(votes[i].blockNumber);
      }
    }

    return res.status(200).json({
      success: true,
      verified: invalidBlocks.length === 0,
      totalBlocks: votes.length,
      invalidBlocks,
    });

  } catch (error) {
    console.error("BLOCKCHAIN VERIFICATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify blockchain.",
    });
  }
};


// ===============================================
// Student Voting History
// ===============================================
export const getMyVotingHistory = async (req, res) => {
  try {
    const votes = await Vote.find({
      student: req.user._id,
    })
      .populate("student", "fullName email")
      .populate("election", "title")
      .sort({ createdAt: -1 });

    const history = [];

    for (const vote of votes) {
      const election = await Election.findById(
        vote.election._id
      );

      const candidate = election?.candidates.id(
        vote.candidate
      );

      history.push({
        _id: vote._id,

        election: vote.election.title,

        candidate: candidate
          ? {
              name: candidate.name,
              party: candidate.party,
            }
          : {
              name: "Unknown",
              party: "-",
            },

        votedAt: vote.votedAt,

        blockNumber: vote.blockNumber,

        blockchainHash: vote.blockchainHash,

        previousHash: vote.previousHash,
      });
    }

    return res.status(200).json({
      success: true,
      count: history.length,
      history,
    });

  } catch (error) {
    console.error("VOTING HISTORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load voting history.",
    });
  }
};