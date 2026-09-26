"use client";

import { FormInput } from "@/components/form/form-input";
import { FormPhoneInput } from "@/components/form/form-phone-input";
import { FormSelect } from "@/components/form/form-select";
import { OnboardingShell } from "@/components/shared/onboarding-shell";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { useOnboardingProfile } from "@/hooks/use-onboarding-profile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  DEFAULT_GUARANTOR,
  DEFAULT_REFERENCE,
  GUARANTOR_RELATIONSHIP_OPTIONS,
  ONBOARDING_TIPS,
  getOnboardingProgress,
} from "@/lib/utils";
import {
  guarantorSchema,
  type GuarantorFormValues,
} from "@/schemas/onboarding/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StepHeader } from "../_components/step-header";
import { useSaveOnboardingStep } from "../_hooks/use-save-onboarding-step";

export default function GuarantorsStep() {
  const { profile } = useOnboardingProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GuarantorFormValues>({
    resolver: zodResolver(guarantorSchema),
    defaultValues: {
      reference: DEFAULT_REFERENCE,
      guarantors: [DEFAULT_GUARANTOR as never],
    },
  });

  useEffect(() => {
    if (!profile) return;

    // Only the first saved guarantor carries over — the step now takes exactly one.
    const saved = profile.guarantors[0];

    reset({
      reference: {
        full_name: profile.reference?.full_name ?? "",
        company_name: profile.reference?.company_name ?? "",
        phone_no: profile.reference?.phone_no ?? "",
      },
      guarantors: [
        saved
          ? {
              full_name: saved.full_name,
              relationship:
                saved.relationship as GuarantorFormValues["guarantors"][number]["relationship"],
              phone_no: saved.phone_no,
              address: saved.address,
              nin: saved.nin,
            }
          : (DEFAULT_GUARANTOR as never),
      ],
    });
  }, [profile, reset]);

  const { save, isPending } = useSaveOnboardingStep<GuarantorFormValues>({
    url: API_ENDPOINTS.driverOnboarding.guarantors,
    redirectTo: "/driver/onboarding/additional-information",
    onSuccessMessage: "Reference and guarantor saved",
  });

  const firstName = profile?.user.first_name ?? "there";

  return (
    <OnboardingShell
      title={`Welcome ${firstName} 👋`}
      subtitle="Let's get your account fully set up. A few quick steps stand between you and your first job."
      tips={ONBOARDING_TIPS.GUARANTORS}
    >
      <StepHeader
        title="Reference and guarantor"
        description="A previous employer who can vouch for your work, and one guarantor to help verify your profile"
        progress={getOnboardingProgress("GUARANTORS")}
      />

      <form onSubmit={handleSubmit((data) => save(data))} className="space-y-4">
        <div className="border-border space-y-4 rounded-xl border p-4">
          <div>
            <AppText type="label" className="block text-sm font-semibold">
              Reference — previous employer
            </AppText>
            <AppText
              type="caption"
              className="text-muted-foreground mt-1 block text-xs"
            >
              Someone you have driven for before, who can speak to your work.
            </AppText>
          </div>

          <FormInput<GuarantorFormValues>
            control={control}
            name="reference.full_name"
            errors={errors}
            label="Reference's full name"
            placeholder="E.g Adaeze Nwosu"
          />

          <FormInput<GuarantorFormValues>
            control={control}
            name="reference.company_name"
            errors={errors}
            label="Company or household (optional)"
            placeholder="E.g Meridian Logistics"
          />

          <FormPhoneInput<GuarantorFormValues>
            control={control}
            name="reference.phone_no"
            errors={errors}
            label="Reference's phone number"
          />
        </div>

        <div className="border-border space-y-4 rounded-xl border p-4">
          <div>
            <AppText type="label" className="block text-sm font-semibold">
              Your guarantor
            </AppText>
            <AppText
              type="caption"
              className="text-muted-foreground mt-1 block text-xs"
            >
              Must be a working professional — a civil servant (grade level 8 or
              above) or a business owner. Family members and friends are not
              accepted.
            </AppText>
          </div>

          <FormInput<GuarantorFormValues>
            control={control}
            name="guarantors.0.full_name"
            errors={errors}
            label="Guarantor's full name"
            placeholder="E.g John Levy"
          />

          <FormSelect<GuarantorFormValues>
            control={control}
            name="guarantors.0.relationship"
            errors={errors}
            label="Who is this person to you?"
            placeholder="E.g Former Employer"
            options={GUARANTOR_RELATIONSHIP_OPTIONS}
          />

          <FormPhoneInput<GuarantorFormValues>
            control={control}
            name="guarantors.0.phone_no"
            errors={errors}
            label="Guarantor's phone number"
          />

          <FormInput<GuarantorFormValues>
            control={control}
            name="guarantors.0.address"
            errors={errors}
            label="Guarantor's address"
            placeholder="E.g 12 Bode Thomas, Surulere"
          />

          <FormInput<GuarantorFormValues>
            control={control}
            name="guarantors.0.nin"
            errors={errors}
            label="Guarantor's NIN"
            placeholder="E.g 12345678901"
          />
        </div>

        {/* The guarantor's passport and NIN slip are uploaded on the documents
            step, once the guarantor row exists to attach them to. */}
        <AppText type="caption" className="text-muted-foreground block">
          You'll upload your guarantor's passport photo and NIN slip on the
          documents step.
        </AppText>

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
