"use client";

import { AppText } from "@/components/shared/app-text";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_STATUS_STYLES,
  ENGAGEMENT_TYPE_LABELS,
  clientNameOf,
  formatPay,
  formatPosted,
  getInitials,
} from "@/lib/utils";
import Link from "next/link";
import type { Booking } from "@/types/booking";

interface Props {
  booking: Booking;
}

export const JobRequestRow = function ({ booking }: Props) {
  return (
    <Link
      href={`/driver/dashboard/job-request/${booking.reference}`}
      className="hover:bg-muted/40 flex flex-col gap-3 px-4 py-5 transition-colors sm:flex-row sm:gap-4 md:px-6"
    >
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarImage src={booking.client.profile_pic ?? undefined} alt="" />
        <AvatarFallback className="bg-brand-soft text-brand text-xs">
          {getInitials(booking.client.first_name, booking.client.last_name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <AppText type="h4" className="text-base font-semibold">
            {booking.title}
          </AppText>
          <StatusBadge
            label={ENGAGEMENT_TYPE_LABELS[booking.engagement_type]}
            className="bg-muted text-muted-foreground border-transparent"
          />
        </div>

        <AppText type="caption" className="text-muted-foreground block">
          {clientNameOf(booking.client)} · posted{" "}
          {formatPosted(booking.createdAt)}
        </AppText>

        {booking.description && (
          <AppText
            type="caption"
            className="text-muted-foreground line-clamp-2 block pt-2"
          >
            {booking.description}
          </AppText>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
        <AppText type="label" className="font-semibold">
          {formatPay(booking.amount, booking.currency, booking.engagement_type)}
        </AppText>
        {booking.status !== "REQUESTED" && (
          <StatusBadge
            label={BOOKING_STATUS_LABELS[booking.status]}
            className={BOOKING_STATUS_STYLES[booking.status]}
          />
        )}
      </div>
    </Link>
  );
};
