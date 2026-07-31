import mongoose from "mongoose";

const blockchainSchema = new mongoose.Schema(
  {
    blockNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    vote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vote",
      required: true,
    },

    previousHash: {
      type: String,
      required: true,
    },

    currentHash: {
      type: String,
      required: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blockchain", blockchainSchema);