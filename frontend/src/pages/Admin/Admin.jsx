import {
  Vote,
  Users,
  UserCheck,
  BarChart3,
  ArrowRight,
  Activity,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllElections } from "../../api/electionApi";
import { getBlockchain } from "../../api/voteApi";

function Admin() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [elections, setElections] = useState([]);

  const [blocks, setBlocks] = useState([]);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      setLoading(true);

      const electionRes = await getAllElections();

      const blockchainRes = await getBlockchain();

      setElections(electionRes.data.elections || []);

      setBlocks(blockchainRes.data.blockchain || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const totalElections = elections.length;

  const totalCandidates = elections.reduce(
    (sum, election) => sum + election.candidates.length,
    0
  );

  const totalVotes = elections.reduce(
    (voteSum, election) =>
      voteSum +
      election.candidates.reduce(
        (s, candidate) => s + candidate.votes,
        0
      ),
    0
  );

  const activeElections = elections.filter(
    (election) => election.status === "Active"
  ).length;

  const blockchainBlocks = blocks.length;

  const menuItems = [

    {
      title: "Create Election",
      description: "Create a new blockchain election.",
      route: "/admin/create-election",
      icon: <Vote size={28} />,
    },

    {
      title: "Manage Elections",
      description: "View and manage elections.",
      route: "/admin/elections",
      icon: <BarChart3 size={28} />,
    },

    {
      title: "Candidates",
      description: "Manage election candidates.",
      route: "/admin/elections",
      icon: <Users size={28} />,
    },

    {
      title: "Verify Students",
      description: "Approve eligible students.",
      route: "/admin/verify-students",
      icon: <UserCheck size={28} />,
    },

    {
      title: "Results",
      description: "View election results.",
      route: "/admin/results",
      icon: <Activity size={28} />,
    },

    {
      title: "Blockchain Explorer",
      description: "View every vote stored on the blockchain.",
      route: "/admin/blockchain",
      icon: <ShieldCheck size={28} />,
    },

  ];

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">

        Loading Dashboard...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

          <h1 className="text-4xl font-bold">

            Admin Dashboard

          </h1>

          <p className="mt-3 text-cyan-100">

            Blockchain Election Management System

          </p>

        </div>
                {/* ================= Statistics ================= */}

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 mt-8">

          <StatCard
            icon={<Vote className="text-cyan-400" size={32} />}
            title="Total Elections"
            value={totalElections}
          />

          <StatCard
            icon={<Users className="text-green-400" size={32} />}
            title="Candidates"
            value={totalCandidates}
          />

          <StatCard
            icon={<Activity className="text-purple-400" size={32} />}
            title="Active Elections"
            value={activeElections}
          />

          <StatCard
            icon={<BarChart3 className="text-yellow-400" size={32} />}
            title="Votes Cast"
            value={totalVotes}
          />

          <StatCard
            icon={<ShieldCheck className="text-red-400" size={32} />}
            title="Blockchain Blocks"
            value={blockchainBlocks}
          />

        </div>

        {/* ================= Quick Actions ================= */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">

            Quick Actions

          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {menuItems.map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-500 transition-all duration-300"
              >

                <div className="flex justify-between items-center">

                  <div className="text-cyan-400">

                    {item.icon}

                  </div>

                  <ArrowRight className="text-slate-500" />

                </div>

                <h3 className="text-2xl font-bold mt-6">

                  {item.title}

                </h3>

                <p className="text-slate-400 mt-3">

                  {item.description}

                </p>

                <button
                  onClick={() => navigate(item.route)}
                  className="mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold hover:scale-105 transition"
                >

                  Open

                </button>

              </div>

            ))}

          </div>

        </div>

        {/* ================= Recent Elections ================= */}

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-3xl font-bold mb-8">

            Recent Elections

          </h2>
                    {elections.length === 0 ? (

            <div className="text-center py-12 text-slate-400">

              No elections have been created yet.

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-700">

                    <th className="text-left py-4">Election</th>

                    <th className="text-left py-4">Status</th>

                    <th className="text-left py-4">Candidates</th>

                    <th className="text-left py-4">Votes</th>

                    <th className="text-right py-4">Action</th>

                  </tr>

                </thead>

                <tbody>

                  {elections.map((election) => {

                    const totalVotes = election.candidates.reduce(
                      (sum, candidate) => sum + candidate.votes,
                      0
                    );

                    return (

                      <tr
                        key={election._id}
                        className="border-b border-slate-800 hover:bg-slate-800 transition"
                      >

                        <td className="py-5">

                          {election.title}

                        </td>

                        <td className="py-5">

                          <span
                            className={`rounded-full px-3 py-1 text-sm ${
                              election.status === "Active"
                                ? "bg-green-500/20 text-green-300"
                                : election.status === "Upcoming"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >

                            {election.status}

                          </span>

                        </td>

                        <td className="py-5">

                          {election.candidates.length}

                        </td>

                        <td className="py-5">

                          {totalVotes}

                        </td>

                        <td className="py-5 text-right">

                          <button
                            onClick={() =>
                              navigate(`/admin/election/${election._id}`)
                            }
                            className="rounded-lg border border-cyan-500 px-4 py-2 text-cyan-400 hover:bg-cyan-500 hover:text-white transition"
                          >

                            View

                          </button>

                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

function StatCard({ icon, title, value }) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div>

        {icon}

      </div>

      <p className="mt-4 text-slate-400">

        {title}

      </p>

      <h2 className="mt-2 text-4xl font-bold">

        {value}

      </h2>

    </div>

  );

}

export default Admin;