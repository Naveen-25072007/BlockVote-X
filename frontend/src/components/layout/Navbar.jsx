import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-cyan-500/10 bg-slate-950/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition duration-300"
        >
          BlockVote X
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10 text-slate-300 font-medium">

          <a
            href="#hero"
            className="relative hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </a>

          <a
            href="#features"
            className="relative hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="relative hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            How It Works
          </a>

          <a
            href="#footer"
            className="relative hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </a>

        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="hidden sm:inline-flex px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-2.5 rounded-xl border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition duration-300"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;