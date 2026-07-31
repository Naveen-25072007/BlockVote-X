import { ShieldCheck, Vote, Wallet } from "lucide-react";

function WelcomeSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 text-white shadow-xl">

      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative z-10">

        <p className="text-cyan-100 text-sm font-medium">
          Welcome Back 👋
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Naveen Chandra
        </h1>

        <p className="mt-2 max-w-2xl text-cyan-100">
          Welcome to <span className="font-semibold">BlockVote X</span>,
          your secure blockchain-powered voting platform. Cast your vote
          with transparency, security, and confidence.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5">
            <ShieldCheck className="mb-3 text-green-300" size={34} />
            <h3 className="font-semibold">Verification</h3>
            <p className="text-sm text-cyan-100">
              Verified Student
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5">
            <Vote className="mb-3 text-yellow-300" size={34} />
            <h3 className="font-semibold">Voting Status</h3>
            <p className="text-sm text-cyan-100">
              Not Voted Yet
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5">
            <Wallet className="mb-3 text-purple-300" size={34} />
            <h3 className="font-semibold">Blockchain</h3>
            <p className="text-sm text-cyan-100">
              Connected & Secure
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default WelcomeSection;