import { useEffect, useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Database,
  RefreshCw,
} from "lucide-react";

import { verifyBlockchain } from "../../../api/voteApi";

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="text-cyan-400">{icon}</div>

      <p className="mt-4 text-slate-400">{title}</p>

      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
    </div>
  );
}

export default function BlockchainIntegrity() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    verified: true,
    totalBlocks: 0,
    invalidBlocks: [],
  });

  const loadReport = async () => {
    try {
      setLoading(true);

      const res = await verifyBlockchain();

      setReport(res.data);
    } catch (error) {
      console.error(error);

      setReport({
        verified: false,
        totalBlocks: 0,
        invalidBlocks: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">
        Verifying Blockchain...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8">
          <h1 className="text-5xl font-bold">
            Blockchain Integrity
          </h1>

          <p className="mt-3 text-cyan-100">
            Verify that every blockchain block is linked correctly.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <StatCard
            icon={<Database size={34} />}
            title="Total Blocks"
            value={report.totalBlocks}
          />

          <StatCard
            icon={
              report.verified ? (
                <ShieldCheck size={34} />
              ) : (
                <ShieldAlert size={34} />
              )
            }
            title="Blockchain Status"
            value={report.verified ? "Verified" : "Tampered"}
          />

          <StatCard
            icon={<ShieldAlert size={34} />}
            title="Invalid Blocks"
            value={report.invalidBlocks.length}
          />
        </div>

        {/* Report */}

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold">
                Blockchain Verification Report
              </h2>

              <p className="mt-2 text-slate-400">
                Every block is checked against the previous hash.
              </p>
            </div>

            <button
              onClick={loadReport}
              className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold hover:bg-cyan-700"
            >
              <RefreshCw size={18} />
              Verify Again
            </button>
          </div>

          <div className="mt-8">
            {report.verified ? (
              <div className="rounded-2xl border border-green-500 bg-green-500/10 p-6">
                <div className="flex items-center gap-4">
                  <ShieldCheck
                    size={45}
                    className="text-green-400"
                  />

                  <div>
                    <h2 className="text-2xl font-bold text-green-400">
                      Blockchain Verified
                    </h2>

                    <p className="mt-2 text-slate-300">
                      Every block is linked correctly.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-red-500 bg-red-500/10 p-6">
                <div className="flex items-center gap-4">
                  <ShieldAlert
                    size={45}
                    className="text-red-400"
                  />

                  <div>
                    <h2 className="text-2xl font-bold text-red-400">
                      Blockchain Tampered
                    </h2>

                    <p className="mt-2 text-slate-300">
                      Invalid Blocks:{" "}
                      {report.invalidBlocks.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
        