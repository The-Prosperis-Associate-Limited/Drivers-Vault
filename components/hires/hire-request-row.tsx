"use client";

import { AppText } from "@/components/shared/app-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  cn,
  driverTypeLabel,
  formatDate,
  formatMoney,
  getInitials,
} from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { HireRequest, HireRequestStatus } from "@/types/hire";

export const HIRE_REQUEST_STATUS_STYLES: Record<HireRequestStatus, string> = {
  PENDING_REVIEW: "bg-amber-50 text-amber-600",
  INVOICED: "bg-blue-50 text-blue-600",
  PAID: "bg-emerald-50 text-emerald-600",
  DECLINED: "bg-red-50 text-red-600",
  CANCELLED: "bg-muted text-muted-foreground",
};

export const HIRE_REQUEST_STATUS_LABELS: Record<HireRequestStatus, string> = {
  PENDING_REVIEW: "Under review",
  INVOICED: "Invoice ready",
  PAID: "Paid",
  DECLINED: "Declined",
  CANCELLED: "Cancelled",
};

interface Props {
  request: HireRequest;
}

export const HireRequestRow = function ({ request }: Props) {
  const driver = request.driver;
  const name =
    [driver.first_name, driver.last_name].filter(Boolean).join(" ") || "Driver";

  return (
    <Link
      href={`/dashboard/my-hire/requests/${request.reference}`}
      className="hover:bg-muted/40 flex items-center gap-4 py-4 transition-colors"
    >
      <Avatar className="h-11 w-11 shrink-0">
        <AvatarImage src={driver.profile_pic ?? undefined} alt="" />
        <AvatarFallback>
          {getInitials(driver.first_name, driver.last_name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <AppText type="label" className="truncate text-sm font-semibold">
            {name}
          </AppText>
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
              HIRE_REQUEST_STATUS_STYLES[request.status],
            )}
          >
            {HIRE_REQUEST_STATUS_LABELS[request.status]}
          </span>
        </span>
        <AppText
          type="caption"
          className="text-muted-foreground mt-0.5 block truncate text-xs"
        >
          {[
            driverTypeLabel(driver.driver_profile?.driver_type ?? undefined),
            `Starts ${formatDate(request.starts_at)}`,
            request.invoice
              ? `Invoice ${formatMoney(request.invoice.total_minor, request.invoice.currency)}`
              : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </AppText>
      </div>

      <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0" />
    </Link>
  );
};
