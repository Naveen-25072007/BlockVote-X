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
    <div className="min-h-screen bg-slate-950 py-10 px-6">

      <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 text-white">

        {/* Header */}

       {/* Header */}

<div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 mb-8 shadow-xl">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

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
          className="w-full rounded-xl bg-white/20 px-5 py-3 text-4xl font-bold text-white placeholder-white outline-none"
        />

      ) : (

        <h1 className="text-4xl font-bold">
          {election.title}
        </h1>

      )}

      <p className="mt-3 text-cyan-100">
        Blockchain Verified Election
      </p>

      <div className="mt-5 flex flex-wrap gap-3">

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            election.status === "Active"
              ? "bg-green-500/20 text-green-200"
              : election.status === "Upcoming"
              ? "bg-yellow-500/20 text-yellow-100"
              : "bg-red-500/20 text-red-200"
          }`}
        >
          {election.status}
        </span>

        <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
          {election.candidates.length} Candidates
        </span>

      </div>

    </div>

    <div className="flex gap-3">

      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            className="rounded-xl bg-green-500 px-6 py-3 font-semibold hover:bg-green-600 transition"
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
            className="rounded-xl bg-slate-700 px-6 py-3 font-semibold hover:bg-slate-600 transition"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold hover:bg-yellow-600 transition"
          >
            Edit
          </button>

          <button
            onClick={() => setShowDeleteDialog(true)}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </>
      )}

    </div>

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

          <p className="text-slate-300 mb-6 leading-7">
            {election.description}
          </p>

        )}

        {/* Information Cards */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

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
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            ) : (
              <p>
                {formatDateTime(election.startDate)}
              </p>
            )}

          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

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
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            ) : (
              <p>
                {formatDateTime(election.endDate)}
              </p>
            )}

          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

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
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
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
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <input
              type="text"
              placeholder="Party Name"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

          </div>

          <button
            onClick={handleAddCandidate}
            className="mt-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 hover:scale-105 transition"
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

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center text-slate-400">
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