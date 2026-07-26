import { Link } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function Student() {
  const { elections } = useElection();

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-blue-700 text-white px-8 py-5 shadow">
        <h1 className="text-3xl font-bold">
          Student Dashboard
        </h1>

        <p className="text-blue-100 mt-1">
          Welcome to BlockVote X
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-2xl font-bold mb-6">
          Available Elections
        </h2>

        {elections.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h3 className="text-2xl font-bold">
              No Elections Available
            </h3>

            <p className="text-gray-600 mt-3">
              The administrator has not created any elections yet.
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {elections.map((election) => (

              <div
                key={election.id}
                className="bg-white rounded-xl shadow p-6"
              >
                <h3 className="text-xl font-bold">
                  {election.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {election.description}
                </p>

                <div className="mt-4 space-y-2">

                  <p>
                    <strong>Status:</strong> {election.status}
                  </p>

                  <p>
                    <strong>Candidates:</strong>{" "}
                    {election.candidates.length}
                  </p>

                  <p>
                    <strong>Start:</strong>{" "}
                    {election.startDate}
                  </p>

                  <p>
                    <strong>End:</strong>{" "}
                    {election.endDate}
                  </p>

                </div>

                <Link
                  to={`/student/election/${election.id}`}
                  className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Vote Now
                </Link>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Student;