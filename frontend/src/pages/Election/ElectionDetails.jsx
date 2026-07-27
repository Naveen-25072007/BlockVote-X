import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function ElectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    elections,
    addCandidate,
    deleteCandidate,
    updateElection,
    updateElectionStatus,
    deleteElection,
  } = useElection();

  const election = elections.find(
    (e) => e.id === Number(id)
  );

  const [name, setName] = useState("");
  const [party, setParty] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [editData, setEditData] = useState({
    title: election?.title || "",
    description: election?.description || "",
    startDate: election?.startDate || "",
    endDate: election?.endDate || "",
  });

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Election Not Found
        </h1>
      </div>
    );
  }

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

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

  const handleSave = () => {
    updateElection(election.id, editData);
    setIsEditing(false);
  };

  const handleDeleteElection = () => {
    deleteElection(election.id);
    navigate("/admin/elections");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>

            {isEditing ? (

              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    title: e.target.value,
                  })
                }
                className="border rounded-lg px-4 py-2 w-full text-3xl font-bold"
              />

            ) : (

              <h1 className="text-3xl font-bold">
                {election.title}
              </h1>

            )}

          </div>

          <div className="space-x-3">

            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditData({
                      title: election.title,
                      description: election.description,
                      startDate: election.startDate,
                      endDate: election.endDate,
                    });

                    setIsEditing(false);
                  }}
                  className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    setShowDeleteDialog(true)
                  }
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            )}

          </div>

        </div>

        {/* Description */}

        {isEditing ? (

          <textarea
            rows="4"
            value={editData.description}
            onChange={(e) =>
              setEditData({
                ...editData,
                description: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3 mb-6"
          />

        ) : (

          <p className="text-gray-700 mb-6">
            {election.description}
          </p>

        )}

        {/* Information Cards */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-gray-100 rounded-xl p-5">

            <p className="font-semibold mb-2">
              Start Date
            </p>

            {isEditing ? (
              <input
                type="datetime-local"
                value={editData.startDate}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    startDate: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <p>
                {formatDateTime(election.startDate)}
              </p>
            )}

          </div>

          <div className="bg-gray-100 rounded-xl p-5">

            <p className="font-semibold mb-2">
              End Date
            </p>

            {isEditing ? (
              <input
                type="datetime-local"
                value={editData.endDate}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    endDate: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <p>
                {formatDateTime(election.endDate)}
              </p>
            )}

          </div>

          <div className="bg-gray-100 rounded-xl p-5">

            <p className="font-semibold mb-2">
              Status
            </p>

            <select
              value={election.status}
              onChange={(e) =>
                updateElectionStatus(
                  election.id,
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>Upcoming</option>
              <option>Active</option>
              <option>Closed</option>
            </select>

          </div>

        </div>
                {/* Add Candidate */}

        <div className="border-t pt-8">

          <h2 className="text-2xl font-bold mb-5">
            Add Candidate
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Candidate Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Party Name"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              className="border rounded-lg px-4 py-3"
            />

          </div>

          <button
            onClick={handleAddCandidate}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
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

            <div className="bg-gray-50 border rounded-xl p-6 text-center text-gray-500">
              No candidates added yet.
            </div>

          ) : (

            <div className="space-y-4">

              {election.candidates.map((candidate) => (

                <div
                  key={candidate.id}
                  className="border rounded-xl p-5 flex justify-between items-center hover:shadow-md transition"
                >

                  <div>

                    <h3 className="text-xl font-semibold">
                      {candidate.name}
                    </h3>

                    <p className="text-gray-600">
                      Party: {candidate.party}
                    </p>

                    <p className="text-sm text-blue-600 mt-1">
                      Votes: {candidate.votes}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      deleteCandidate(
                        election.id,
                        candidate.id
                      )
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

        {/* Bottom Buttons */}

        <div className="flex justify-between items-center mt-10">

          <Link
            to="/admin/elections"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            ← Back to Elections
          </Link>

        </div>

      </div>

      {/* Delete Confirmation Dialog */}

      {showDeleteDialog && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl p-8 w-[420px] shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
              Delete Election
            </h2>

            <p className="text-gray-600 mb-8">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                "{election.title}"
              </span>
              ?
              <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowDeleteDialog(false)
                }
                className="px-5 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteElection}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ElectionDetails;