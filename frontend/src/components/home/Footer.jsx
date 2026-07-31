import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-cyan-500/20 bg-slate-950 py-20"
    >
      {/* Background Glow */}
      <div className="absolute -top-20 left-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>

            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              BlockVote X
            </h2>

            <p className="mt-6 text-slate-400 leading-8">
              A blockchain-powered digital voting platform built to make
              elections secure, transparent, immutable, and trusted.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-slate-400">

              <a href="#hero" className="hover:text-cyan-400 transition">
                Home
              </a>

              <a href="#features" className="hover:text-cyan-400 transition">
                Features
              </a>

              <a
                href="#how-it-works"
                className="hover:text-cyan-400 transition"
              >
                How It Works
              </a>

            </div>

          </div>

          {/* Platform */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Platform
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/login"
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                Register
              </Link>

              <Link
                to="/results"
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                Results
              </Link>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Contact
            </h3>

            <div className="space-y-4 text-slate-400">

              <p>📧 support@blockvotex.com</p>

              <p>📍 Hyderabad, India</p>

              <p>🛡️ Secure Blockchain Platform</p>

            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-center md:text-left">
            © 2026 BlockVote X. All Rights Reserved.
          </p>

          <div className="flex gap-4">

            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 cursor-pointer transition">
              🌐
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 cursor-pointer transition">
              💼
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 cursor-pointer transition">
              📧
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;