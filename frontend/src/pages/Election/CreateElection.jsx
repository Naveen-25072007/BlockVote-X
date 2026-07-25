import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function CreateElection() {
  const navigate = useNavigate();
  const { addElection } = useElection();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreate = () => {
    if (!title || !description || !startDate || !endDate) {
      alert("Please fill all fields.");
      return;
    }

    addElection({
      title,
      description,
      startDate,
      endDate,
    });

    navigate("/admin/elections");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-6">
          Create Election
        </h1>

        <div className="space-y-4">

          <input
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Election Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="datetime-local"
            className="w-full border rounded-lg px-4 py-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="datetime-local"
            className="w-full border rounded-lg px-4 py-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Create Election
          </button>

        </div>

      </div>
    </div>
  );
}

export default CreateElection;