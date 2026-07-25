function StatusCards() {
  return (
    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h3 className="text-slate-400">Election</h3>
        <p className="text-green-400 text-2xl font-bold mt-2">
          LIVE
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h3 className="text-slate-400">Your Vote</h3>
        <p className="text-red-400 text-2xl font-bold mt-2">
          Pending
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h3 className="text-slate-400">Candidates</h3>
        <p className="text-blue-400 text-2xl font-bold mt-2">
          5
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h3 className="text-slate-400">Time Left</h3>
        <p className="text-yellow-400 text-xl font-bold mt-2">
          04h 32m
        </p>
      </div>

    </div>
  );
}

export default StatusCards;