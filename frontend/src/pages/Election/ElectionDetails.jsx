import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function ElectionDetails() {
  const { id } = useParams();
  const { elections, addCandidate, deleteCandidate } = useElection();

  const election = elections.find(
    (e) => e.id === Number(id)
  );

  const [name, setName] = useState("");
  const [party, setParty] = useState("");

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Election Not Found
        </h1>
      </div>
    );
  }

  const handleAddCandidate = () => {
    if (!name.trim() || !party.trim()) {
      alert("Please fill all fields.");
      return;
    }

    addCandidate(election.id, {
      name,
      party,
    });

    setName("");
    setParty("");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-4">
          {election.title}
        </h1>

        <p className="text-gray-700 mb-4">
          {election.description}
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-100 p-4 rounded-lg">
            <p className="font-semibold">Start Date</p>
            <p>{election.startDate}</p>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg">
            <p className="font-semibold">End Date</p>
            <p>{election.endDate}</p>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg">
            <p className="font-semibold">Status</p>
            <p>{election.status}</p>
          </div>
        </div>

        {/* Add Candidate */}

        <div className="border-t pt-8">

          <h2 className="text-2xl font-bold mb-5">
            Add Candidate
          </h2>

          <input
            type="text"
            placeholder="Candidate Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-4"
          />

          <input
            type="text"
            placeholder="Party Name"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-4"
          />

          <button
            onClick={handleAddCandidate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Candidate
          </button>

        </div>

        {/* Candidate List */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Candidates ({election.candidates.length})
          </h2>

          {election.candidates.length === 0 ? (

            <p className="text-gray-500">
              No candidates added yet.
            </p>

          ) : (

            <div className="space-y-4">

              {election.candidates.map((candidate) => (

                <div
                  key={candidate.id}
                  className="border rounded-xl p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="text-xl font-semibold">
                      {candidate.name}
                    </h3>

                    <p className="text-gray-600">
                      Party: {candidate.party}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      deleteCandidate(election.id, candidate.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        <Link
          to="/admin/elections"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          ← Back to Elections
        </Link>

      </div>
    </div>
  );
}

export default ElectionDetails;