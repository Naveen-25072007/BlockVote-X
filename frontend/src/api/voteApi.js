import api from "./api";

// Cast Vote
export const castVote = (data) =>
  api.post("/vote", data);

// Alias for compatibility
export const submitVote = castVote;

// Student Voting History
export const getMyVotingHistory = () =>
  api.get("/vote/history");

// Blockchain Explorer
export const getBlockchain = () =>
  api.get("/vote/blockchain");

// Verify Blockchain
export const verifyBlockchain = () =>
  api.get("/vote/blockchain/verify");