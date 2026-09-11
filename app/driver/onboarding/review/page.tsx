"use client";

import { OnboardingShell } from "@/components/shared/onboarding-shell";
import { Button } from "@/components/ui/button";
import {
  VerificationReview,
  getVerificationReadiness,
} from "@/components/verification/verification-review";
import { useOnboardingProfile } from "@/hooks/use-onboarding-profile";
import { ONBOARDING_TIPS, getOnboardingProgress } from "@/lib/utils";
import { StepHeader } from "../_components/step-header";
import { useGetDocuments } from "@/hooks/use-documents";
import { useSubmitOnboarding } from "@/hooks/use-submit-onboarding";

export default function ReviewStep() {
  const { profile } = useOnboardingProfile();
  const { documents } = useGetDocuments();

  const { submitOnboarding, isPending } = useSubmitOnboarding();

  const { canSubmit } = getVerificationReadiness(profile, documents);

  return (
    <OnboardingShell
      title={`Welcome ${profile?.user?.first_name ?? "there"} 👋`}
      subtitle="Let's get your account fully set up. A few quick steps stand between you and your first job."
      tips={ONBOARDING_TIPS.REVIEW}
    >
      <StepHeader
        title="Review before you submit"
        description="Check everything below. Submission is blocked until all required items are complete."
        progress={getOnboardingProgress("REVIEW")}
      />

      <VerificationReview profile={profile} documents={documents} />

      <Button
        isLoading={isPending}
        disabled={!canSubmit}
        onClick={() => submitOnboarding({})}
        className="mt-4 h-12 w-full rounded-lg text-sm"
      >
        Continue
      </Button>
    </OnboardingShell>
  );
}
