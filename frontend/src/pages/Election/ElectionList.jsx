import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Vote, Eye } from "lucide-react";
import { getAllElections } from "../../api/electionApi";

function ElectionList() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      setLoading(true);

      const res = await getAllElections();

      setElections(res.data.elections || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load elections");
    } finally {
      setLoading(false);
    }
  };

  const filteredElections = elections.filter((election) => {
    const matchesSearch = election.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      election.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-300";

      case "Upcoming":
        return "bg-yellow-500/20 text-yellow-300";

      case "Closed":
      case "Completed":
      case "Ended":
        return "bg-red-500/20 text-red-300";

      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">
        Loading Elections...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

          <h1 className="text-4xl font-bold">
            Manage Elections
          </h1>

          <p className="mt-3 text-cyan-100">
            Search, filter and manage every election in the system.
          </p>

        </div>

        {/* Search */}

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <div className="grid md:grid-cols-2 gap-5">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search Elections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-12 pr-4 outline-none focus:border-cyan-500"
              />

            </div>

            <div className="relative">

              <Filter
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-12 pr-4 outline-none focus:border-cyan-500"
              >
                <option>All</option>
                <option>Upcoming</option>
                <option>Active</option>
                <option>Closed</option>
                <option>Completed</option>
              </select>

            </div>

          </div>

        </div>

        {/* Election List */}

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold mb-8">
            Elections
          </h2>

          {filteredElections.length === 0 ? (

            <div className="text-center py-20">

              <Vote
                size={60}
                className="mx-auto text-slate-600"
              />

              <h3 className="mt-6 text-2xl font-bold">
                No Elections Found
              </h3>

            </div>

          ) : (

            <div className="space-y-6">

              {filteredElections.map((election) => (

                <div
                  key={election._id}
                  className="rounded-2xl border border-slate-800 bg-slate-800 p-6 hover:border-cyan-500 transition"
                >

                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                    <div>

                      <h3 className="text-2xl font-bold">
                        {election.title}
                      </h3>

                      <p className="mt-2 text-slate-400">
                        {election.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">

                        <span
                          className={`rounded-full px-4 py-1 text-sm ${getStatusColor(
                            election.status
                          )}`}
                        >
                          {election.status}
                        </span>

                        <span className="rounded-full bg-slate-700 px-4 py-1 text-sm">
                          {election.candidates?.length || 0} Candidates
                        </span>

                      </div>

                    </div>

                    <Link
                      to={`/admin/election/${election._id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold hover:scale-105 transition"
                    >
                      <Eye size={18} />
                      View Details
                    </Link>

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

export default ElectionList;