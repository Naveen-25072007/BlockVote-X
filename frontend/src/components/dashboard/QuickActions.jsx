import {
  Vote,
  BarChart3,
  ShieldCheck,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useElection } from "../../context/ElectionContext";

function QuickActions() {
  const navigate = useNavigate();
  const { elections } = useElection();

  const activeElection = elections.find(
    (election) => election.status === "Active"
  );

  const actions = [
    {
      title: "Cast Vote",
      description: "Vote in the active election",
      icon: <Vote size={28} />,
      color: "from-cyan-500 to-blue-600",
      onClick: () => {
        if (activeElection) {
          navigate(`/student/election/${activeElection.id}`);
        } else {
          alert("No active election available.");
        }
      },
    },
    {
      title: "View Results",
      description: "See election results",
      icon: <BarChart3 size={28} />,
      color: "from-green-500 to-emerald-600",
      onClick: () => navigate("/student/results"),
    },
    {
      title: "Blockchain",
      description: "Verify blockchain status",
      icon: <ShieldCheck size={28} />,
      color: "from-purple-500 to-pink-600",
      onClick: () => alert("Blockchain verification page coming soon."),
    },
    {
      title: "My Profile",
      description: "Manage your profile",
      icon: <User size={28} />,
      color: "from-orange-500 to-red-500",
      onClick: () => navigate("/student/profile"),
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            className="group rounded-2xl border border-slate-700 bg-slate-800 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${action.color} text-white`}
            >
              {action.icon}
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;