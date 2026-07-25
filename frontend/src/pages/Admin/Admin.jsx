function Admin() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-slate-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-300">
              Manage Elections
            </p>
          </div>

          <button className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">
              Total Elections
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-5">
              2
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">
              Registered Students
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-5">
              120
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">
              Votes Cast
            </h2>

            <p className="text-5xl font-bold text-purple-600 mt-5">
              96
            </p>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow mt-10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Create Election
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Election Name"
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="date"
              className="border rounded-lg px-4 py-3"
            />

          </div>

          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Create Election
          </button>

        </div>

      </div>

    </div>
  );
}

export default Admin;