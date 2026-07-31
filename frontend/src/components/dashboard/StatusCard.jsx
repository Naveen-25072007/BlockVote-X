function StatusCard({
  title,
  value,
  icon,
  color,
  description,
}) {
  return (
    <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {description}
          </p>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatusCard;