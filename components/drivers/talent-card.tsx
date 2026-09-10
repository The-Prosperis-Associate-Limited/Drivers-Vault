"use client";

import { AppText } from "@/components/shared/app-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { driverTypeLabel, formatMoney, getInitials } from "@/lib/utils";
import { BadgeCheck, Star } from "lucide-react";
import Link from "next/link";
import type { DriverSearchResult } from "@/types/driver";
import { TrustRing } from "./trust-ring";

interface Props {
  driver: DriverSearchResult;
}

export const TalentCard = function ({ driver }: Props) {
  const name =
    [driver.user.first_name, driver.user.last_name].filter(Boolean).join(" ") ||
    "Driver";

  const chips = driver.certification_titles.slice(0, 4);

  return (
    <div className="border-border rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            <Avatar className="h-14 w-14">
              <AvatarImage src={driver.user.profile_pic ?? undefined} alt="" />
              <AvatarFallback>
                {getInitials(driver.user.first_name, driver.user.last_name)}
              </AvatarFallback>
            </Avatar>
            <BadgeCheck className="fill-brand absolute -right-0.5 -bottom-0.5 h-4 w-4 text-white" />
          </div>

          <div className="min-w-0">
            <AppText type="label" className="block truncate text-base">
              {name}
            </AppText>
            <AppText
              type="caption"
              className="text-muted-foreground block truncate"
            >
              {driverTypeLabel(driver.driver_type)}
            </AppText>
            {driver.review_count > 0 && (
              <span className="mt-0.5 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <AppText type="caption" className="text-muted-foreground">
                  {driver.rating.toFixed(1)} ({driver.review_count})
                </AppText>
              </span>
            )}
          </div>
        </div>

        <TrustRing score={driver.trust_score} size={56} />
      </div>

      {chips.length > 0 && (
        <div className="mt-4">
          <AppText
            type="caption"
            className="text-muted-foreground block text-[10px] font-semibold tracking-[0.2em] uppercase"
          >
            Certifications
          </AppText>
          <div className="mt-2 flex flex-wrap gap-2">
            {chips.map((title) => (
              <span
                key={title}
                className="bg-muted text-ink rounded-full px-3 py-1 text-xs font-medium"
              >
                {title}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-end justify-between gap-3">
        <span>
          <AppText type="label" className="block text-lg font-bold">
            {driver.expected_monthly_rate
              ? `${formatMoney(driver.expected_monthly_rate, driver.rate_currency)} / month`
              : "Rate not set"}
          </AppText>
          <AppText type="caption" className="text-muted-foreground block">
            {driverTypeLabel(driver.driver_type)}
          </AppText>
        </span>

        <Button asChild className="h-11 rounded-xl px-6 text-sm">
          <Link href={`/dashboard/drivers/${driver.userId}`}>View profile</Link>
        </Button>
      </div>
    </div>
  );
};
