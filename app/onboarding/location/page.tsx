"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { AppInput } from "@/components/shared/app-input";
import { HIRING_TIMELINE_OPTIONS } from "@/lib/utils";
import type { HiringTimeline } from "@/types/auth";
import { OnboardingShell } from "../_components/onboarding-shell";
import { OptionCard } from "../_components/option-card";
import { usePreferences } from "../_hooks/use-preferences";
import { useSavePreferences } from "../_hooks/use-save-preferences";

export default function Location() {
  const { preferences } = usePreferences();

  const [location, setLocation] = useState("");
  const [timeline, setTimeline] = useState<HiringTimeline | null>(null);

  useEffect(() => {
    if (!preferences) return;
    setLocation(preferences.primary_location ?? "");
    setTimeline(preferences.hiring_timeline);
  }, [preferences]);

  const { save, isPending } = useSavePreferences({
    redirectTo: "/onboarding/budget",
  });

  return (
    <OnboardingShell
      step={4}
      title="Where and when?"
      subtitle="So we prioritise drivers near you, ready on your timeline."
      isPending={isPending}
      continueDisabled={location.trim().length < 2 || !timeline}
      onContinue={() =>
        save({ primary_location: location.trim(), hiring_timeline: timeline })
      }
    >
      <AppInput
        label="Primary location"
        placeholder="E.g Lekki, Lagos"
        icon={MapPin}
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />

      <p className="text-ink mt-8 mb-3 text-sm font-medium">
        When do you need them?
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {HIRING_TIMELINE_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            selected={timeline === option.value}
            onSelect={() => setTimeline(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
