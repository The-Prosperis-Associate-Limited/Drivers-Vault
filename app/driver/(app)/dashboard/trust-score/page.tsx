"use client";

import { AppText } from "@/components/shared/app-text";
import { BackLink } from "@/components/shared/back-link";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { CircleCheck, Gauge } from "lucide-react";
import { useTrustScore } from "../_hooks/use-dashboard";
import type { TrustScoreBreakdown } from "@/types/driver";

// The score is one number out of 100 from the server and the weights live
// there. Nothing on this page recomputes it — the bars only divide points by
// their own maximum so a component that is full looks full.
const standingFor = function (total: number) {
  if (total >= 80) return "Excellent standing";
  if (total >= 60) return "Good standing";
  if (total >= 40) return "Building up";
  return "Just getting started";
};

const componentsFor = function (breakdown: TrustScoreBreakdown) {
  const { facts, max } = breakdown;

  return [
    {
      key: "verification",
      label: "Identity & licence",
      earned: breakdown.verification,
      max: max.verification,
      caption:
        facts.verification_status === "APPROVED"
          ? "NIN verified; licence review complete"
          : "Complete verification to earn these points",
    },
    {
      key: "reviews",
      label: "Client rating",
      earned: breakdown.reviews,
      max: max.reviews,
      caption: facts.review_count
        ? `${facts.review_average.toFixed(1)} average from ${facts.review_count} bookings`
        : "No client reviews yet",
    },
    {
      key: "completions",
      label: "Reliability",
      earned: breakdown.completions,
      max: max.completions,
      caption: facts.bookings_engaged
        ? `${facts.bookings_completed} of ${facts.bookings_engaged} bookings completed`
        : "No bookings taken on yet",
    },
    {
      key: "training",
      label: "Training",
      earned: breakdown.training,
      max: max.training,
      caption: facts.required_courses
        ? `${facts.required_courses_completed} of ${facts.required_courses} required modules completed`
        : "No required modules published yet",
    },
  ];
};

export default function TrustScore() {
  const { trustScore, isFetching } = useTrustScore();

  if (isFetching && !trustScore) {
    return (
      <div className="mx-auto max-w-6xl space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!trustScore) return null;

  const components = componentsFor(trustScore);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <BackLink href="/driver/dashboard" />

      <div className="border-border border-b pb-5">
        <PageHeader
          title="Trust score"
          subtitle="A transparent measure of your verification, client service, reliability and training progress."
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="bg-brand space-y-4 rounded-xl p-5 text-white md:p-6">
          <AppText type="label" className="block text-white">
            Current score
          </AppText>

          <p className="flex items-end gap-1">
            <span className="text-6xl font-semibold">{trustScore.total}</span>
            <span className="pb-2 text-lg text-white/80">/100</span>
          </p>

          <AppText type="h4" className="text-lg font-semibold text-white">
            {standingFor(trustScore.total)}
          </AppText>

          {trustScore.percentile !== null && (
            <AppText type="caption" className="block text-white/90">
              Your profile is more trusted than {trustScore.percentile}% of
              active drivers near you.
            </AppText>
          )}
        </div>

        <div className="border-border space-y-5 rounded-xl border bg-white p-5 md:p-6">
          <div className="space-y-1">
            <AppText type="h4" className="text-base font-semibold">
              Score breakdown
            </AppText>
            <AppText type="caption" className="text-muted-foreground block">
              Updated after each verified activity
            </AppText>
          </div>

          <div className="space-y-5">
            {components.map((component) => {
              const percent = component.max
                ? Math.round((component.earned / component.max) * 100)
                : 0;

              return (
                <div key={component.key} className="space-y-2">
                  <AppText type="h4" className="text-base font-medium">
                    {component.label}
                  </AppText>

                  <div className="flex items-center gap-3">
                    <Progress
                      value={percent}
                      aria-label={component.label}
                      className="flex-1"
                    />
                    <AppText
                      type="caption"
                      className="text-foreground w-10 shrink-0 text-right"
                    >
                      {percent}%
                    </AppText>
                  </div>

                  <AppText
                    type="caption"
                    className="text-muted-foreground block"
                  >
                    {component.caption}
                  </AppText>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-border rounded-xl border bg-white p-5 md:p-6">
        <AppText type="h4" className="text-base font-semibold">
          Recent score activity
        </AppText>

        {!trustScore.recent_activity.length ? (
          <EmptyState
            icon={Gauge}
            title="Nothing has moved your score yet."
            description="Verification, completed bookings, client reviews and finished training all show up here."
          />
        ) : (
          <div className="border-border mt-4 space-y-4 rounded-xl border p-4 md:p-5">
            {trustScore.recent_activity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="bg-brand-soft flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <CircleCheck className="text-brand h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <AppText type="label" className="block">
                    {activity.title}
                  </AppText>
                  <AppText
                    type="caption"
                    className="text-muted-foreground block"
                  >
                    {activity.description ?? formatDate(activity.createdAt)}
                  </AppText>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
