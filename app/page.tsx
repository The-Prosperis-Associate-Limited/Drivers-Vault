import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { RolesSection } from "@/components/landing/roles-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TrustSection } from "@/components/landing/trust-section";
import { SiteFooter } from "@/components/shared/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <RolesSection />
        <HowItWorks />
        <TrustSection />
      </main>
      <SiteFooter />
    </div>
  );
}
