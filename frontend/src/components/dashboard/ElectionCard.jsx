import { useEffect, useState } from "react";
import { CalendarDays, Clock3, Users, Vote } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllElections } from "../../api/electionApi";

function ElectionCard() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {

      setLoading(true);

      const res = await getAllElections();

      console.log("Student Elections:", res.data.elections);

      setElections(res.data.elections || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-white">
        Loading Elections...
      </div>
    );
  }

  const activeElection = elections.find(
    (election) => election.status === "Active"
  );

  if (!activeElection) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center">

        <h2 className="text-2xl font-bold text-white">
          No Active Election
        </h2>

        <p className="mt-3 text-slate-400">
          There is currently no active election available.
        </p>

      </div>
    );
  }

  const endDate = new Date(activeElection.endDate);
  const now = new Date();

  const diff = endDate - now;

  const days = Math.max(
    0,
    Math.floor(diff / (1000 * 60 * 60 * 24))
  );

  const hours = Math.max(
    0,
    Math.floor((diff / (1000 * 60 * 60)) % 24)
  );

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8 shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
            ● Active Election
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white">
            {activeElection.title}
          </h2>

          <p className="mt-2 text-slate-400">
            {activeElection.description}
          </p>

        </div>

        <Vote
          size={60}
          className="text-cyan-400"
        />

      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">

        <div className="rounded-2xl bg-slate-800/60 p-5">

          <CalendarDays className="mb-3 text-cyan-400" />

          <p className="text-sm text-slate-400">
            Start Date
          </p>

          <h3 className="mt-1 font-semibold text-white">
            {new Date(activeElection.startDate).toLocaleDateString()}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-800/60 p-5">

          <Clock3 className="mb-3 text-yellow-400" />

          <p className="text-sm text-slate-400">
            Ends In
          </p>

          <h3 className="mt-1 font-semibold text-white">
            {days} Days {hours} Hours
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-800/60 p-5">

          <Users className="mb-3 text-purple-400" />

          <p className="text-sm text-slate-400">
            Candidates
          </p>

          <h3 className="mt-1 font-semibold text-white">
            {activeElection.candidates?.length || 0}
          </h3>

        </div>

      </div>

      <div className="mt-8">

        <div className="mb-2 flex justify-between text-sm text-slate-400">

          <span>Election Status</span>

          <span>{activeElection.status}</span>

        </div>

        <div className="h-3 rounded-full bg-slate-800">

          <div className="h-3 w-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

        </div>

      </div>

      <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>

          <p className="text-slate-400">
            Ready to Vote
          </p>

          <h3 className="text-xl font-semibold text-green-400">
            Eligible
          </h3>

        </div>

        <button
          onClick={() =>
            navigate(`/student/election/${activeElection._id}`)
          }
          className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-3 font-semibold hover:scale-105 transition"
        >
          Vote Now
        </button>

      </div>

    </div>
  );
}

export default ElectionCard;