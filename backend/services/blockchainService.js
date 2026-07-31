import crypto from "crypto";
import Blockchain from "../models/Blockchain.js";

export const createBlock = async (voteId) => {
  const lastBlock = await Blockchain.findOne().sort({ blockNumber: -1 });

  const previousHash = lastBlock
    ? lastBlock.currentHash
    : "00000000000000000000000000000000";

  const blockNumber = lastBlock
    ? lastBlock.blockNumber + 1
    : 1;

  const timestamp = new Date().toISOString();

  const currentHash = crypto
    .createHash("sha256")
    .update(
      blockNumber +
      voteId.toString() +
      previousHash +
      timestamp
    )
    .digest("hex");

  const block = await Blockchain.create({
    blockNumber,
    vote: voteId,
    previousHash,
    currentHash,
    timestamp,
  });

  return block;
};