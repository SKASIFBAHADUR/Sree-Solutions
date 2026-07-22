import MissionSection from "../components/MissionSection";
import SecondSection from "../components/SecondSection";
import ServicesSection from "../components/ServicesSection";
import FbpServicesSection from "../components/fbpServicesSection";
import EcgfbpServicesSection from "../components/ecgfbpServicesSection";
import BtgfbpServicesSection from "../components/btgfbpServicesSection";
import Stats from "../components/Stats";
import WhyChooseUs from "../components/WhyChooseUs";
import Hero from "../components/hero";
import ClientReferenceSection from "../components/ClientReferenceSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/layout/Footer";
import LazySection from "../components/ui/LazySection";

export default function HomeContent() {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <Hero />
      <LazySection minHeight="50vh"><MissionSection /></LazySection>
      <LazySection minHeight="50vh"><SecondSection /></LazySection>
      <LazySection minHeight="80vh"><ServicesSection /></LazySection>
      <LazySection minHeight="60vh"><FbpServicesSection /></LazySection>
      <LazySection minHeight="60vh"><EcgfbpServicesSection /></LazySection>
      <LazySection minHeight="60vh"><BtgfbpServicesSection /></LazySection>
      <LazySection minHeight="40vh"><Stats /></LazySection>
      <LazySection minHeight="100vh"><WhyChooseUs /></LazySection>
      <LazySection minHeight="60vh"><ClientReferenceSection /></LazySection>
      <LazySection minHeight="40vh"><CtaSection /></LazySection>
    </main>
  );
}
