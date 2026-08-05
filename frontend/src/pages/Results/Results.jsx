import { useElection } from "../../context/ElectionContext";
import {
  exportResultsPDF,
  exportResultsExcel,
} from "../../utils/exportResults";

import {
  FileDown,
  FileSpreadsheet,
  Trophy,
  Users,
  BarChart3,
} from "lucide-react";

function Results() {
  const { elections } = useElection();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-5xl font-bold">
              Election Results
            </h1>

            <p className="mt-3 text-slate-400">
              View election statistics and export reports.
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => exportResultsPDF(elections)}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
            >
              <FileDown size={20} />
              Export PDF
            </button>

            <button
              onClick={() => exportResultsExcel(elections)}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
            >
              <FileSpreadsheet size={20} />
              Export Excel
            </button>

          </div>

        </div>

        {/* Empty State */}

        {elections.length === 0 ? (

          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

            <h2 className="text-3xl font-bold">

              No Elections Found

            </h2>

            <p className="mt-4 text-slate-400">

              Create an election to view results.

            </p>

          </div>

        ) : (

          <div className="mt-10 space-y-10">

            {elections.map((election) => {

              const totalVotes = election.candidates.reduce(
                (sum, candidate) => sum + candidate.votes,
                0
              );

              const leader =
                election.candidates.length > 0
                  ? election.candidates.reduce((a, b) =>
                      a.votes > b.votes ? a : b
                    )
                  : null;

              return (

                <div
                  key={election.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
                >

                  {/* Election Header */}

                  <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                    <div>

                      <h2 className="text-4xl font-bold">

                        {election.title}

                      </h2>

                      <p className="mt-3 text-slate-400">

                        {election.description}

                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-800 px-8 py-6">

                      <div className="flex items-center gap-3">

                        <Users
                          className="text-cyan-400"
                          size={30}
                        />

                        <div>

                          <p className="text-slate-400">

                            Total Votes

                          </p>

                          <h2 className="text-3xl font-bold">

                            {totalVotes}

                          </h2>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Candidate Results */}

                  <div className="mt-10 space-y-8">

                    {election.candidates.map((candidate) => {

                      const percentage =
                        totalVotes === 0
                          ? 0
                          : (
                              (candidate.votes / totalVotes) *
                              100
                            ).toFixed(1);

                      return (

                        <div
                          key={candidate.id}
                          className="rounded-2xl bg-slate-800 p-6"
                        >

                          <div className="flex justify-between">

                            <div>

                              <h3 className="text-2xl font-bold">

                                {candidate.name}

                              </h3>

                              <p className="text-slate-400">

                                {candidate.party}

                              </p>

                            </div>

                            <div className="text-right">

                              <h2 className="text-2xl font-bold">

                                {candidate.votes}

                              </h2>

                              <p className="text-cyan-400">

                                {percentage}%

                              </p>

                            </div>

                          </div>

                          <div className="mt-5 h-4 rounded-full bg-slate-700">

                            <div
                              className="h-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                              style={{
                                width: `${percentage}%`,
                              }}
                            ></div>

                          </div>

                        </div>

                      );

                    })}

                  </div>

                  {/* Winner */}

                  {leader && (

                    <div className="mt-10 rounded-3xl border border-green-500 bg-green-500/10 p-8">

                      <div className="flex items-center gap-5">

                        <Trophy
                          size={50}
                          className="text-yellow-400"
                        />

                        <div>

                          <h2 className="text-3xl font-bold text-green-400">

                            Current Leader

                          </h2>

                          <p className="mt-2 text-xl">

                            {leader.name}

                          </p>

                          <p className="text-slate-400">

                            {leader.party}

                          </p>

                        </div>

                      </div>

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default Results;