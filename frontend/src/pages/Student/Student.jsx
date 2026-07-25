function Student() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-blue-700 text-white px-8 py-5 shadow">
        <h1 className="text-3xl font-bold">
          Student Dashboard
        </h1>

        <p className="text-blue-100 mt-1">
          Welcome to BlockVote X
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-2xl font-bold mb-6">
          Available Elections
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold">
              Student Council Election 2026
            </h3>

            <p className="text-gray-600 mt-3">
              Vote for your Student Council President.
            </p>

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Cast Vote
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold">
              Club Representative Election
            </h3>

            <p className="text-gray-600 mt-3">
              Elect your club representative.
            </p>

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Cast Vote
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Student;