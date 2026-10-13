"use client";

import { useEffect, useState } from "react";
import { AppInput } from "@/components/shared/app-input";
import { OnboardingShell } from "../_components/onboarding-shell";
import { usePreferences } from "../_hooks/use-preferences";
import {
  useCompleteOnboarding,
  useSavePreferences,
} from "../_hooks/use-save-preferences";

export default function Budget() {
  const { preferences } = usePreferences();

  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (preferences?.monthly_budget)
      setBudget(String(preferences.monthly_budget / 100));
  }, [preferences]);

  const { complete, isPending: isCompleting } = useCompleteOnboarding();

  const { save, isPending: isSaving } = useSavePreferences({
    onSuccess: () => complete(undefined),
  });

  return (
    <OnboardingShell
      step={5}
      title="What's your budget per driver?"
      subtitle="Tell us what you're willing to pay each month and we'll match drivers within it. You can change this later."
      isPending={isSaving || isCompleting}
      continueDisabled={!Number(budget)}
      onContinue={() => save({ monthly_budget: Number(budget) * 100 })}
    >
      <AppInput
        label="Monthly budget per driver (₦)"
        placeholder="E.g 250000"
        inputMode="numeric"
        suffix="/ month"
        value={budget}
        onChange={(event) => setBudget(event.target.value.replace(/\D/g, ""))}
      />
    </OnboardingShell>
  );
}
