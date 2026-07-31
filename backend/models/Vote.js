import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    // Student who voted
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Election in which the vote was cast
    election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },

    // Candidate selected
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Blockchain hash (we'll generate this later)
    blockchainHash: {
      type: String,
      default: "",
    },

    // Previous block hash
    previousHash: {
      type: String,
      default: "",
    },

    // Block number
    blockNumber: {
      type: Number,
      default: 0,
    },

    // Time of vote
    votedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vote", voteSchema);