import { Trophy, Users, Vote, BarChart3 } from "lucide-react";
import { useElection } from "../../context/ElectionContext";

function Results() {
  const { elections } = useElection();

  // Show the latest completed election.
  // If none are completed, fall back to the active election.
  const election =
    elections.find((e) => e.status === "Completed") ||
    elections.find((e) => e.status === "Active");

  if (!election) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h2 className="text-3xl font-bold">No Results Available</h2>
      </div>
    );
  }

  const candidates = [...election.candidates].sort(
    (a, b) => b.votes - a.votes
  );

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">
          <h1 className="text-4xl font-bold">
            {election.title}
          </h1>

          <p className="mt-3 text-cyan-100">
            Blockchain Verified Election Results
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <Vote className="text-cyan-400 mb-4" size={32} />

            <h3 className="text-slate-400">
              Total Votes
            </h3>

            <p className="text-3xl font-bold mt-2">
              {totalVotes}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <Users className="text-green-400 mb-4" size={32} />

            <h3 className="text-slate-400">
              Candidates
            </h3>

            <p className="text-3xl font-bold mt-2">
              {candidates.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <BarChart3 className="text-purple-400 mb-4" size={32} />

            <h3 className="text-slate-400">
              Status
            </h3>

            <p className="text-2xl font-bold mt-2 text-green-400">
              {election.status}
            </p>
          </div>

        </div>

        {/* Candidate Results */}
        <div className="mt-10 rounded-3xl bg-slate-900 border border-slate-800 p-8">

          <h2 className="text-3xl font-bold mb-8">
            Candidate Results
          </h2>

          <div className="space-y-6">

            {candidates.map((candidate, index) => {

              const percentage =
                totalVotes === 0
                  ? 0
                  : ((candidate.votes / totalVotes) * 100).toFixed(1);

              return (

                <div
                  key={candidate.id}
                  className="rounded-2xl bg-slate-800 p-6"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <div className="flex items-center gap-3">

                        {index === 0 && (
                          <Trophy
                            className="text-yellow-400"
                            size={28}
                          />
                        )}

                        <h3 className="text-2xl font-bold">
                          {candidate.name}
                        </h3>

                      </div>

                      <p className="text-slate-400 mt-1">
                        {candidate.party}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-3xl font-bold">
                        {candidate.votes}
                      </p>

                      <p className="text-cyan-400">
                        {percentage}%
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 h-3 rounded-full bg-slate-700 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Results;