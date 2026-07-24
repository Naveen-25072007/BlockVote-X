function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center shadow-lg hover:border-blue-500 transition duration-300">
      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-white mb-3">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;