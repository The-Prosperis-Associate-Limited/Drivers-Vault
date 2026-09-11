"use client";

import { FormInput } from "@/components/form/form-input";
import { FormMultiSelect } from "@/components/form/form-multi-select";
import { FormSelect } from "@/components/form/form-select";
import { OnboardingShell } from "@/components/shared/onboarding-shell";
import { Button } from "@/components/ui/button";
import { useOnboardingProfile } from "@/hooks/use-onboarding-profile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  LANGUAGE_OPTIONS,
  ONBOARDING_TIPS,
  RELIGION_OPTIONS,
  getOnboardingProgress,
} from "@/lib/utils";
import {
  additionalInformationSchema,
  type AdditionalInformationFormValues,
} from "@/schemas/onboarding/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StepHeader } from "../_components/step-header";
import { useSaveOnboardingStep } from "../_hooks/use-save-onboarding-step";

export default function AdditionalInformationStep() {
  const { profile } = useOnboardingProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdditionalInformationFormValues>({
    resolver: zodResolver(additionalInformationSchema),
    defaultValues: { languages: [] },
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      language_count: profile.language_count ?? undefined,
      languages: profile.languages ?? [],
      religion: profile.religion ?? "",
    });
  }, [profile, reset]);

  const { save, isPending } =
    useSaveOnboardingStep<AdditionalInformationFormValues>({
      url: API_ENDPOINTS.driverOnboarding.additionalInformation,
      redirectTo: "/driver/onboarding/documents",
      onSuccessMessage: "Saved",
    });

  const firstName = profile?.user.first_name ?? "there";

  return (
    <OnboardingShell
      title={`Welcome ${firstName} 👋`}
      subtitle="Let's get your account fully set up. A few quick steps stand between you and your first job."
      tips={ONBOARDING_TIPS.ADDITIONAL_INFORMATION}
    >
      <StepHeader
        title="Additional Information (Optional)"
        description="Share any additional details — totally optional"
        progress={getOnboardingProgress("ADDITIONAL_INFORMATION")}
      />

      <form onSubmit={handleSubmit((data) => save(data))} className="space-y-4">
        <FormInput<AdditionalInformationFormValues>
          control={control}
          name="language_count"
          errors={errors}
          label="How many languages can you speak"
          placeholder="E.g 4"
          type="number"
          min={0}
        />

        <FormMultiSelect<AdditionalInformationFormValues>
          control={control}
          name="languages"
          errors={errors}
          label="Please Select the languages"
          placeholder="E.g Hausa"
          options={LANGUAGE_OPTIONS}
        />

        <FormSelect<AdditionalInformationFormValues>
          control={control}
          name="religion"
          errors={errors}
          label="Your Religion"
          placeholder="E.g Christianity"
          options={RELIGION_OPTIONS}
        />

        <Button
          isLoading={isPending}
          className="h-12 w-full rounded-lg text-sm"
        >
          Continue
        </Button>
      </form>
    </OnboardingShell>
  );
}
