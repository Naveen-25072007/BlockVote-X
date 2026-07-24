function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Register",
      description:
        "The voter securely registers using a unique ID and authentication.",
    },
    {
      step: "02",
      title: "Verify Identity",
      description:
        "The system verifies voter eligibility before allowing access.",
    },
    {
      step: "03",
      title: "Cast Vote",
      description:
        "The vote is encrypted and recorded on the blockchain through a smart contract.",
    },
    {
      step: "04",
      title: "Verify Results",
      description:
        "Anyone can verify election integrity without revealing voter identities.",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white">
          How BlockVote X Works
        </h2>

        <p className="text-center text-gray-400 mt-5">
          Four simple steps to conduct a secure blockchain election.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-16">

          {steps.map((step) => (
            <div
              key={step.step}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 transition duration-300"
            >
              <div className="text-5xl font-bold text-blue-500 mb-6">
                {step.step}
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="text-gray-400 mt-4">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;