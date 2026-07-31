import {
  User,
  Mail,
  GraduationCap,
  ShieldCheck,
  BadgeCheck,
  Calendar,
} from "lucide-react";

function Profile() {
  // Dummy data (replace with backend data later)
  const student = {
    name: "Naveen Chandra",
    studentId: "22B81A0501",
    email: "naveen@example.com",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    verified: true,
    joined: "August 2024",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
              <User size={60} />
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {student.name}
              </h1>

              <p className="text-cyan-100 mt-2">
                Student Profile
              </p>

              <div className="mt-4 inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full text-green-300">
                <ShieldCheck size={18} />
                Blockchain Verified
              </div>

            </div>

          </div>

        </div>

        {/* Profile Details */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Personal Information */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Personal Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <User className="text-cyan-400" />
                <div>
                  <p className="text-slate-400 text-sm">
                    Full Name
                  </p>
                  <p className="text-lg font-semibold">
                    {student.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <BadgeCheck className="text-cyan-400" />
                <div>
                  <p className="text-slate-400 text-sm">
                    Student ID
                  </p>
                  <p className="text-lg font-semibold">
                    {student.studentId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-cyan-400" />
                <div>
                  <p className="text-slate-400 text-sm">
                    Email
                  </p>
                  <p className="text-lg font-semibold">
                    {student.email}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Academic Information */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Academic Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <GraduationCap className="text-cyan-400" />
                <div>
                  <p className="text-slate-400 text-sm">
                    Department
                  </p>
                  <p className="text-lg font-semibold">
                    {student.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="text-cyan-400" />
                <div>
                  <p className="text-slate-400 text-sm">
                    Year
                  </p>
                  <p className="text-lg font-semibold">
                    {student.year}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ShieldCheck className="text-green-400" />
                <div>
                  <p className="text-slate-400 text-sm">
                    Verification Status
                  </p>
                  <p className="text-lg font-semibold text-green-400">
                    {student.verified ? "Verified" : "Pending"}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Account Info */}
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Account Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-slate-800 p-6">
              <p className="text-slate-400">
                Member Since
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {student.joined}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-800 p-6">
              <p className="text-slate-400">
                Voting Status
              </p>

              <h3 className="text-2xl font-bold mt-2 text-green-400">
                Eligible
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-800 p-6">
              <p className="text-slate-400">
                Blockchain Identity
              </p>

              <h3 className="text-lg font-bold mt-2 text-cyan-400">
                Active
              </h3>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;