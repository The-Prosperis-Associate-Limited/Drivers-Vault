"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { VERIFICATION_COPY } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { DriverVerificationStatus } from "@/types/driver";

interface Props {
  status: DriverVerificationStatus;
}

// Every /driver/job-requests route 403s an unverified driver, so both screens
// ask before they fetch rather than toasting a rejection at them.
export const UnverifiedNotice = function ({ status }: Props) {
  return (
    <div className="border-border rounded-xl border bg-white">
      <EmptyState
        icon={ShieldCheck}
        title="Clients can't reach you yet"
        description={VERIFICATION_COPY[status].headline}
        action={
          status === "PENDING" ? undefined : (
            <Button asChild className="h-11 rounded-lg px-6">
              <Link
                href={
                  status === "REJECTED"
                    ? "/driver/dashboard/settings?tab=verification"
                    : "/driver/onboarding"
                }
              >
                {status === "REJECTED"
                  ? "Fix your documents"
                  : "Finish your profile"}
              </Link>
            </Button>
          )
        }
      />
    </div>
  );
};
