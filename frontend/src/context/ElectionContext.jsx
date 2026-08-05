import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getAllElections,
  createElection,
  updateElection as updateElectionApi,
  deleteElection as deleteElectionApi,
} from "../api/electionApi";

const ElectionContext = createContext();

export function ElectionProvider({ children }) {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===========================
  // Normalize Election
  // ===========================
  const normalizeElection = (election) => ({
    ...election,
    id: election._id,

    candidates: (election.candidates || []).map((candidate) => ({
      ...candidate,
      id: candidate._id,
      votes: candidate.votes || 0,
    })),
  });

  // ===========================
  // Load Elections
  // ===========================
  const fetchElections = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllElections();

      console.log("========== Election Context ==========");
      console.log(response);
      console.log(response.data);
      console.log(response.data.elections);
      console.log("======================================");

      const electionList = response.data.elections || [];

      const normalized = electionList.map(normalizeElection);

      setElections(normalized);

    } catch (err) {

      console.error("Election Context Error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to load elections."
      );

    } finally {

      setLoading(false);

    }
  }, []);

  // ===========================
  // Load On Startup
  // ===========================
  useEffect(() => {
    fetchElections();
  }, [fetchElections]);

  // ===========================
  // Create Election
  // ===========================
  const addElection = async (data) => {
    try {

      setError("");

      const response = await createElection(data);

      await fetchElections();

      return response.data;

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to create election."
      );

      throw err;
    }
  };

  // ===========================
  // Update Election
  // ===========================
  const updateElection = async (id, data) => {
    try {

      setError("");

      const response = await updateElectionApi(id, data);

      await fetchElections();

      return response.data;

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to update election."
      );

      throw err;
    }
  };

  // ===========================
  // Update Status
  // ===========================
  const updateElectionStatus = async (id, status) => {
    return updateElection(id, {
      status,
    });
  };

  // ===========================
  // Delete Election
  // ===========================
  const deleteElection = async (id) => {
    try {

      setError("");

      const response = await deleteElectionApi(id);

      setElections((prev) =>
        prev.filter((election) => election.id !== id)
      );

      return response.data;

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to delete election."
      );

      throw err;
    }
  };

  // ===========================
  // Refresh
  // ===========================
  const refreshElections = async () => {
    await fetchElections();
  };

  return (
    <ElectionContext.Provider
      value={{
        elections,
        loading,
        error,

        addElection,
        updateElection,
        updateElectionStatus,
        deleteElection,

        refreshElections,
        fetchElections,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
}

export function useElection() {
  const context = useContext(ElectionContext);

  if (!context) {
    throw new Error(
      "useElection must be used inside ElectionProvider"
    );
  }

  return context;
}