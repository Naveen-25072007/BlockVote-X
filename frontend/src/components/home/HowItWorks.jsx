function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Register",
      description:
        "Students register securely using their college email and student ID.",
    },
    {
      number: "02",
      title: "Verification",
      description:
        "The administrator verifies each student's identity before allowing access.",
    },
    {
      number: "03",
      title: "Cast Vote",
      description:
        "Votes are encrypted and securely stored on the blockchain, ensuring transparency and integrity.",
    },
    {
      number: "04",
      title: "Results",
      description:
        "Results are calculated instantly with complete transparency and tamper-proof verification.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-transparent overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">

          <span className="inline-block px-5 py-2 rounded-full border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl text-cyan-300 text-sm font-medium">
            Simple Voting Process
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-white">
            How BlockVote X Works
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400 leading-8">
            A simple four-step workflow designed to deliver secure,
            transparent, and blockchain-powered elections.
          </p>

        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-2xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]"
            >

              {/* Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Step Number */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="relative z-10 mt-8 text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-4 text-slate-400 leading-7">
                {step.description}
              </p>

              {/* Bottom Accent */}
              <div className="relative z-10 mt-8 h-1 w-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;