import { SiteFooter } from "@/components/shared/site-footer";
import { BenefitsSection } from "../shared/benefits-section";
import { FaqSection } from "../shared/faq-section";
import { HowItWorksSection } from "../shared/how-it-works-section";
import { RevealSection } from "../shared/reveal-section";
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
        <RevealSection>
          <ClientIntroSection />
        </RevealSection>
        <RevealSection>
          <BenefitsSection
            audience="client"
            eyebrow="WHY CLIENTS CHOOSE DRIVERSVAULT"
            title="Peace of mind on every trip."
            benefits={CLIENT_BENEFITS}
            ctaHref="/auth/signup"
            ctaLabel="Sign up"
            preview={<ClientDashboardPreview />}
          />
        </RevealSection>
        <RevealSection>
          <HowItWorksSection
            audience="client"
            title="From Request to Arrival in three steps."
            steps={CLIENT_STEPS}
          />
        </RevealSection>
        <RevealSection>
          <ClientUseCases />
        </RevealSection>
        <RevealSection>
          <TestimonialsSection
            audience="client"
            title="What clients say about us"
            testimonials={CLIENT_TESTIMONIALS}
          />
        </RevealSection>
        <RevealSection>
          <FaqSection
            audience="client"
            title="CLIENT QUESTIONS, ANSWERED"
            items={CLIENT_FAQS}
          />
        </RevealSection>
        <RevealSection>
          <ClientFinalCta />
        </RevealSection>
      </main>
      <SiteFooter />
    </div>
  );
}
