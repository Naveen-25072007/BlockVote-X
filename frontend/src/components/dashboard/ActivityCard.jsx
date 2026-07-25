function ActivityCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-white text-2xl font-bold mb-5">
        Recent Activity
      </h2>

      <ul className="space-y-4 text-slate-300">

        <li>• Account verified successfully</li>

        <li>• Logged in to BlockVote X</li>

        <li>• Election is currently live</li>

        <li>• Vote has not been cast yet</li>

      </ul>

    </div>
  );
}

export default ActivityCard;