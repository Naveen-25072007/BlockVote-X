import { createContext, useContext, useState } from "react";

const ElectionContext = createContext();

export function ElectionProvider({ children }) {
  const [elections, setElections] = useState([]);

  // Auto Status
  const getElectionStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Active";
    return "Closed";
  };

  // Create Election
  const addElection = (election) => {
    const newElection = {
      id: Date.now(),
      title: election.title,
      description: election.description,
      startDate: election.startDate,
      endDate: election.endDate,
      status: getElectionStatus(
        election.startDate,
        election.endDate
      ),
      candidates: [],
      hasVoted: false,
    };

    setElections((prev) => [...prev, newElection]);
  };

  // Update Election
  const updateElection = (id, updatedData) => {
    setElections((prev) =>
      prev.map((election) =>
        election.id === id
          ? {
              ...election,
              ...updatedData,
              status: getElectionStatus(
                updatedData.startDate || election.startDate,
                updatedData.endDate || election.endDate
              ),
            }
          : election
      )
    );
  };

  // Change Status
  const updateElectionStatus = (id, status) => {
    setElections((prev) =>
      prev.map((election) =>
        election.id === id
          ? { ...election, status }
          : election
      )
    );
  };

  // Delete Election
  const deleteElection = (id) => {
    setElections((prev) =>
      prev.filter((election) => election.id !== id)
    );
  };

  // Add Candidate
  const addCandidate = (electionId, candidate) => {
    setElections((prev) =>
      prev.map((election) =>
        election.id === electionId
          ? {
              ...election,
              candidates: [
                ...election.candidates,
                {
                  id: Date.now(),
                  name: candidate.name,
                  party: candidate.party,
                  votes: 0,
                },
              ],
            }
          : election
      )
    );
  };

  // Delete Candidate
  const deleteCandidate = (electionId, candidateId) => {
    setElections((prev) =>
      prev.map((election) =>
        election.id === electionId
          ? {
              ...election,
              candidates: election.candidates.filter(
                (candidate) => candidate.id !== candidateId
              ),
            }
          : election
      )
    );
  };

  // Submit Vote
  const submitVote = (electionId, candidateId) => {
    setElections((prev) =>
      prev.map((election) => {
        if (election.id !== electionId) return election;

        if (election.hasVoted) return election;

        return {
          ...election,
          hasVoted: true,
          candidates: election.candidates.map((candidate) =>
            candidate.id === candidateId
              ? {
                  ...candidate,
                  votes: candidate.votes + 1,
                }
              : candidate
          ),
        };
      })
    );
  };

  return (
    <ElectionContext.Provider
      value={{
        elections,
        addElection,
        updateElection,
        updateElectionStatus,
        deleteElection,
        addCandidate,
        deleteCandidate,
        submitVote,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
}

export function useElection() {
  return useContext(ElectionContext);
}