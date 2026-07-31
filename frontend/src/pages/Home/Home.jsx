import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import Statistics from "../../components/home/Statistics";
import HowItWorks from "../../components/home/HowItWorks";
import Footer from "../../components/home/Footer";

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

      {/* Glow Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse"></div>

        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse"></div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]"></div>

      </div>

      <Navbar />

      <main>

        <Hero />

        <Features />

        <Statistics />

        <HowItWorks />

      </main>

      <Footer />

    </div>
  );
}

export default Home;