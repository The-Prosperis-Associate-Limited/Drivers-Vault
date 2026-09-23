import { SiteFooter } from "@/components/shared/site-footer";
import { BenefitsSection } from "../shared/benefits-section";
import { FaqSection } from "../shared/faq-section";
import { HowItWorksSection } from "../shared/how-it-works-section";
import { TestimonialsSection } from "../shared/testimonials-section";
import { ClientDashboardPreview } from "./client-dashboard-preview";
import { ClientFinalCta } from "./client-final-cta";
import { ClientHero } from "./client-hero";
import { ClientIntroSection } from "./client-intro-section";
import { ClientUseCases } from "./client-use-cases";
import {
  CLIENT_BENEFITS,
  CLIENT_FAQS,
  CLIENT_STEPS,
  CLIENT_TESTIMONIALS,
} from "./content";

export function ClientLandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <ClientHero />
      <main>
        <ClientIntroSection />
        <BenefitsSection
          audience="client"
          eyebrow="WHY CLIENTS CHOOSE DRIVERSVAULT"
          title="Peace of mind on every trip."
          benefits={CLIENT_BENEFITS}
          ctaHref="/auth/signup"
          ctaLabel="Sign up"
          preview={<ClientDashboardPreview />}
        />
        <HowItWorksSection
          audience="client"
          title="From Request to Arrival in three steps."
          steps={CLIENT_STEPS}
        />
        <ClientUseCases />
        <TestimonialsSection
          audience="client"
          title="What client say about us"
          testimonials={CLIENT_TESTIMONIALS}
        />
        <FaqSection
          audience="client"
          title="CLIENT QUESTIONS, ANSWERED"
          items={CLIENT_FAQS}
        />
        <ClientFinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
