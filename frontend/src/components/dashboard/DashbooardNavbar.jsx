function DashboardNavbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold text-blue-500">
            BlockVote X
          </h1>

          <p className="text-slate-400 text-sm">
            Secure Blockchain Voting
          </p>
        </div>

        <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-white transition">
          Logout
        </button>

      </div>

    </nav>
  );
}

export default DashboardNavbar;