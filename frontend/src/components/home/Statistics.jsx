function Statistics() {
  const stats = [
    {
      number: "1000+",
      label: "Registered Voters",
      color: "from-cyan-500 to-blue-600",
    },
    {
      number: "99.9%",
      label: "Accuracy",
      color: "from-blue-500 to-purple-600",
    },
    {
      number: "24/7",
      label: "Availability",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "100%",
      label: "Tamper Proof",
      color: "from-cyan-400 to-purple-500",
    },
  ];

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-10 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block px-5 py-2 rounded-full border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl text-cyan-300 text-sm font-medium">
            Platform Statistics
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-white">
            Trusted by the Future
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400 leading-8">
            BlockVote X delivers secure, transparent, and blockchain-powered
            elections with unmatched reliability and trust.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {stats.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-2xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]"
            >

              {/* Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <h3
                className={`relative z-10 text-5xl font-extrabold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
              >
                {item.number}
              </h3>

              <p className="relative z-10 mt-4 text-slate-300 text-lg">
                {item.label}
              </p>

              <div className="relative z-10 mt-8 h-1 w-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Statistics;