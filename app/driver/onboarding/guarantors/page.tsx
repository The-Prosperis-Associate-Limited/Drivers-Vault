"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { OnboardingShell } from "@/components/shared/onboarding-shell";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { useOnboardingProfile } from "@/hooks/use-onboarding-profile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  DEFAULT_GUARANTOR,
  GUARANTOR_RELATIONSHIP_OPTIONS,
  ONBOARDING_TIPS,
  getOnboardingProgress,
} from "@/lib/utils";
import {
  guarantorSchema,
  type GuarantorFormValues,
} from "@/schemas/onboarding/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
    defaultValues: { guarantors: [DEFAULT_GUARANTOR as never] },
  });

  const [pendingRemoval, setPendingRemoval] = useState<number | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guarantors",
  });

  useEffect(() => {
    if (!profile?.guarantors.length) return;

    reset({
      guarantors: profile.guarantors.map((guarantor) => ({
        full_name: guarantor.full_name,
        relationship:
          guarantor.relationship as GuarantorFormValues["guarantors"][number]["relationship"],
        phone_no: guarantor.phone_no,
        address: guarantor.address,
        nin: guarantor.nin,
      })),
    });
  }, [profile, reset]);

  const { save, isPending } = useSaveOnboardingStep<GuarantorFormValues>({
    url: API_ENDPOINTS.driverOnboarding.guarantors,
    redirectTo: "/driver/onboarding/additional-information",
    onSuccessMessage: "Guarantors saved",
  });

  // Only a row that already exists on the server is worth stopping for — a
  // freshly added one has nothing to lose.
  const savedCount = profile?.guarantors.length ?? 0;

  const removeRow = (index: number) => {
    if (index < savedCount) return setPendingRemoval(index);
    remove(index);
  };

  const firstName = profile?.user.first_name ?? "there";

  return (
    <OnboardingShell
      title={`Welcome ${firstName} 👋`}
      subtitle="Let's get your account fully set up. A few quick steps stand between you and your first job."
      tips={ONBOARDING_TIPS.GUARANTORS}
    >
      <StepHeader
        title="Your Guarantor Information"
        description="Add at least one guarantor to help verify your profile"
        progress={getOnboardingProgress("GUARANTORS")}
      />

      <form onSubmit={handleSubmit((data) => save(data))} className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border-border space-y-4 rounded-xl border p-4"
          >
            <FormInput<GuarantorFormValues>
              control={control}
              name={`guarantors.${index}.full_name`}
              errors={errors}
              label="Your Guarantor's name"
              placeholder="E.g John Levy"
            />

            <FormSelect<GuarantorFormValues>
              control={control}
              name={`guarantors.${index}.relationship`}
              errors={errors}
              label="Who is this person to you?"
              placeholder="E.g Former Employer"
              options={GUARANTOR_RELATIONSHIP_OPTIONS}
            />

            <FormInput<GuarantorFormValues>
              control={control}
              name={`guarantors.${index}.phone_no`}
              errors={errors}
              label="Guarantor's Phone Number"
              placeholder="E.g +234"
            />

            <FormInput<GuarantorFormValues>
              control={control}
              name={`guarantors.${index}.address`}
              errors={errors}
              label="Guarantor's Address"
              placeholder="E.g 12 Bode Thomas, Surulere"
            />

            <FormInput<GuarantorFormValues>
              control={control}
              name={`guarantors.${index}.nin`}
              errors={errors}
              label="Guarantor's NIN"
              placeholder="E.g 12345678901"
            />

            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeRow(index)}
                className="text-destructive border-destructive/40 h-10 rounded-lg px-4"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append(DEFAULT_GUARANTOR as never)}
          className="text-brand border-brand/40 h-11 w-full rounded-lg"
        >
          <Plus className="h-4 w-4" />
          Add more Guarantor
        </Button>

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

      <ConfirmDialog
        isOpen={pendingRemoval !== null}
        onOpenChange={(open) => !open && setPendingRemoval(null)}
        icon={Trash2}
        iconClassName="text-destructive"
        title="Remove this guarantor?"
        description="They are removed from your application when you save this step."
        confirmLabel="Remove"
        confirmVariant="destructive"
        onConfirm={() => {
          if (pendingRemoval !== null) remove(pendingRemoval);
          setPendingRemoval(null);
        }}
      />
    </OnboardingShell>
  );
}
