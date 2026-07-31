function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-2xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]">

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-3xl shadow-lg shadow-cyan-500/20">
        {icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 mt-8 text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-4 text-slate-400 leading-7">
        {description}
      </p>

      {/* Bottom Accent Line */}
      <div className="relative z-10 mt-8 h-1 w-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></div>

    </div>
  );
}

export default FeatureCard;