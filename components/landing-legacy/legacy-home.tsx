import { SiteHeader } from "./site-header";
import { Hero } from "./hero";
import { RolesSection } from "./roles-section";
import { HowItWorks } from "./how-it-works";
import { TrustSection } from "./trust-section";
import { SiteFooter } from "@/components/shared/site-footer";

// The pre-redesign landing page, kept intact but unmounted. Delete this folder
// when the new landing has fully shipped.
export const LegacyHome = function () {
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
};
