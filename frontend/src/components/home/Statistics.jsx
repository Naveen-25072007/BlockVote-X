function Statistics() {
  const stats = [
    { number: "1000+", label: "Registered Voters" },
    { number: "99.9%", label: "Accuracy" },
    { number: "24/7", label: "Availability" },
    { number: "100%", label: "Tamper Proof" },
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-white">
          Trusted by the Future
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Blockchain ensures every vote is secure, transparent, and immutable.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 text-center hover:scale-105 transition duration-300"
            >
              <h3 className="text-4xl font-bold text-blue-400">
                {item.number}
              </h3>

              <p className="text-gray-300 mt-3">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Statistics;