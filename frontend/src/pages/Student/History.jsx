import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import { getMyVotingHistory } from "../../api/voteApi";

export default function History() {

  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState([]);

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      const res = await getMyVotingHistory();

      setHistory(res.data.history || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">

        Loading Voting History...

      </div>

    );

  }

  const latestVote =
    history.length > 0
      ? new Date(history[0].votedAt).toLocaleString()
      : "No Votes";

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

          <h1 className="text-4xl font-bold">

            Voting History

          </h1>

          <p className="mt-3 text-cyan-100">

            Blockchain Verified Voting Records

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

              {history.length}

            </h2>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <ShieldCheck
              className="text-cyan-400 mb-4"
              size={34}
            />

            <p className="text-slate-400">

              Blockchain

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

            <h2 className="text-lg font-bold mt-2">

              {latestVote}

            </h2>

          </div>

        </div>

        {/* Records */}

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-3xl font-bold mb-8">

            Voting Records

          </h2>
                    {history.length === 0 ? (

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

              {history.map((vote) => (

                <div
                  key={vote._id}
                  className="rounded-2xl border border-slate-800 bg-slate-800 p-6 hover:border-cyan-500 transition"
                >

                  <div className="flex flex-col lg:flex-row lg:justify-between gap-8">

                    <div className="flex-1">

                      <h3 className="text-2xl font-bold">

                        {vote.election}

                      </h3>

                      <p className="mt-4 text-slate-400">

                        Candidate

                      </p>

                      <h4 className="text-lg font-semibold">

                        {vote.candidate?.name || "Unknown Candidate"}

                      </h4>

                      <p className="text-cyan-400">

                        {vote.candidate?.party || "-"}

                      </p>

                      <p className="mt-5 text-slate-400">

                        Vote Time

                      </p>

                      <h4>

                        {new Date(vote.votedAt).toLocaleString()}

                      </h4>

                    </div>

                    <div className="flex-1">

                      <div className="rounded-xl bg-slate-900 p-4">

                        <p className="text-slate-400">

                          Block Number

                        </p>

                        <h2 className="text-3xl font-bold text-cyan-400">

                          #{vote.blockNumber}

                        </h2>

                      </div>

                      <div className="mt-5">

                        <p className="text-slate-400">

                          Blockchain Hash

                        </p>

                        <div className="mt-2 rounded-xl bg-slate-900 p-4 font-mono text-xs break-all text-green-400">

                          {vote.blockchainHash}

                        </div>

                      </div>

                    </div>

                    <div className="lg:w-56">

                      <div className="rounded-xl border border-green-500 bg-green-500/10 p-5 text-center">

                        <ShieldCheck
                          size={40}
                          className="mx-auto text-green-400"
                        />

                        <h3 className="mt-4 text-xl font-bold text-green-400">

                          Verified

                        </h3>

                        <p className="mt-2 text-sm text-slate-400">

                          This vote is permanently stored in the blockchain.

                        </p>

                      </div>

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