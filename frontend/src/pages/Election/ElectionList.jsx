import { Link } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function ElectionList() {
  const { elections } = useElection();

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-3xl font-bold mb-6">
        Manage Elections
      </h1>

      {elections.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          No elections created yet.
        </div>
      ) : (
        <div className="space-y-5">
          {elections.map((election) => (
            <div
              key={election.id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                {election.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {election.description}
              </p>

              <p className="mt-3">
                <strong>Status:</strong> {election.status}
              </p>

              <div className="mt-5">
                <Link
                  to={`/admin/election/${election.id}`}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default ElectionList;