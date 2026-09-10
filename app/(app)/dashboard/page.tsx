"use client";

import { AppText } from "@/components/shared/app-text";
import { HireRow } from "@/components/hires/hire-row";
import { StatCard } from "@/components/shared/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { useGetProfile } from "@/hooks/use-get-profile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  formatDate,
  formatMoney,
  formatMoneyCompact,
  formatRelativeTime,
} from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { APIResponse } from "@/types/response";
import type { OverviewData } from "@/types/booking";

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border rounded-2xl border bg-white p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <AppText type="h3" className="text-base font-semibold">
          {title}
        </AppText>
        {action}
      </div>
      {children}
    </div>
  );
}

const seeAll = (href: string, label = "See all") => (
  <Link
    href={href}
    className="text-brand text-sm font-semibold underline underline-offset-4"
  >
    {label}
  </Link>
);

export default function DashboardOverview() {
  const { profile } = useGetProfile();

  const { data } = useGetData<APIResponse<OverviewData>>({
    url: API_ENDPOINTS.dashboard.overview,
  });

  const overview = data?.data;

  const displayName =
    profile?.client_profile?.organisation_name || profile?.first_name;

  const cards = overview && [
    {
      label: "Active drivers",
      value: String(overview.stats.active_drivers),
      caption: "Currently engaged",
      tone: "muted" as const,
    },
    {
      label: "Open requests",
      value: String(overview.stats.open_requests),
      caption: "Awaiting driver response",
      tone: "muted" as const,
    },
    {
      label: "Monthly spend",
      value: formatMoneyCompact(
        overview.stats.monthly_spend_minor,
        overview.currency,
      ),
      caption:
        overview.stats.spend_delta_percent === null
          ? "This month"
          : `${overview.stats.spend_delta_percent >= 0 ? "+" : ""}${overview.stats.spend_delta_percent}% vs last month`,
      tone:
        overview.stats.spend_delta_percent === null
          ? ("muted" as const)
          : ("positive" as const),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <AppText type="h2" className="text-xl font-bold md:text-2xl">
            {displayName ? `Welcome back, ${displayName}` : "Welcome back"}
          </AppText>
          <AppText
            type="subtitle"
            className="text-muted-foreground mt-1 text-sm"
          >
            Here's what's happening across your account.
          </AppText>
        </div>

        <Link
          href="/marketplace"
          className="bg-brand hover:bg-brand-hover flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          <Plus className="h-4 w-4" />
          Request
        </Link>
      </div>

      <div className="border-border mt-5 border-t" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards
          ? cards.map((card) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
                caption={card.caption}
                captionTone={card.tone}
              />
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-[110px] rounded-xl" />
            ))}
      </div>

      <div className="mt-6">
        <SectionCard
          title="Your hired staff"
          action={seeAll("/dashboard/my-hire")}
        >
          {!overview ? (
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : overview.hired_staff.length === 0 ? (
            <AppText
              type="caption"
              className="text-muted-foreground mt-4 block"
            >
              No active hires yet — your hired drivers will appear here.
            </AppText>
          ) : (
            <div className="mt-2 divide-y">
              {overview.hired_staff.map((hire) => (
                <HireRow key={hire.id} hire={hire} />
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard
          title="Open requests"
          action={seeAll("/dashboard/requests")}
        >
          {!overview ? (
            <Skeleton className="mt-4 h-40 rounded-xl" />
          ) : overview.open_requests.length === 0 ? (
            <AppText
              type="caption"
              className="text-muted-foreground mt-4 block"
            >
              Nothing open right now.
            </AppText>
          ) : (
            <div className="mt-2 divide-y">
              {overview.open_requests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between gap-3 py-3.5"
                >
                  <span className="min-w-0">
                    <AppText type="label" className="block truncate text-sm">
                      {request.title}
                    </AppText>
                    <AppText
                      type="caption"
                      className="text-muted-foreground mt-0.5 block"
                    >
                      {request.driver?.first_name
                        ? `Awaiting ${request.driver.first_name}'s response`
                        : "Awaiting a driver"}{" "}
                      · {formatRelativeTime(request.createdAt)}
                    </AppText>
                  </span>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                    Open
                  </span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard
          title="Recent payments"
          action={seeAll("/dashboard/transactions", "See Transaction")}
        >
          {!overview ? (
            <Skeleton className="mt-4 h-40 rounded-xl" />
          ) : overview.recent_payments.length === 0 ? (
            <AppText
              type="caption"
              className="text-muted-foreground mt-4 block"
            >
              Payments to your drivers will appear here.
            </AppText>
          ) : (
            <div className="mt-2 divide-y">
              {overview.recent_payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between gap-3 py-3.5"
                >
                  <span className="min-w-0">
                    <AppText type="label" className="block truncate text-sm">
                      {[
                        payment.booking?.driver?.first_name,
                        payment.booking?.driver?.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ") || "Driver"}
                    </AppText>
                    <AppText
                      type="caption"
                      className="text-muted-foreground mt-0.5 block truncate"
                    >
                      {payment.description ?? "Payment"} ·{" "}
                      {formatDate(payment.createdAt)}
                    </AppText>
                  </span>
                  <span className="shrink-0 text-right">
                    <AppText type="label" className="block text-sm">
                      {formatMoney(
                        Math.abs(payment.amount_minor),
                        payment.currency,
                      )}
                    </AppText>
                    <span className="mt-1 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                      Paid
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
