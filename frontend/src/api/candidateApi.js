import api from "./api";

// Get candidates of an election
export const getCandidates = (electionId) =>
  api.get(`/candidates/${electionId}`);

// Add candidate
export const addCandidate = (electionId, data) =>
  api.post(`/candidates/${electionId}`, data);

// Update candidate
export const updateCandidate = (candidateId, data) =>
  api.put(`/candidates/${candidateId}`, data);

// Delete candidate
export const deleteCandidate = (candidateId) =>
  api.delete(`/candidates/${candidateId}`);