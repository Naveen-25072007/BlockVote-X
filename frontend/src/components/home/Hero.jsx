function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-transparent pt-40 pb-24 px-6"
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>

          <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-cyan-500/20 rounded-full px-5 py-2 text-cyan-300 text-sm backdrop-blur-xl">
            🔒 Blockchain Powered Voting
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Secure Digital
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Voting
            </span>
            For The Future
          </h1>

          <p className="mt-8 text-lg text-slate-300 leading-8 max-w-xl">
            BlockVote X is a secure blockchain-powered digital voting platform
            that guarantees transparency, immutability, and trust in every
            election. Every vote is encrypted, verified, and permanently stored
            on the blockchain.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition duration-300">
              Get Started
            </button>

            <button className="px-8 py-4 rounded-xl border border-cyan-400/30 bg-slate-900/60 backdrop-blur-xl text-cyan-300 hover:bg-cyan-500 hover:text-white transition duration-300">
              Learn More
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex justify-center">

          <div className="relative w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-2xl p-8 shadow-2xl">

            <div className="flex justify-between items-center">
              <h3 className="text-white text-xl font-bold">
                Live Election
              </h3>

              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                Active
              </span>
            </div>

            <div className="mt-8 space-y-5">

              <div className="flex justify-between text-slate-300">
                <span>Registered Students</span>
                <span className="text-cyan-400 font-bold">1,254</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Votes Cast</span>
                <span className="text-blue-400 font-bold">986</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Blockchain Status</span>
                <span className="text-green-400 font-bold">
                  Secured
                </span>
              </div>

            </div>

            <div className="mt-10 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-6 text-center">

              <h2 className="text-5xl font-bold text-white">
                99.99%
              </h2>

              <p className="mt-2 text-white/90">
                Vote Integrity
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;