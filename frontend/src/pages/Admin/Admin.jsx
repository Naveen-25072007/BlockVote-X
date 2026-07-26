import { useNavigate } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function Admin() {
  const navigate = useNavigate();

  const { elections } = useElection();

  // Statistics
  const totalElections = elections.length;

  const totalCandidates = elections.reduce(
    (total, election) => total + election.candidates.length,
    0
  );

  const totalVotes = elections.reduce(
    (voteTotal, election) =>
      voteTotal +
      election.candidates.reduce(
        (sum, candidate) => sum + candidate.votes,
        0
      ),
    0
  );

  const activeElections = elections.filter(
    (election) => election.status === "Active"
  ).length;

  const menuItems = [
    {
      title: "Create Election",
      description: "Create a new election",
      route: "/admin/create-election",
      color: "bg-blue-600",
    },
    {
      title: "Manage Elections",
      description: "View and manage elections",
      route: "/admin/elections",
      color: "bg-green-600",
    },
    {
      title: "Candidates",
      description: "Manage election candidates",
      route: "/admin/elections",
      color: "bg-purple-600",
    },
    {
      title: "Verify Students",
      description: "Approve eligible voters",
      route: "/admin/verify-students",
      color: "bg-yellow-500",
    },
    {
      title: "Results",
      description: "View live election results",
      route: "/admin/results",
      color: "bg-pink-600",
    },
    {
      title: "Settings",
      description: "System configuration",
      route: "#",
      color: "bg-gray-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage elections, candidates, students, and results.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Elections
            </h2>

            <p className="text-4xl font-bold mt-2">
              {totalElections}
            </p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Candidates
            </h2>

            <p className="text-4xl font-bold mt-2">
              {totalCandidates}
            </p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Active Elections
            </h2>

            <p className="text-4xl font-bold mt-2">
              {activeElections}
            </p>
          </div>

          <div className="bg-pink-600 text-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Votes
            </h2>

            <p className="text-4xl font-bold mt-2">
              {totalVotes}
            </p>
          </div>

        </div>

        {/* Menu */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {menuItems.map((item) => (

            <div
              key={item.title}
              onClick={() =>
                item.route !== "#" &&
                navigate(item.route)
              }
              className={`${item.color} text-white rounded-xl p-6 shadow-lg cursor-pointer hover:scale-105 transition duration-300`}
            >
              <h2 className="text-2xl font-bold mb-3">
                {item.title}
              </h2>

              <p>{item.description}</p>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Admin;