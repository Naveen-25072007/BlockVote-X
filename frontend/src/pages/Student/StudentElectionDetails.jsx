import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function StudentElectionDetails() {
  const { id } = useParams();

  const { elections, submitVote } = useElection();

  const election = elections.find(
    (e) => e.id === Number(id)
  );

  const [selectedCandidate, setSelectedCandidate] = useState("");

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Election Not Found
        </h1>
      </div>
    );
  }

  const handleVote = () => {
    if (!selectedCandidate) {
      alert("Please select a candidate.");
      return;
    }

    submitVote(election.id, Number(selectedCandidate));

    alert("✅ Vote submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-4">
          {election.title}
        </h1>

        <p className="text-gray-600 mb-8">
          {election.description}
        </p>

        <h2 className="text-2xl font-bold mb-5">
          Select Your Candidate
        </h2>

        {election.candidates.length === 0 ? (

          <p className="text-red-500">
            No candidates available.
          </p>

        ) : (

          <div className="space-y-4">

            {election.candidates.map((candidate) => (

              <label
                key={candidate.id}
                className="flex items-center border rounded-lg p-4 cursor-pointer hover:bg-slate-100"
              >
                <input
                  type="radio"
                  name="candidate"
                  value={candidate.id}
                  onChange={(e) =>
                    setSelectedCandidate(e.target.value)
                  }
                  className="mr-4"
                />

                <div>
                  <h3 className="text-xl font-semibold">
                    {candidate.name}
                  </h3>

                  <p className="text-gray-600">
                    Party: {candidate.party}
                  </p>
                </div>

              </label>

            ))}

          </div>

        )}

        <button
          onClick={handleVote}
          disabled={election.hasVoted}
          className={`mt-8 px-6 py-3 rounded-lg text-white ${
            election.hasVoted
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {election.hasVoted ? "Already Voted" : "Submit Vote"}
        </button>

        <Link
          to="/student"
          className="inline-block ml-4 mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Back
        </Link>

      </div>

    </div>
  );
}

export default StudentElectionDetails;