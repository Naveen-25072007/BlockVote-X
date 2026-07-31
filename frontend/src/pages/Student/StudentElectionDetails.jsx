import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function StudentElectionDetails() {
  const { id } = useParams();
  const { elections, submitVote } = useElection();

  const election = elections.find((e) => e.id === Number(id));

  const [selectedCandidate, setSelectedCandidate] = useState("");

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Election Not Found</h1>
          <Link
            to="/student/dashboard"
            className="mt-6 inline-block rounded-xl bg-cyan-600 px-6 py-3 hover:bg-cyan-700 transition"
          >
            Back to Dashboard
          </Link>
        </div>
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
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

            <div>

              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-4">
                Active Election
              </span>

              <h1 className="text-4xl font-bold">
                {election.title}
              </h1>

              <p className="mt-3 text-cyan-100 max-w-3xl">
                {election.description}
              </p>

            </div>

            <div className="mt-6 lg:mt-0 text-right">

              <p className="text-cyan-100">
                Blockchain Status
              </p>

              <h3 className="text-2xl font-bold text-green-300">
                Secure & Verified
              </h3>

            </div>

          </div>

        </div>

        {/* Candidate List */}
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-3xl font-bold mb-8">
            Choose Your Candidate
          </h2>

          {election.candidates.length === 0 ? (

            <div className="text-center py-16">

              <h3 className="text-2xl font-semibold text-red-400">
                No Candidates Available
              </h3>

              <p className="mt-3 text-slate-400">
                The administrator hasn't added candidates yet.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {election.candidates.map((candidate) => (

                <label
                  key={candidate.id}
                  className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                    selectedCandidate === String(candidate.id)
                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                      : "border-slate-700 bg-slate-800 hover:border-cyan-400 hover:-translate-y-1"
                  }`}
                >

                  <div className="flex items-start gap-4">

                    <input
                      type="radio"
                      name="candidate"
                      value={candidate.id}
                      checked={selectedCandidate === String(candidate.id)}
                      onChange={(e) =>
                        setSelectedCandidate(e.target.value)
                      }
                      className="mt-2 accent-cyan-500"
                    />

                    <div className="flex-1">

                      <div className="flex justify-between items-center">

                        <h3 className="text-2xl font-bold">
                          {candidate.name}
                        </h3>

                        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
                          Verified
                        </span>

                      </div>

                      <p className="mt-3 text-slate-400">
                        <span className="font-semibold text-white">
                          Party:
                        </span>{" "}
                        {candidate.party}
                      </p>

                      <div className="mt-5 rounded-xl bg-slate-700/40 p-4">

                        <p className="text-sm text-slate-300">
                          Every vote is encrypted and permanently stored
                          on the blockchain to ensure complete transparency
                          and security.
                        </p>

                      </div>

                    </div>

                  </div>

                </label>

              ))}

            </div>

          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <button
              onClick={handleVote}
              disabled={election.hasVoted}
              className={`flex-1 rounded-xl py-4 font-semibold transition-all duration-300 ${
                election.hasVoted
                  ? "cursor-not-allowed bg-slate-700"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02]"
              }`}
            >
              {election.hasVoted
                ? "Already Voted"
                : "Submit Vote"}
            </button>

            <Link
              to="/student/dashboard"
              className="flex-1 rounded-xl border border-slate-700 py-4 text-center hover:bg-slate-800 transition"
            >
              Back to Dashboard
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentElectionDetails;