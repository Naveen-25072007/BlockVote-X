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
        "Election results are available instantly after voting ends.",
    },
    {
      icon: "🛡️",
      title: "Secure Authentication",
      description:
        "JWT authentication combined with blockchain security.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            Powerful Features
          </h2>

          <p className="mt-4 text-gray-600">
            Experience secure, transparent and blockchain-powered digital voting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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