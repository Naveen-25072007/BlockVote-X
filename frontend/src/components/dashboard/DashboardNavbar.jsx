import { Bell, Search, CalendarDays } from "lucide-react";

function DashboardNavbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl px-6 py-4">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Student Dashboard
        </h1>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays size={16} />
          <span>{today}</span>
        </div>
      </div>

      {/* Center */}
      <div className="hidden md:flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 w-[320px]">

        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-white placeholder-slate-500"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <button className="relative rounded-xl bg-slate-800 p-3 hover:bg-slate-700 transition">
          <Bell size={20} className="text-white" />

          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-lg font-bold text-white">
            N
          </div>

          <div className="hidden sm:block">
            <p className="font-semibold text-white">
              Naveen
            </p>

            <p className="text-sm text-slate-400">
              Verified Student
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default DashboardNavbar;