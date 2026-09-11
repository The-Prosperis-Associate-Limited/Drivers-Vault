"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/shared/site-footer";
import { AppText } from "@/components/shared/app-text";
import { useGetProfile } from "@/hooks/use-get-profile";
import { CLIENT_ONBOARDING_STEPS } from "@/lib/utils";
import { useCompleteOnboarding } from "../_hooks/use-save-preferences";

interface Props {
  step: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onContinue: () => void;
  isPending?: boolean;
  continueDisabled?: boolean;
}

export const OnboardingShell = function ({
  step,
  title,
  subtitle,
  children,
  onContinue,
  isPending,
  continueDisabled,
}: Props) {
  const router = useRouter();
  const { profile } = useGetProfile();

  // Skipping is completing — the wizard is a prompt, not a gate, and it must
  // not reappear on every sign-in.
  const { complete, isPending: isSkipping } = useCompleteOnboarding({
    silent: true,
  });

  const previousPath = CLIENT_ONBOARDING_STEPS[step - 2]?.path;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pt-8 pb-16">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-xs font-medium tracking-[0.25em] uppercase">
            Step {step} of {CLIENT_ONBOARDING_STEPS.length}
          </span>
          <span className="text-ink text-sm font-medium">
            {profile?.first_name ? `Hi ${profile.first_name} 👋` : "\u00a0"}
          </span>
        </div>

        <Progress
          value={(step / CLIENT_ONBOARDING_STEPS.length) * 100}
          className="mt-2 h-1.5"
        />

        <div className="pt-24 md:pt-40">
          <AppText type="h2" className="text-3xl font-semibold md:text-4xl">
            {title}
          </AppText>
          <AppText
            type="subtitle"
            className="text-muted-foreground mt-2 text-base"
          >
            {subtitle}
          </AppText>

          <div className="mt-8">{children}</div>

          <div className="mt-8 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl px-6 text-sm"
              onClick={() =>
                previousPath ? router.push(previousPath) : router.push("/")
              }
            >
              Back
            </Button>

            <Button
              type="button"
              isLoading={isPending}
              disabled={continueDisabled}
              onClick={onContinue}
              className="h-12 rounded-xl px-8 text-sm"
            >
              Continue
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/dashboard"
              onClick={(event) => {
                event.preventDefault();
                if (!isSkipping) complete(undefined);
              }}
              className="text-muted-foreground hover:text-brand text-sm underline underline-offset-2"
            >
              Skip for now
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};
