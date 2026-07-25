function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Register",
      description: "Students register using their college details.",
    },
    {
      number: "2",
      title: "Verify",
      description: "Admin verifies the student's identity.",
    },
    {
      number: "3",
      title: "Vote",
      description: "Students cast their vote securely using blockchain.",
    },
    {
      number: "4",
      title: "Results",
      description: "Votes are counted instantly and transparently.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="text-center border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600">
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