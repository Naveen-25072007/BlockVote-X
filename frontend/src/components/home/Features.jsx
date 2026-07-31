import FeatureCard from "./FeatureCard";

function Features() {
  const features = [
    {
      icon: "🔒",
      title: "Immutable Ledger",
      description:
        "Every vote is permanently stored on the blockchain and cannot be modified.",
    },
    {
      icon: "👤",
      title: "Student Verification",
      description:
        "Only verified students can participate in elections.",
    },
    {
      icon: "⚡",
      title: "Real-Time Results",
      description:
        "Election results are generated instantly with complete transparency.",
    },
    {
      icon: "🛡️",
      title: "Secure Authentication",
      description:
        "JWT authentication combined with blockchain security protects every voter.",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 bg-transparent"
    >
      {/* Background Glow */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block px-5 py-2 rounded-full border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl text-cyan-300 text-sm font-medium">
            Why Choose BlockVote X?
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-white">
            Powerful Features
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400 leading-8">
            Experience next-generation blockchain voting with security,
            transparency, speed, and trust built into every election.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;