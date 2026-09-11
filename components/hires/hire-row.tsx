"use client";

import { AppText } from "@/components/shared/app-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  driverTypeLabel,
  HIRE_ENGAGEMENT_LABELS,
  formatDate,
  formatMoney,
  getInitials,
} from "@/lib/utils";
import Link from "next/link";
import type { Hire } from "@/types/booking";

interface Props {
  hire: Hire;
}

export const HireRow = function ({ hire }: Props) {
  const name =
    [hire.driver?.first_name, hire.driver?.last_name]
      .filter(Boolean)
      .join(" ") || "Driver";

  const route = [hire.pickup_address, hire.dropoff_address]
    .filter(Boolean)
    .join(" → ");

  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={hire.driver?.profile_pic ?? undefined} alt="" />
          <AvatarFallback>
            {getInitials(hire.driver?.first_name, hire.driver?.last_name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <span className="flex items-center gap-2">
            <AppText type="label" className="truncate text-sm font-semibold">
              {name}
            </AppText>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-600 uppercase">
              Active
            </span>
          </span>
          <AppText
            type="caption"
            className="text-muted-foreground mt-0.5 block truncate"
          >
            {driverTypeLabel(hire.driver_type)} ·{" "}
            {HIRE_ENGAGEMENT_LABELS[hire.engagement_type]} · since{" "}
            {formatDate(hire.starts_at)}
          </AppText>
          {route && (
            <AppText type="caption" className="text-ink mt-1 block truncate">
              {route}
            </AppText>
          )}
        </div>
      </div>

      <span className="flex shrink-0 items-center gap-4 pl-13 sm:pl-0">
        <AppText type="label" className="text-sm font-semibold">
          {formatMoney(hire.amount, hire.currency)} / month
        </AppText>
        <Link
          href={`/dashboard/my-hire/${hire.reference}`}
          className="bg-brand-soft text-brand hover:bg-brand-soft/70 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
        >
          View
        </Link>
      </span>
    </div>
  );
};
