import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        setError("Please fill in all the fields.");
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

      setError("");
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      const data = response.data;

      // Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Role check
      if (data.user.role !== role) {
        setError(`This account is registered as ${data.user.role}.`);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return;
      }

      // Redirect
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]" />

      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-2xl p-10 shadow-2xl">

        <div className="text-center">

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            BlockVote X
          </h1>

          <p className="mt-3 text-slate-400">
            Secure Blockchain Voting Platform
          </p>

        </div>

        <div className="mt-10 space-y-5">

          {/* Role */}
          <div>

            <label className="block mb-2 text-slate-300 font-medium">
              Login As
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>

          </div>

          {/* Email */}
          <div>

            <label className="block mb-2 text-slate-300 font-medium">
              College Email
            </label>

            <input
              type="email"
              placeholder="example@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />

          </div>

          {/* Password */}
          <div>

            <label className="block mb-2 text-slate-300 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <div className="mt-8 text-center text-slate-400">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;