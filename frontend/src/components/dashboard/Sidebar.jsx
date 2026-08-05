import {
  LayoutDashboard,
  History,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/student/dashboard",
  },
  {
    name: "History",
    icon: History,
    path: "/student/history",
  },
  {
    name: "Results",
    icon: BarChart3,
    path: "/student/results",
  },
  {
    name: "Profile",
    icon: User,
    path: "/student/profile",
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="relative w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        BlockVote X
      </h1>

      <p className="text-slate-400 text-sm mt-1">
        Student Portal
      </p>

      <nav className="mt-10 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}

      </nav>

      <button
        onClick={handleLogout}
        className="absolute bottom-8 left-6 flex items-center gap-3 text-red-400 hover:text-red-300 transition"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;