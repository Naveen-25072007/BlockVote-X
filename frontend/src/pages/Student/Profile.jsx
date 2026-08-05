import { useEffect, useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  ShieldCheck,
  Vote,
  Link2,
} from "lucide-react";

import { getProfile } from "../../api/userApi";

export default function Profile() {

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    totalVotes: 0,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {

      const res = await getProfile();

      setUser(res.data.user);

      setStats(res.data.statistics);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">
        Loading Profile...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

          <h1 className="text-4xl font-bold">

            Student Profile

          </h1>

          <p className="mt-3 text-cyan-100">

            Your blockchain identity

          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
                    {/* ================= Profile Card ================= */}

          <div className="lg:col-span-1">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <div className="flex justify-center">

                <div className="h-32 w-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">

                  <User size={60} />

                </div>

              </div>

              <h2 className="mt-6 text-center text-3xl font-bold">

                {user.fullName}

              </h2>

              <p className="text-center text-slate-400 mt-2">

                {user.role.toUpperCase()}

              </p>

              <div className="mt-8 space-y-5">

                <div className="flex items-center gap-3">

                  <Mail className="text-cyan-400" />

                  <span>{user.email}</span>

                </div>

                <div className="flex items-center gap-3">

                  <GraduationCap className="text-green-400" />

                  <span>
                    {user.studentId || "Student ID Not Available"}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <ShieldCheck className="text-purple-400" />

                  <span>
                    {user.hasVoted
                      ? "Already Participated"
                      : "Eligible to Vote"}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ================= Statistics ================= */}

          <div className="lg:col-span-2">

            <div className="grid md:grid-cols-2 gap-6">

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <Vote
                  size={40}
                  className="text-cyan-400"
                />

                <p className="mt-4 text-slate-400">

                  Total Votes

                </p>

                <h2 className="mt-2 text-5xl font-bold">

                  {stats.totalVotes}

                </h2>

              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <Link2
                  size={40}
                  className="text-green-400"
                />

                <p className="mt-4 text-slate-400">

                  Blockchain Status

                </p>

                <h2 className="mt-2 text-3xl font-bold text-green-400">

                  Connected

                </h2>

              </div>

            </div>

            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <h2 className="text-3xl font-bold">

                Blockchain Identity

              </h2>

              <div className="mt-8 space-y-5">

                <div className="flex justify-between border-b border-slate-800 pb-4">

                  <span className="text-slate-400">

                    Name

                  </span>

                  <span>

                    {user.fullName}

                  </span>

                </div>

                <div className="flex justify-between border-b border-slate-800 pb-4">

                  <span className="text-slate-400">

                    Email

                  </span>

                  <span>

                    {user.email}

                  </span>

                </div>

                <div className="flex justify-between border-b border-slate-800 pb-4">

                  <span className="text-slate-400">

                    Role

                  </span>

                  <span>

                    {user.role}

                  </span>

                </div>

                <div className="flex justify-between border-b border-slate-800 pb-4">

                  <span className="text-slate-400">

                    Student ID

                  </span>

                  <span>

                    {user.studentId || "N/A"}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-400">

                    Voting Status

                  </span>

                  <span
                    className={
                      user.hasVoted
                        ? "text-green-400"
                        : "text-yellow-400"
                    }
                  >

                    {user.hasVoted
                      ? "Vote Recorded"
                      : "Pending"}

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
      