import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { useElection } from "../../context/ElectionContext";

export default function History() {
  const { elections } = useElection();

  // Get elections where the student has voted
  const votingHistory = elections
    .filter((election) => election.hasVoted)
    .map((election) => ({
      id: election.id,
      election: election.title,
      candidate:
        election.candidates.find(
          (candidate) => candidate.id === election.selectedCandidate
        )?.name || "Unknown Candidate",
      date: new Date(
        election.endDate || election.startDate
      ).toLocaleDateString(),
      status: "Verified",
    }));

  const latestVote =
    votingHistory.length > 0
      ? votingHistory[0].date
      : "No Votes Yet";

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

          <h1 className="text-4xl font-bold">
            Voting History
          </h1>

          <p className="mt-3 text-cyan-100">
            View your blockchain verified voting records.
          </p>

        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <CheckCircle2
              className="text-green-400 mb-4"
              size={34}
            />

            <p className="text-slate-400">
              Total Votes
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {votingHistory.length}
            </h2>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <ShieldCheck
              className="text-cyan-400 mb-4"
              size={34}
            />

            <p className="text-slate-400">
              Blockchain Status
            </p>

            <h2 className="text-2xl font-bold mt-2 text-green-400">
              Verified
            </h2>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <Clock3
              className="text-purple-400 mb-4"
              size={34}
            />

            <p className="text-slate-400">
              Latest Vote
            </p>

            <h2 className="text-xl font-bold mt-2">
              {latestVote}
            </h2>

          </div>

        </div>

        {/* History */}
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-3xl font-bold mb-8">
            Voting Records
          </h2>

          {votingHistory.length === 0 ? (

            <div className="text-center py-16">

              <ShieldCheck
                className="mx-auto text-cyan-400"
                size={60}
              />

              <h3 className="mt-6 text-2xl font-bold">
                No Voting History
              </h3>

              <p className="mt-2 text-slate-400">
                You haven't voted in any elections yet.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {votingHistory.map((vote) => (

                <div
                  key={vote.id}
                  className="rounded-2xl border border-slate-800 bg-slate-800 p-6 hover:border-cyan-500 transition"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>

                      <h3 className="text-2xl font-semibold">
                        {vote.election}
                      </h3>

                      <p className="mt-2 text-slate-400">
                        Candidate:
                        <span className="ml-2 text-white">
                          {vote.candidate}
                        </span>
                      </p>

                      <p className="mt-1 text-slate-400">
                        Date:
                        <span className="ml-2 text-white">
                          {vote.date}
                        </span>
                      </p>

                    </div>

                    <div className="text-right">

                      <span className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-green-300">

                        <ShieldCheck size={18} />

                        {vote.status}

                      </span>

                      <p className="mt-4 text-sm text-slate-500">
                        Election ID
                      </p>

                      <p className="font-mono text-cyan-400">
                        {vote.id}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}