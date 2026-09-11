"use client";

import { AppText } from "@/components/shared/app-text";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_STATUS_STYLES,
  DRIVER_TYPE_OPTIONS,
  clientNameOf,
  formatDateTime,
  formatMoney,
  getInitials,
} from "@/lib/utils";
import { Calendar, Eye, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";
import type { Booking } from "@/types/booking";

interface Props {
  booking: Booking;
  showStatus?: boolean;
}

export const JobRequestCard = function ({ booking, showStatus }: Props) {
  const clientName = clientNameOf(booking.client);

  const driverType =
    DRIVER_TYPE_OPTIONS.find((option) => option.value === booking.driver_type)
      ?.label ?? booking.driver_type;

  return (
    <div className="border-border flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-center md:p-5">
      <Avatar className="h-12 w-12 shrink-0">
        <AvatarImage src={booking.client.profile_pic ?? undefined} alt="" />
        <AvatarFallback>
          {getInitials(booking.client.first_name, booking.client.last_name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <AppText type="h4" className="text-base font-semibold">
            {clientName}
          </AppText>
          {showStatus && (
            <StatusBadge
              label={BOOKING_STATUS_LABELS[booking.status]}
              className={BOOKING_STATUS_STYLES[booking.status]}
            />
          )}
        </div>

        <AppText type="caption" className="text-muted-foreground block">
          {driverType} • {formatMoney(booking.amount, booking.currency)}
        </AppText>

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDateTime(booking.starts_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {booking.pickup_address}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {booking.status === "ACCEPTED" || booking.status === "IN_PROGRESS" ? (
          <Button
            variant="ghost"
            className="bg-brand-soft text-brand h-9 rounded-full px-4"
            asChild
          >
            <Link href={`/driver/dashboard/job-request/${booking.reference}`}>
              <MessageSquare className="h-4 w-4" />
              Message
            </Link>
          </Button>
        ) : null}

        <Button
          variant="ghost"
          className="bg-brand-soft text-brand h-9 rounded-full px-4"
          asChild
        >
          <Link href={`/driver/dashboard/job-request/${booking.reference}`}>
            <Eye className="h-4 w-4" />
            View
          </Link>
        </Button>
      </div>
    </div>
  );
};
