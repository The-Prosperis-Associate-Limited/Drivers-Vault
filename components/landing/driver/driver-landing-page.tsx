import { SiteFooter } from "@/components/shared/site-footer";
import { BenefitsSection } from "../shared/benefits-section";
import { FaqSection } from "../shared/faq-section";
import { HowItWorksSection } from "../shared/how-it-works-section";
import { RevealSection } from "../shared/reveal-section";
import { TestimonialsSection } from "../shared/testimonials-section";
import {
  DRIVER_FAQS,
  DRIVER_STEPS,
  DRIVER_TESTIMONIALS,
  WORK_BENEFITS,
} from "./content";
import { DriverDashboardPreview } from "./driver-dashboard-preview";
import { DriverHero } from "./driver-hero";
import { DriverIntroSection } from "./driver-intro-section";
import { DriverJobTypes } from "./driver-job-types";

export function DriverLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <DriverHero />
      <main>
        <RevealSection>
          <DriverIntroSection />
        </RevealSection>
        <RevealSection>
          <BenefitsSection
            audience="driver"
            eyebrow="WHY DRIVE WITH TEGAT"
            title="Work that respect your profession."
            benefits={WORK_BENEFITS}
            ctaHref="/driver/auth/signup"
            ctaLabel="Sign up"
            preview={<DriverDashboardPreview />}
          />
        </RevealSection>
        <RevealSection>
          <HowItWorksSection
            audience="driver"
            title="From application to First Payout In Three Steps."
            steps={DRIVER_STEPS}
          />
        </RevealSection>
        <RevealSection>
          <DriverJobTypes />
        </RevealSection>
        <RevealSection>
          <TestimonialsSection
            audience="driver"
            title="What drivers say about us"
            testimonials={DRIVER_TESTIMONIALS}
          />
        </RevealSection>
        <RevealSection>
          <FaqSection
            audience="driver"
            title="DRIVER QUESTIONS, ANSWERED"
            items={DRIVER_FAQS}
            supportPrompt={{
              title: "Still have a question?",
              description: "Our support team is ready to help you get started.",
            }}
          />
        </RevealSection>
      </main>
      <SiteFooter />
    </div>
  );
}
