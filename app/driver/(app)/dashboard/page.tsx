"use client";

import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/use-get-profile";
import { greetingForNow, VERIFICATION_COPY } from "@/lib/utils";
import Link from "next/link";
import { JobRequestCard } from "../_components/job-request-card";
import { useDashboardStats, useUpcomingJobs } from "./_hooks/use-dashboard";
import { AttentionCard } from "./_components/attention-card";
import { OverallProgressCard } from "./_components/overall-progress-card";

export default function Overview() {
  const { profile } = useGetProfile();
  const { stats, isFetching } = useDashboardStats();
  const { jobs, isFetching: isFetchingJobs } = useUpcomingJobs();

  const status = profile?.driver_profile?.verification_status ?? "UNSUBMITTED";
  const isVerified = status === "APPROVED";
  const location = profile?.state_of_residence;

  const hasAttention = status === "REJECTED";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="space-y-1">
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          {greetingForNow()}, {profile?.first_name ?? "there"} 👋
        </AppText>
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          {isVerified && location
            ? `You're verified and visible to clients across ${location}.`
            : VERIFICATION_COPY[status].headline}
        </AppText>
      </div>

      {!isVerified && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <OverallProgressCard status={status} />
          <AttentionCard status={status} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        {isFetching && !stats ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))
        ) : (
          <>
            <StatCard
              label="Ongoing project"
              value={stats?.ongoing_projects ?? 0}
              caption={
                stats?.ongoing_projects
                  ? `${stats.ongoing_projects} in progress`
                  : "No active booking"
              }
              captionTone="muted"
            />
            <StatCard
              label="Trust score"
              value={stats?.trust_score ?? 0}
              caption="Out of 100"
              captionTone="muted"
              href="/driver/dashboard/trust-score"
            />
            <StatCard
              label="Client review"
              value={stats?.client_review_count ?? 0}
              caption={
                stats?.client_review_count
                  ? `${stats.client_review_count} verified reviews`
                  : "No reviews yet"
              }
              captionTone="muted"
              href="/driver/dashboard/reviews"
            />
            <StatCard
              label="Training completed"
              value={stats?.training_completed ?? 0}
              caption="Required modules"
              captionTone="muted"
              href="/driver/dashboard/training"
            />
          </>
        )}
      </div>

      <div className="border-border rounded-xl border bg-white">
        <div className="border-border flex items-center justify-between border-b px-4 py-4 md:px-5">
          <AppText type="h4" className="text-base font-semibold">
            Upcoming Jobs
          </AppText>
          <Link
            href="/driver/dashboard/job-request"
            className="text-brand text-sm font-semibold underline underline-offset-2"
          >
            See all
          </Link>
        </div>

        <div className="space-y-3 p-3 md:p-4">
          {isFetchingJobs && !jobs.length ? (
            <>
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </>
          ) : !jobs.length ? (
            <EmptyState
              illustration="/empty-jobs.svg"
              title="You have no upcoming jobs yet."
              description={
                isVerified
                  ? "New requests from clients will show up here."
                  : "Take courses to improve your trustscore on the platform"
              }
              action={
                !isVerified &&
                !hasAttention && (
                  <Button asChild className="h-11 rounded-lg px-6">
                    <Link href="/driver/dashboard/training">Get started</Link>
                  </Button>
                )
              }
            />
          ) : (
            jobs.map((booking) => (
              <JobRequestCard key={booking.id} booking={booking} showStatus />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
