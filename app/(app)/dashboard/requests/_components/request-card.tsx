"use client";

import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import {
  cn,
  formatMoney,
  formatRelativeTime,
  HIRE_ENGAGEMENT_LABELS,
} from "@/lib/utils";
import Link from "next/link";
import type { StaffingRequestListItem } from "@/types/request";

interface Props {
  request: StaffingRequestListItem;
  onCloseRequest: (request: StaffingRequestListItem) => void;
}

export const RequestCard = function ({ request, onCloseRequest }: Props) {
  const open = request.status === "OPEN";

  const meta = [
    [request.city, request.state].filter(Boolean).join(", "),
    HIRE_ENGAGEMENT_LABELS[request.engagement_type],
    `Posted ${formatRelativeTime(request.createdAt)}`,
  ]
    .filter(Boolean)
    .join(" · ");

  const stats = [
    { label: "Applicants", value: String(request.applicants) },
    { label: "Shortlisted", value: String(request.shortlisted) },
    {
      label: "Budget",
      value: `${formatMoney(request.budget, request.currency)} / month`,
    },
  ];

  return (
    <div className="border-border flex flex-col rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <AppText type="h3" className="truncate text-base font-bold">
            {request.title}
          </AppText>
          <AppText
            type="caption"
            className="text-muted-foreground mt-1 block text-xs"
          >
            {meta}
          </AppText>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide uppercase",
            open
              ? "bg-emerald-50 text-emerald-600"
              : "bg-muted text-muted-foreground",
          )}
        >
          {open ? "Open" : "Closed"}
        </span>
      </div>

      {request.description && (
        <AppText
          type="caption"
          className="text-ink mt-3 line-clamp-2 block text-sm"
        >
          {request.description}
        </AppText>
      )}

      <div className="bg-brand-soft/60 mt-4 grid grid-cols-3 gap-2 rounded-xl px-4 py-3">
        {stats.map((stat) => (
          <span key={stat.label} className="min-w-0 text-center">
            <AppText type="caption" className="text-brand block text-xs">
              {stat.label}
            </AppText>
            <AppText
              type="label"
              className="mt-1 block truncate text-sm font-bold"
            >
              {stat.value}
            </AppText>
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button asChild className="h-10 rounded-lg px-5 text-sm">
          <Link href={`/dashboard/requests/${request.reference}`}>
            View matches
          </Link>
        </Button>
        {open && (
          <Button
            variant="outline"
            className="h-10 rounded-lg px-5 text-sm"
            onClick={() => onCloseRequest(request)}
          >
            Close Request
          </Button>
        )}
      </div>
    </div>
  );
};
