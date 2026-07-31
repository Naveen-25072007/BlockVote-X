import { ShieldCheck, Vote, Wallet } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import WelcomeSection from "../../components/dashboard/WelcomeSection";
import StatusCard from "../../components/dashboard/StatusCard";
import ElectionCard from "../../components/dashboard/ElectionCard";
import QuickActions from "../../components/dashboard/QuickActions";
import ActivityCard from "../../components/dashboard/ActivityCard";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">

        <DashboardNavbar />

        <div className="mt-8">

          <WelcomeSection />

        </div>

        {/* Status Cards */}

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <StatusCard
            title="Verification"
            value="Verified"
            description="Your identity has been verified."
            icon={<ShieldCheck size={28} />}
            color="bg-green-500/20 text-green-400"
          />

          <StatusCard
            title="Voting Status"
            value="Not Voted"
            description="You haven't voted yet."
            icon={<Vote size={28} />}
            color="bg-yellow-500/20 text-yellow-400"
          />

          <StatusCard
            title="Blockchain"
            value="Connected"
            description="Your vote will be secured."
            icon={<Wallet size={28} />}
            color="bg-cyan-500/20 text-cyan-400"
          />

        </div>

        {/* Election */}

        <div className="mt-8">

          <ElectionCard />

        </div>

        {/* Bottom Section */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <QuickActions />

          <ActivityCard />

        </div>

      </main>

    </div>
  );
}

export default Dashboard;