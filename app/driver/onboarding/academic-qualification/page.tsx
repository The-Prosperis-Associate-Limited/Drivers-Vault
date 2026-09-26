"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { OnboardingShell } from "@/components/shared/onboarding-shell";
import { Button } from "@/components/ui/button";
import { useOnboardingProfile } from "@/hooks/use-onboarding-profile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  ACADEMIC_LEVEL_OPTIONS,
  ONBOARDING_TIPS,
  getOnboardingProgress,
} from "@/lib/utils";
import {
  academicQualificationSchema,
  type AcademicQualificationFormValues,
} from "@/schemas/onboarding/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StepHeader } from "../_components/step-header";
import { useSaveOnboardingStep } from "../_hooks/use-save-onboarding-step";

export default function AcademicQualificationStep() {
  const { profile } = useOnboardingProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AcademicQualificationFormValues>({
    resolver: zodResolver(academicQualificationSchema),
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      academic_level: profile.academic_level ?? undefined,
      institution: profile.institution ?? "",
      course_of_study: profile.course_of_study ?? "",
    });
  }, [profile, reset]);

  const { save, isPending } =
    useSaveOnboardingStep<AcademicQualificationFormValues>({
      url: API_ENDPOINTS.driverOnboarding.academicQualification,
      redirectTo: "/driver/onboarding/work-experience",
      onSuccessMessage: "Academic qualification saved",
    });

  const firstName = profile?.user.first_name ?? "there";

  return (
    <OnboardingShell
      title={`Welcome ${firstName} 👋`}
      subtitle="Let's get your account fully set up. A few quick steps stand between you and your first job."
      tips={ONBOARDING_TIPS.ACADEMIC_QUALIFICATION}
    >
      <StepHeader
        title="Academic qualification"
        description="Add your highest level of education. This isn't a strict requirement, but it helps build a fuller profile"
        progress={getOnboardingProgress("ACADEMIC_QUALIFICATION")}
      />

      <form onSubmit={handleSubmit((data) => save(data))} className="space-y-4">
        <FormSelect<AcademicQualificationFormValues>
          control={control}
          name="academic_level"
          errors={errors}
          label="Academic level"
          placeholder="E.g Secondary School"
          options={ACADEMIC_LEVEL_OPTIONS}
        />

        <FormInput<AcademicQualificationFormValues>
          control={control}
          name="institution"
          errors={errors}
          label="What school did you attend?"
          placeholder="E.g University of Lagos"
        />

        <FormInput<AcademicQualificationFormValues>
          control={control}
          name="course_of_study"
          errors={errors}
          label="What course did you study?"
          placeholder="E.g Medicine"
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
