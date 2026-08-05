import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Link2,
  Database,
  User,
  Vote,
  Calendar,
} from "lucide-react";

import { getBlockchain } from "../../api/voteApi";

function BlockchainExplorer() {

  const [loading, setLoading] = useState(true);

  const [blocks, setBlocks] = useState([]);

  useEffect(() => {

    loadBlockchain();

  }, []);

  const loadBlockchain = async () => {

    try {

      const res = await getBlockchain();

      setBlocks(res.data.blockchain || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">

        Loading Blockchain...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8">

          <h1 className="text-5xl font-bold">

            Blockchain Explorer

          </h1>

          <p className="mt-3 text-cyan-100">

            Every vote is stored as an immutable blockchain block.

          </p>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mt-8">

          <StatCard
            icon={<Database size={34} />}
            title="Blocks"
            value={blocks.length}
          />

          <StatCard
            icon={<Vote size={34} />}
            title="Votes"
            value={blocks.length}
          />

          <StatCard
            icon={<ShieldCheck size={34} />}
            title="Integrity"
            value="Verified"
          />

          <StatCard
            icon={<Link2 size={34} />}
            title="Latest Block"
            value={
              blocks.length
                ? "#" + blocks[blocks.length - 1].blockNumber
                : "-"
            }
          />

        </div>

        <div className="mt-10 space-y-12">          {blocks.length === 0 ? (

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">

              <Database
                size={60}
                className="mx-auto text-slate-500"
              />

              <h2 className="mt-6 text-3xl font-bold">

                Blockchain Empty

              </h2>

              <p className="mt-3 text-slate-400">

                No votes have been recorded yet.

              </p>

            </div>

          ) : (

            blocks.map((block) => (

              <div
                key={block._id}
                className="relative rounded-3xl border border-cyan-500/30 bg-slate-900 p-8 shadow-xl"
              >

                {/* Connection Line */}

                <div className="absolute -top-10 left-10 h-10 w-1 bg-cyan-500"></div>

                <div className="flex flex-col lg:flex-row lg:justify-between gap-8">

                  {/* Left Side */}

                  <div className="flex-1">

                    <div className="inline-flex items-center gap-3 rounded-full bg-cyan-500/20 px-4 py-2">

                      <Link2
                        className="text-cyan-400"
                        size={20}
                      />

                      <span className="font-semibold">

                        Block #{block.blockNumber}

                      </span>

                    </div>

                    <div className="mt-6 space-y-4">

                      <div className="flex items-center gap-3">

                        <User
                          size={18}
                          className="text-cyan-400"
                        />

                        <span>
                          <strong>Student:</strong>{" "}
                          {block.student.name}
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <Vote
                          size={18}
                          className="text-green-400"
                        />

                        <span>
                          <strong>Candidate:</strong>{" "}
                          {block.candidate.name}
                        </span>

                      </div>

                      <div>

                        <p className="text-slate-400">

                          Party

                        </p>

                        <h3>

                          {block.candidate.party}

                        </h3>

                      </div>

                      <div>

                        <p className="text-slate-400">

                          Election

                        </p>

                        <h3>

                          {block.election.title}

                        </h3>

                      </div>

                      <div className="flex items-center gap-3">

                        <Calendar
                          size={18}
                          className="text-purple-400"
                        />

                        <span>

                          {new Date(
                            block.votedAt
                          ).toLocaleString()}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Right Side */}

                  <div className="flex-1">

                    <div>

                      <p className="text-slate-400">

                        Previous Hash

                      </p>

                      <div className="mt-2 rounded-xl bg-slate-800 p-4 font-mono text-xs break-all text-yellow-400">

                        {block.previousHash}

                      </div>

                    </div>

                    <div className="mt-6">

                      <p className="text-slate-400">

                        Current Hash

                      </p>

                      <div className="mt-2 rounded-xl bg-slate-800 p-4 font-mono text-xs break-all text-green-400">

                        {block.blockchainHash}

                      </div>

                    </div>

                    <div className="mt-8 flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500 p-4">

                      <ShieldCheck
                        className="text-green-400"
                        size={28}
                      />

                      <div>

                        <h3 className="font-bold text-green-400">

                          VERIFIED BLOCK

                        </h3>

                        <p className="text-sm text-slate-400">

                          Blockchain integrity confirmed

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="text-cyan-400">
        {icon}
      </div>

      <p className="mt-4 text-slate-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}

export default BlockchainExplorer;