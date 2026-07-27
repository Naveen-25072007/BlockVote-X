import { Link } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";
import { useState } from "react";

function ElectionList() {
  const { elections } = useElection();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredElections = elections.filter((election) => {
    const matchesSearch = election.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || election.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Elections
          </h1>

          <p className="text-gray-600 mt-2">
            Search, filter and manage all elections.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search elections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
            >
              <option>All</option>
              <option>Upcoming</option>
              <option>Active</option>
              <option>Closed</option>
            </select>

          </div>
        </div>

        {/* Election Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          {filteredElections.length === 0 ? (

            <div className="p-10 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                No elections found
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing your search or create a new election.
              </p>
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-gray-50 border-b border-gray-200">

                <tr>
                  <th className="text-left px-6 py-4">Election</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-6 py-4">Candidates</th>
                  <th className="text-left px-6 py-4">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredElections.map((election) => (

                  <tr
                    key={election.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold">
                        {election.title}
                      </div>

                      <div className="text-sm text-gray-500">
                        {election.description}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {election.status}
                    </td>

                    <td className="px-6 py-4">
                      {election.candidates.length}
                    </td>

                    <td className="px-6 py-4">

                      <Link
                        to={`/admin/election/${election.id}`}
                        className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>
    </div>
  );
}

export default ElectionList;