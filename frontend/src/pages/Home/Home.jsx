import Hero from "../../components/home/Hero";
import HowItWorks from "../../components/home/HowItWorks";
import Statistics from "../../components/home/Statistics";
import Navbar from "../../components/layout/Navbar";

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />
      <Hero />
      <Statistics />
      <HowItWorks />
    </div>
  );
}

export default Home;

