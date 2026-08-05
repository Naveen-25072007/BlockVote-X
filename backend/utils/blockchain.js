import crypto from "crypto";
import Vote from "../models/Vote.js";

// =========================================
// Get Previous Block
// =========================================

export const getPreviousBlock = async () => {

  const lastVote = await Vote.findOne().sort({
    blockNumber: -1,
  });

  if (!lastVote) {

    return {
      previousHash: "GENESIS",
      blockNumber: 0,
    };

  }

  return {
    previousHash: lastVote.blockchainHash,
    blockNumber: lastVote.blockNumber,
  };

};

// =========================================
// Generate Blockchain Hash
// =========================================

export const generateBlock = async (
  studentId,
  electionId,
  candidateId
) => {

  const previous = await getPreviousBlock();

  const timestamp = new Date().toISOString();

  const blockData =
    studentId +
    electionId +
    candidateId +
    timestamp +
    previous.previousHash;

  const blockchainHash = crypto
    .createHash("sha256")
    .update(blockData)
    .digest("hex");

  return {

    blockchainHash,

    previousHash: previous.previousHash,

    blockNumber: previous.blockNumber + 1,

    votedAt: timestamp,

  };

};