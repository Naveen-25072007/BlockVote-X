import { useParams, Link } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function ElectionDetails() {
  const { id } = useParams();
  const { elections } = useElection();

  const election = elections.find(
    (e) => e.id === Number(id)
  );

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Election Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-6">
          {election.title}
        </h1>

        <p className="mb-5 text-gray-700">
          {election.description}
        </p>

        <p>
          <strong>Start:</strong> {election.startDate}
        </p>

        <p className="mt-2">
          <strong>End:</strong> {election.endDate}
        </p>

        <p className="mt-2">
          <strong>Status:</strong> {election.status}
        </p>

        <h2 className="text-2xl font-bold mt-8">
          Candidates
        </h2>

        {election.candidates.length === 0 ? (
          <p className="text-gray-500 mt-3">
            No candidates added yet.
          </p>
        ) : (
          <ul className="mt-3 list-disc pl-6">
            {election.candidates.map((candidate, index) => (
              <li key={index}>{candidate.name}</li>
            ))}
          </ul>
        )}

        <Link
          to="/admin/elections"
          className="inline-block mt-8 bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Back to Elections
        </Link>

      </div>
    </div>
  );
}

export default ElectionDetails;