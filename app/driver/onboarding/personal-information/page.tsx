"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { OnboardingShell } from "@/components/shared/onboarding-shell";
import { Button } from "@/components/ui/button";
import { useLocationOptions } from "@/hooks/use-location-options";
import { useOnboardingProfile } from "@/hooks/use-onboarding-profile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  ONBOARDING_TIPS,
  getOnboardingProgress,
} from "@/lib/utils";
import {
  personalInformationSchema,
  type PersonalInformationFormValues,
} from "@/schemas/onboarding/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { StepHeader } from "../_components/step-header";
import { useSaveOnboardingStep } from "../_hooks/use-save-onboarding-step";

export default function PersonalInformationStep() {
  const { profile } = useOnboardingProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalInformationFormValues>({
    resolver: zodResolver(personalInformationSchema),
  });

  const country = useWatch({ control, name: "country" });
  const { countries, states } = useLocationOptions(country);

  useEffect(() => {
    if (!profile) return;

    reset({
      phone_no: profile.user.phone_no ?? "",
      // OTHER predates this field being asked; treat it as unanswered.
      gender:
        profile.user.gender === "MALE" || profile.user.gender === "FEMALE"
          ? profile.user.gender
          : undefined,
      marital_status: profile.user.marital_status ?? undefined,
      date_of_birth: profile.user.date_of_birth?.slice(0, 10) ?? "",
      country: profile.user.country ?? "",
      state_of_residence: profile.user.state_of_residence ?? "",
      state_of_origin: profile.state_of_origin ?? "",
    });
  }, [profile, reset]);

  const { save, isPending } =
    useSaveOnboardingStep<PersonalInformationFormValues>({
      url: API_ENDPOINTS.driverOnboarding.personalInformation,
      redirectTo: "/driver/onboarding/experience",
      onSuccessMessage: "Personal information saved",
    });

  const firstName = profile?.user.first_name ?? "there";

  return (
    <OnboardingShell
      title={`Welcome ${firstName} 👋`}
      subtitle="Let's get your account fully set up. A few quick steps stand between you and your first job"
      tips={ONBOARDING_TIPS.PERSONAL_INFORMATION}
    >
      <StepHeader
        title="Personal Information"
        description="Tell us a bit about yourself, this is the foundation of your driver profile."
        progress={getOnboardingProgress("PERSONAL_INFORMATION")}
      />

      <form onSubmit={handleSubmit((data) => save(data))} className="space-y-4">
        <FormInput<PersonalInformationFormValues>
          control={control}
          name="phone_no"
          errors={errors}
          label="Phone Number"
          placeholder="E.g +234"
        />

        <FormSelect<PersonalInformationFormValues>
          control={control}
          name="gender"
          errors={errors}
          label="Gender"
          placeholder="E.g Male"
          options={GENDER_OPTIONS}
        />

        <FormSelect<PersonalInformationFormValues>
          control={control}
          name="marital_status"
          errors={errors}
          label="Marital Status"
          placeholder="E.g Single"
          options={MARITAL_STATUS_OPTIONS}
        />

        <FormInput<PersonalInformationFormValues>
          control={control}
          name="date_of_birth"
          errors={errors}
          label="Date of birth"
          type="date"
        />

        <FormSelect<PersonalInformationFormValues>
          control={control}
          name="country"
          errors={errors}
          label="Country"
          placeholder="E.g Nigeria"
          options={countries}
        />

        <FormSelect<PersonalInformationFormValues>
          control={control}
          name="state_of_residence"
          errors={errors}
          label="Where do you reside"
          placeholder="E.g Lagos State"
          options={states}
          disabled={!country}
        />

        <FormSelect<PersonalInformationFormValues>
          control={control}
          name="state_of_origin"
          errors={errors}
          label="State of origin"
          placeholder="E.g Imo State"
          options={states}
          disabled={!country}
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
