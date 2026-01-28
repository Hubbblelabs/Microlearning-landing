import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import TargetMarketSection from "./components/TargetMarketSection";
import BusinessModelSection from "./components/BusinessModelSection";
import TrustSection from "./components/TrustSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <TargetMarketSection />
        <BusinessModelSection />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
