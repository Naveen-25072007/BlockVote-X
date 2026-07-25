function QuickActions() {
  return (
    <div>

      <h2 className="text-white text-2xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-4 gap-5">

        <button className="bg-slate-900 border border-slate-800 rounded-xl py-6 text-white hover:border-blue-500">
          My Profile
        </button>

        <button className="bg-slate-900 border border-slate-800 rounded-xl py-6 text-white hover:border-blue-500">
          Voting History
        </button>

        <button className="bg-slate-900 border border-slate-800 rounded-xl py-6 text-white hover:border-blue-500">
          Results
        </button>

        <button className="bg-slate-900 border border-slate-800 rounded-xl py-6 text-white hover:border-blue-500">
          Help
        </button>

      </div>

    </div>
  );
}

export default QuickActions;