function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">

      <div className="text-center max-w-4xl">

        <p className="text-blue-400 font-semibold tracking-widest uppercase">
          Blockchain Powered Voting
        </p>

        <h1 className="text-6xl md:text-7xl font-extrabold mt-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          BlockVote X
        </h1>

        <p className="mt-8 text-xl text-gray-400">
          Secure, Transparent and Tamper-Proof Digital Voting
          using Blockchain Technology.
        </p>

        <div className="flex justify-center gap-6 mt-10">

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold">
            Get Started
          </button>

          <button className="border border-gray-500 hover:border-white px-8 py-3 rounded-xl">
            Learn More
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;