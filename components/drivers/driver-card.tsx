"use client";

import { AppText } from "@/components/shared/app-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, driverTypeLabel, getInitials, prettifyEnum } from "@/lib/utils";
import { BadgeCheck, Plus, Star } from "lucide-react";
import type { DriverSearchResult } from "@/types/driver";
import { TrustRing } from "./trust-ring";

interface Props {
  driver: DriverSearchResult;
  onRequest: (driver: DriverSearchResult) => void;
  className?: string;
}

const CHIP_STYLES = [
  "bg-amber-50 text-amber-700",
  "bg-emerald-50 text-emerald-700",
];

export const DriverCard = function ({ driver, onRequest, className }: Props) {
  // The design's skill chips — the closest real data is what the driver can
  // drive and speak.
  const chips = [
    ...driver.licence_classes.map((entry) => `Class ${entry}`),
    ...driver.languages,
  ];
  const visibleChips = chips.slice(0, 2);
  const hiddenCount = chips.length - visibleChips.length;

  const name =
    [driver.user.first_name, driver.user.last_name].filter(Boolean).join(" ") ||
    "Driver";

  return (
    <div
      className={cn(
        "border-border rounded-2xl border bg-white p-4 shadow-sm",
        className,
      )}
    >
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
          </div>
        </div>

        <TrustRing score={driver.trust_score} size={56} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {visibleChips.map((chip, index) => (
            <span
              key={chip}
              className={cn(
                "truncate rounded-full px-2.5 py-1 text-xs font-medium",
                CHIP_STYLES[index % CHIP_STYLES.length],
              )}
            >
              {chip}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2.5 py-1 text-xs font-medium">
              + {hiddenCount} more
            </span>
          )}
        </div>

        {driver.review_count > 0 && (
          <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />(
            {driver.rating.toFixed(1)})
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-11 rounded-lg text-sm">
          View ledger
        </Button>
        <Button
          className="h-11 rounded-lg text-sm"
          onClick={() => onRequest(driver)}
        >
          <Plus className="h-4 w-4" />
          Request
        </Button>
      </div>
    </div>
  );
};
