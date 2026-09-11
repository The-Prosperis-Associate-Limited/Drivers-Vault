"use client";

import { AppText } from "@/components/shared/app-text";
import { OnboardingShell } from "@/components/shared/onboarding-shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useVerificationStatus } from "@/hooks/use-verification-status";
import { Check, Hourglass, X } from "lucide-react";
import { useRouter } from "next/navigation";

/*
  Three of the four verification states are their own screen in the design, and
  they are the same screen with different copy — the rejected one is the only
  one that renders data, and it renders the server's per-document reasons
  verbatim rather than paraphrasing them.
*/
export default function OnboardingStatus() {
  const router = useRouter();
  const { verification, isFetching } = useVerificationStatus();
  const { profile } = useGetProfile();

  const firstName = profile?.first_name ?? "there";
  const location = profile?.state_of_residence ?? "your area";

  if (isFetching && !verification) {
    return (
      <OnboardingShell showBack={false}>
        <div className="space-y-4 py-6">
          <Skeleton className="mx-auto h-16 w-16 rounded-full" />
          <Skeleton className="mx-auto h-6 w-52" />
          <Skeleton className="mx-auto h-4 w-72" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </OnboardingShell>
    );
  }

  if (verification?.status === "APPROVED") {
    return (
      <OnboardingShell showBack>
        <div className="flex flex-col items-center py-6 text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700">
            <Check className="h-7 w-7 text-white" />
          </div>

          <AppText type="h3" className="mb-2 text-xl font-bold">
            You're verified, {firstName}.
          </AppText>
          <AppText
            type="subtitle"
            className="text-muted-foreground mb-7 max-w-sm text-sm"
          >
            All your documents cleared review. Your profile is now visible to
            clients across {location}.
          </AppText>

          <Button
            onClick={() => router.push("/driver/dashboard")}
            className="h-12 w-full rounded-lg text-sm"
          >
            Proceed to Dashboard
          </Button>
        </div>
      </OnboardingShell>
    );
  }

  if (verification?.status === "REJECTED") {
    const rejected = verification.rejected_documents;

    return (
      <OnboardingShell showBack>
        <div className="flex flex-col items-center py-6 text-center">
          <div className="bg-destructive mb-6 flex h-12 w-12 items-center justify-center rounded-full">
            <X className="h-6 w-6 text-white" />
          </div>

          <AppText type="h3" className="mb-2 text-xl font-bold">
            {rejected.length === 1
              ? "We couldn't verify one document."
              : `We couldn't verify ${rejected.length || "some"} documents.`}
          </AppText>
          <AppText
            type="subtitle"
            className="text-muted-foreground mb-6 max-w-sm text-sm"
          >
            The rest of your application looks good. Fix the items below and
            resubmit, no need to redo anything else.
          </AppText>

          <div className="border-destructive/30 mb-6 w-full rounded-xl border bg-red-50/60 p-4 text-left">
            <AppText type="caption" className="text-destructive mb-2 block">
              What needs fixing
            </AppText>

            {rejected.length ? (
              <ul className="space-y-2">
                {rejected.map((document) => (
                  <li key={document.id}>
                    <AppText type="caption" className="text-destructive">
                      <span className="font-semibold">{document.label}</span>
                      {document.reason ? ` — ${document.reason}` : ""}
                    </AppText>
                  </li>
                ))}
              </ul>
            ) : (
              <AppText type="caption" className="text-destructive">
                {verification.rejection_reason}
              </AppText>
            )}
          </div>

          <Button
            onClick={() => router.push("/driver/onboarding/documents")}
            className="h-12 w-full rounded-lg text-sm"
          >
            Resubmit Document
          </Button>
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell
      showBack
      tips={["Our verification process takes just 24-48 Hours"]}
    >
      <div className="flex flex-col items-center py-6 text-center">
        <div className="bg-brand-soft mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <Hourglass className="text-brand h-9 w-9" />
        </div>

        <AppText type="h3" className="mb-2 text-xl font-bold">
          Thank you for the submission.
        </AppText>
        <AppText
          type="subtitle"
          className="text-muted-foreground mb-7 max-w-sm text-sm"
        >
          Our Team is currently looking through your document and will get back
          to you soon.
        </AppText>

        <Button
          onClick={() => router.push("/driver/dashboard")}
          className="h-12 w-full rounded-lg text-sm"
        >
          Proceed to Dashboard
        </Button>
      </div>
    </OnboardingShell>
  );
}
