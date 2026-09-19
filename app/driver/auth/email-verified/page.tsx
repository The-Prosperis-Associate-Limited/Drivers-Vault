"use client";

import { AuthShell } from "@/components/driver/auth-shell";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EmailVerified() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <AuthShell backHref="/driver/auth/signin">
      <div className="bg-brand-soft mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <CircleCheck className="text-brand h-8 w-8" />
      </div>

      <AppText type="h2" className="mb-3 text-[26px] font-bold">
        Email verified
      </AppText>

      <AppText type="subtitle" className="text-muted-foreground mb-8 text-sm">
        {email ? (
          <>
            <span className="text-brand">{email}</span> is confirmed and your
            account is active.
          </>
        ) : (
          "Your email is confirmed and your account is active."
        )}
      </AppText>

      <Button
        onClick={() => router.push("/driver/dashboard")}
        className="h-12 w-full rounded-lg text-sm"
      >
        Proceed to Dashboard
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
