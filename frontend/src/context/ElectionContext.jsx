import { createContext, useContext, useState } from "react";

const ElectionContext = createContext();

export function ElectionProvider({ children }) {
  const [elections, setElections] = useState([]);

  const addElection = (election) => {
    const newElection = {
      id: Date.now(),
      title: election.title,
      description: election.description,
      startDate: election.startDate,
      endDate: election.endDate,
      status: "Upcoming",
      candidates: [],
    };

    setElections((prev) => [...prev, newElection]);
  };

  return (
    <ElectionContext.Provider
      value={{
        elections,
        addElection,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
}

export function useElection() {
  return useContext(ElectionContext);
}
