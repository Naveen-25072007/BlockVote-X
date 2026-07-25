function Hero() {
  return (
    <section className="py-20 px-6 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-blue-600 font-semibold uppercase">
          Blockchain Powered Voting
        </p>

        <h1 className="text-6xl font-bold text-black mt-6">
          BlockVote X
        </h1>

        <p className="text-gray-700 mt-6 text-xl">
          Secure, Transparent and Tamper-Proof Digital Voting
          using Blockchain Technology.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Get Started
          </button>

          <button className="border border-black px-6 py-3 rounded-lg">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;