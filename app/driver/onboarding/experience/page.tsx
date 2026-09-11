"use client";

import { FormInput } from "@/components/form/form-input";
import { FormMultiSelect } from "@/components/form/form-multi-select";
import { FormSelect } from "@/components/form/form-select";
import { OnboardingShell } from "@/components/shared/onboarding-shell";
import { Button } from "@/components/ui/button";
import { useOnboardingProfile } from "@/hooks/use-onboarding-profile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  DRIVER_TYPE_OPTIONS,
  ONBOARDING_TIPS,
  VEHICLE_CLASS_OPTIONS,
  getOnboardingProgress,
} from "@/lib/utils";
import {
  experienceSchema,
  type ExperienceFormValues,
} from "@/schemas/onboarding/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StepHeader } from "../_components/step-header";
import { useSaveOnboardingStep } from "../_hooks/use-save-onboarding-step";

export default function ExperienceStep() {
  const { profile } = useOnboardingProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: { vehicle_classes: [] },
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      years_of_experience: profile.years_of_experience ?? 0,
      driver_type: profile.driver_type ?? undefined,
      vehicle_classes: profile.vehicle_classes ?? [],
      license_number: profile.license_number ?? "",
      license_expires_at: profile.license_expires_at?.slice(0, 10) ?? "",
    });
  }, [profile, reset]);

  const { save, isPending } = useSaveOnboardingStep<ExperienceFormValues>({
    url: API_ENDPOINTS.driverOnboarding.experience,
    redirectTo: "/driver/onboarding/academic-qualification",
    onSuccessMessage: "Experience saved",
  });

  const firstName = profile?.user.first_name ?? "there";

  return (
    <OnboardingShell
      title={`Welcome ${firstName} 👋`}
      subtitle="Let's get your account fully set up. A few quick steps stand between you and your first job"
      tips={ONBOARDING_TIPS.EXPERIENCE}
    >
      <StepHeader
        title="Years of Experience"
        description="Let clients know how much time you've spent behind the wheel, every stage of experience is valued here"
        progress={getOnboardingProgress("EXPERIENCE")}
      />

      <form onSubmit={handleSubmit((data) => save(data))} className="space-y-4">
        <FormInput<ExperienceFormValues>
          control={control}
          name="years_of_experience"
          errors={errors}
          label="Years of Experience"
          placeholder="E.g 2"
          type="number"
          min={0}
          suffix="yrs"
        />

        <FormSelect<ExperienceFormValues>
          control={control}
          name="driver_type"
          errors={errors}
          label="Select Driver type"
          placeholder="E.g Corporate Driver"
          options={DRIVER_TYPE_OPTIONS}
        />

        <FormMultiSelect<ExperienceFormValues>
          control={control}
          name="vehicle_classes"
          errors={errors}
          label="What can you Drive"
          placeholder="E.g Bus"
          options={VEHICLE_CLASS_OPTIONS}
        />

        <FormInput<ExperienceFormValues>
          control={control}
          name="license_number"
          errors={errors}
          label="Drivers license number"
          placeholder="E.g ABC123456789"
        />

        <FormInput<ExperienceFormValues>
          control={control}
          name="license_expires_at"
          errors={errors}
          label="License Expiry Date"
          type="date"
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
