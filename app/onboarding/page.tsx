"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ONBOARDING_STEPS } from "@/lib/utils";
import { usePreferences } from "./_hooks/use-preferences";

// Sign-in lands every client here: anyone who has finished (or skipped) the
// wizard goes straight to the dashboard, everyone else starts at step 1.
export default function OnboardingEntry() {
  const router = useRouter();
  const { preferences } = usePreferences();

  useEffect(() => {
    if (!preferences) return;

    router.replace(
      preferences.onboarding_completed_at
        ? "/dashboard"
        : ONBOARDING_STEPS[0].path,
    );
  }, [preferences, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="text-brand h-7 w-7 animate-spin" />
    </div>
  );
}
