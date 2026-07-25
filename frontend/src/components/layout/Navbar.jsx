import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-slate-950/60 border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          BlockVote X
        </h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        <Link
          to="/login"
          className="bg-blue-600 px-5 py-2 rounded-lg text-white hover:bg-blue-700 transition"
        >
          Login
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;