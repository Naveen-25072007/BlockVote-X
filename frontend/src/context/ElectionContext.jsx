import { createContext, useContext, useState } from "react";

const ElectionContext = createContext();

export function ElectionProvider({ children }) {
  const [elections, setElections] = useState([]);

  // Create Election
  const addElection = (election) => {
    const newElection = {
      id: Date.now(),
      title: election.title,
      description: election.description,
      startDate: election.startDate,
      endDate: election.endDate,
      status: "Upcoming",
      candidates: [],
      hasVoted: false,
    };

    setElections((prev) => [...prev, newElection]);
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