import api from "./api";

// Cast Vote
export const castVote = (data) =>
  api.post("/votes", data);

// Student Voting History
export const getMyVotingHistory = () =>
  api.get("/votes/history");

// Blockchain Explorer
export const getBlockchain = () =>
  api.get("/votes/blockchain");

// Verify Blockchain
export const verifyBlockchain = () =>
  api.get("/votes/blockchain/verify");