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
      description: "Create a new election.",
      route: "/admin/create-election",
    },
    {
      title: "Manage Elections",
      description: "View and manage elections.",
      route: "/admin/elections",
    },
    {
      title: "Verify Students",
      description: "Approve eligible voters.",
      route: "/admin/verify-students",
    },
    {
      title: "Results",
      description: "View live election results.",
      route: "/admin/results",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage elections, candidates, students and monitor voting activity.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-sm font-medium uppercase text-gray-500">
              Total Elections
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-3">
              {totalElections}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-sm font-medium uppercase text-gray-500">
              Candidates
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-3">
              {totalCandidates}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-sm font-medium uppercase text-gray-500">
              Active Elections
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-3">
              {activeElections}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-sm font-medium uppercase text-gray-500">
              Total Votes
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-3">
              {totalVotes}
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {menuItems.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {item.description}
                </p>

                <button
                  onClick={() => navigate(item.route)}
                  className="mt-6 px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Open
                </button>
              </div>
            ))}

          </div>
        </div>

        {/* Recent Elections */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Recent Elections
          </h2>

          {elections.length === 0 ? (
            <p className="text-gray-500">
              No elections have been created yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-semibold">Election</th>
                    <th className="text-left py-3 font-semibold">Status</th>
                    <th className="text-left py-3 font-semibold">Candidates</th>
                    <th className="text-left py-3 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {elections.map((election) => (
                    <tr
                      key={election.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4">
                        {election.title}
                      </td>

                      <td className="py-4">
                        {election.status}
                      </td>

                      <td className="py-4">
                        {election.candidates.length}
                      </td>

                      <td className="py-4">
                        <button
                          onClick={() =>
                            navigate(`/admin/election/${election.id}`)
                          }
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Admin;