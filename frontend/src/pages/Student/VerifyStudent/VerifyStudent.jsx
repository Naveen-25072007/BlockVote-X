import { useEffect, useState } from "react";
import {
  ShieldCheck,
  User,
  Mail,
  CheckCircle,
} from "lucide-react";

import {
  getStudents,
  verifyStudent,
} from "../../../api/userApi";

function VerifyStudent() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Load Students
  // ==========================================
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await getStudents();

      setStudents(res.data.students || []);
    } catch (err) {
      console.log("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Verify Student
  // ==========================================
  const handleVerify = async (id) => {
    try {
      await verifyStudent(id);

      await loadStudents();

      alert("Student Verified Successfully");
    } catch (err) {
      console.log("Verification error:", err);

      alert(
        err.response?.data?.message ||
          "Verification Failed"
      );
    }
  };

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">
        Loading Students...
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

          <h1 className="text-4xl font-bold">
            Verify Students
          </h1>

          <p className="mt-3 text-cyan-100">
            Approve students before allowing them to vote.
          </p>

        </div>

        {/* Students */}
        <div className="mt-10 space-y-6">

          {students.length === 0 ? (

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

              <User
                size={60}
                className="mx-auto text-slate-500"
              />

              <h2 className="mt-6 text-2xl font-bold">
                No Students Found
              </h2>

            </div>

          ) : (

            students.map((student) => (

              <div
                key={student._id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8 hover:border-cyan-500 transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                  {/* Student Information */}
                  <div>

                    <h2 className="text-2xl font-bold">
                      {student.fullName}
                    </h2>

                    <div className="mt-4 space-y-3">

                      <div className="flex items-center gap-3">

                        <Mail
                          size={18}
                          className="text-cyan-400"
                        />

                        <span>
                          {student.email}
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <User
                          size={18}
                          className="text-green-400"
                        />

                        <span>
                          Student ID:{" "}
                          {student.studentId || "N/A"}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Verification */}
                  <div className="flex flex-col items-end gap-5">

                    {student.isVerified ? (

                      <div className="rounded-full bg-green-500/20 px-5 py-2 text-green-400 flex items-center gap-2">

                        <CheckCircle size={18} />

                        Verified

                      </div>

                    ) : (

                      <button
                        onClick={() =>
                          handleVerify(student._id)
                        }
                        className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold hover:scale-105 transition"
                      >
                        Verify Student
                      </button>

                    )}

                    <div className="rounded-xl bg-slate-800 px-5 py-3">

                      <div className="flex items-center gap-2">

                        <ShieldCheck
                          size={18}
                          className="text-cyan-400"
                        />

                        <span>
                          {student.isVerified
                            ? "Eligible To Vote"
                            : "Waiting Approval"}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default VerifyStudent;