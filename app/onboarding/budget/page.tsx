"use client";

import { useEffect, useState } from "react";
import { BUDGET_RANGE_OPTIONS } from "@/lib/utils";
import type { BudgetRange } from "@/types/auth";
import { OnboardingShell } from "../_components/onboarding-shell";
import { OptionCard } from "../_components/option-card";
import { usePreferences } from "../_hooks/use-preferences";
import {
  useCompleteOnboarding,
  useSavePreferences,
} from "../_hooks/use-save-preferences";

export default function Budget() {
  const { preferences } = usePreferences();

  const [budget, setBudget] = useState<BudgetRange | null>(null);

  useEffect(() => {
    if (preferences) setBudget(preferences.budget_range);
  }, [preferences]);

  const { complete, isPending: isCompleting } = useCompleteOnboarding();

  const { save, isPending: isSaving } = useSavePreferences({
    onSuccess: () => complete(undefined),
  });

  return (
    <OnboardingShell
      step={5}
      title="What's your budget per driver?"
      subtitle="We'll match drivers within your range. You can change this later."
      isPending={isSaving || isCompleting}
      continueDisabled={!budget}
      onContinue={() => save({ budget_range: budget })}
    >
      <p className="text-ink mb-3 text-sm font-medium">Budget range</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {BUDGET_RANGE_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            selected={budget === option.value}
            onSelect={() => setBudget(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
