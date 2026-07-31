import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");

  const [adminCode, setAdminCode] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        setError("Please fill in all the fields.");
        return;
      }

      if (role === "student" && !studentId.trim()) {
        setError("Student ID is required.");
        return;
      }

      if (role === "admin" && !adminCode.trim()) {
        setError("Please enter the Admin Secret Code.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (!acceptTerms) {
        setError("Please accept the Terms & Conditions.");
        return;
      }

      setLoading(true);
      setError("");

      const response = await registerUser({
        fullName: name,
        email,
        password,
        studentId,
        role,
        adminCode,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden px-6">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-2xl p-10 shadow-2xl">

        <div className="text-center">

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            BlockVote X
          </h1>

          <p className="mt-3 text-slate-400">
            Create your secure blockchain voting account
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          {role === "student" && (
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          )}

          {role === "admin" && (
            <input
              type="password"
              placeholder="Admin Secret Code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              className="w-full rounded-xl border border-yellow-500 bg-slate-800 px-4 py-3 text-white placeholder-slate-500"
            />
          )}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <div className="relative">

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <label className="flex items-center gap-3 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
            />

            I agree to the Terms & Conditions
          </label>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </div>

        <div className="mt-8 text-center text-slate-400">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-cyan-400"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;