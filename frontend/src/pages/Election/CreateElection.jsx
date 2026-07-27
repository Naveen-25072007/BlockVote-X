import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useElection } from "../../context/ElectionContext";

function CreateElection() {
  const navigate = useNavigate();
  const { addElection } = useElection();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleCreate = () => {
    if (!title || !description || !startDate || !endDate) {
      alert("Please fill all fields.");
      return;
    }

    if (endDate <= startDate) {
      alert("End Date must be after Start Date.");
      return;
    }

    addElection({
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: "Upcoming",
      candidates: [],
    });

    navigate("/admin/elections");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Create Election
        </h1>

        <div className="space-y-6">

          <div>
            <label className="block mb-2 font-semibold">
              Election Title
            </label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter Election Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows="4"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter Election Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Start Date & Time
            </label>

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="dd/MM/yyyy hh:mm aa"
              placeholderText="Select Start Date & Time"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              End Date & Time
            </label>

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="dd/MM/yyyy hh:mm aa"
              placeholderText="Select End Date & Time"
              minDate={startDate}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleCreate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Election
          </button>

        </div>

      </div>
    </div>
  );
}

export default CreateElection;