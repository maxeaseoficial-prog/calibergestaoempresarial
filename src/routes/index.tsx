import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { MetricsBand as AuthorityMetrics } from "@/components/site/Metrics";
import { Methodology } from "@/components/site/Methodology";
import { Solutions } from "@/components/site/Solutions";
import { CorporateSection } from "@/components/site/CorporateSection";
import { WhyCaliber } from "@/components/site/WhyCaliber";
import { Differentiators } from "@/components/site/Differentiators";
import { ImpactSection } from "@/components/site/ImpactSection";
import { Testimonials } from "@/components/site/Testimonials";
import { LogoCloud } from "@/components/site/LogoCloud";
import { NationalPresence } from "@/components/site/NationalPresence";
import { ContactCTA } from "@/components/site/ContactCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <Methodology />
        <Solutions />
        <CorporateSection />
        <WhyCaliber />
        <Differentiators />
        <ImpactSection />
        <Testimonials />
        <LogoCloud />
        <NationalPresence />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
