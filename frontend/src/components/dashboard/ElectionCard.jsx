function ElectionCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <h2 className="text-white text-2xl font-bold">
        Student Council Election 2026
      </h2>

      <p className="text-slate-400 mt-3">
        Vote securely using blockchain technology.
      </p>

      <p className="text-slate-400 mt-1">
        Ends: 25 July 2026 • 5:00 PM
      </p>

      <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white transition">
        Vote Now
      </button>

    </div>
  );
}

export default ElectionCard;