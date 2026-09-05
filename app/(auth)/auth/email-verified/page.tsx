"use client";

import { AuthShell } from "@/components/shared/auth-shell";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EmailVerified() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <AuthShell>
      <div className="bg-brand-soft mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <CircleCheck className="text-brand h-8 w-8" />
      </div>

      <AppText type="h2" className="mb-3 text-[26px] font-bold">
        Email verified
      </AppText>

      <AppText type="subtitle" className="text-muted-foreground mb-8 text-sm">
        {name ? (
          <>
            You're all set, <span className="text-brand">{name}</span> — your
            email is confirmed and your account is active.
          </>
        ) : (
          "Your email is confirmed and your account is active."
        )}
      </AppText>

      <Button
        onClick={() => router.push("/auth/signin")}
        className="h-12 w-full rounded-lg text-sm"
      >
        Sign in to continue
      </Button>
    </AuthShell>
  );
}

export default function EmailVerifiedPage() {
  return (
    <Suspense fallback={null}>
      <EmailVerified />
    </Suspense>
  );
}
