import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays, FileText, Vote } from "lucide-react";
import { createElection } from "../../api/electionApi";

function CreateElection() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    try {
      setError("");

      if (!title || !description || !startDate || !endDate) {
        setError("Please fill all fields.");
        return;
      }

      if (endDate <= startDate) {
        setError("End Date must be after Start Date.");
        return;
      }

      setLoading(true);

      await createElection({
        title,
        description,
        startDate,
        endDate,
      });

      alert("Election created successfully!");

      navigate("/admin/elections");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to create election."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-white/20 p-4">
              <Vote size={40} />
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Create Election
              </h1>

              <p className="mt-2 text-cyan-100">
                Create and schedule a secure blockchain election.
              </p>

            </div>

          </div>

        </div>

        {/* Form */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="space-y-8">

            <div>

              <label className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Vote size={20} />
                Election Title
              </label>

              <input
                type="text"
                placeholder="Student Council Election 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 outline-none focus:border-cyan-500"
              />

            </div>

            <div>

              <label className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <FileText size={20} />
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Describe the purpose of this election..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 outline-none focus:border-cyan-500"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div>

                <label className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <CalendarDays size={20} />
                  Start Date
                </label>

                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="dd/MM/yyyy hh:mm aa"
                  placeholderText="Select Start Date"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none"
                />

              </div>

              <div>

                <label className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <CalendarDays size={20} />
                  End Date
                </label>

                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="dd/MM/yyyy hh:mm aa"
                  minDate={startDate}
                  placeholderText="Select End Date"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none"
                />

              </div>

            </div>

            {error && (
              <div className="rounded-xl border border-red-500 bg-red-500/10 px-4 py-3 text-red-400">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <button
                onClick={handleCreate}
                disabled={loading}
                className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-lg font-semibold transition hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Election"}
              </button>

              <button
                onClick={() => navigate("/admin")}
                className="flex-1 rounded-xl border border-slate-700 py-4 text-lg hover:bg-slate-800 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateElection;