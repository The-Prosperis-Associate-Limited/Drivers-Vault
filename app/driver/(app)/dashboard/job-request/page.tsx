"use client";

import { AppTabs } from "@/components/shared/app-tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { StatCard } from "@/components/shared/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useState } from "react";
import { JobRequestRow } from "./_components/job-request-row";
import { UnverifiedNotice } from "./_components/unverified-notice";
import {
  useJobRequestSummary,
  useJobRequests,
} from "./_hooks/use-job-requests";
import type { JobRequestBucket } from "@/types/booking";

/*
  The bucket names only - the server owns which statuses each one covers, so a
  job cannot be counted under one tab and listed under another. Jobs arrive
  already accepted (the platform brokers every hire), so the tabs track the
  engagement lifecycle rather than a request inbox.
*/
const TABS: {
  value: JobRequestBucket;
  label: string;
  empty: string;
  emptyHint: string;
}[] = [
  {
    value: "active",
    label: "Active",
    empty: "No active jobs right now",
    emptyHint:
      "When a client hires you, the engagement lands here - start it on day one and it runs until completion.",
  },
  {
    value: "completed",
    label: "Completed",
    empty: "You have not completed any jobs yet",
    emptyHint: "Finished engagements stay here for your records.",
  },
];

const LIMIT = 10;

export default function JobRequests() {
  const [tab, setTab] = useState<JobRequestBucket>("active");
  const [page, setPage] = useState(1);

  const active = TABS.find((entry) => entry.value === tab) ?? TABS[0];

  const { profile } = useGetProfile();
  const status = profile?.driver_profile?.verification_status;
  const isVerified = status === "APPROVED";

  const { summary } = useJobRequestSummary(isVerified);

  const { bookings, totalPages, isFetching } = useJobRequests({
    page,
    limit: LIMIT,
    bucket: active.value,
    shouldFetch: isVerified,
  });

  const counts: Record<JobRequestBucket, number | undefined> = {
    active: summary?.active,
    completed: summary?.completed,
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHeader
        title="My jobs"
        subtitle="Engagements clients have hired you for. Start each job on day one and mark it complete when it ends."
      />

      {profile && !isVerified ? (
        <UnverifiedNotice status={status ?? "UNSUBMITTED"} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              label="Active jobs"
              value={summary?.active ?? 0}
              caption="Running or about to start"
              captionTone="muted"
            />
            <StatCard
              label="Completed"
              value={summary?.completed ?? 0}
              caption="Finished engagements"
              captionTone="muted"
            />
          </div>

          <AppTabs
            variant="chip"
            value={tab}
            onValueChange={(value) => {
              setTab(value);
              setPage(1);
            }}
            tabs={TABS.map((entry) => ({
              value: entry.value,
              label:
                counts[entry.value] === undefined
                  ? entry.label
                  : `${entry.label} (${counts[entry.value]})`,
            }))}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            limit={LIMIT}
            isLoading={isFetching}
          >
            <div className="border-border overflow-hidden rounded-xl border bg-white">
              {isFetching && !bookings.length ? (
                <div className="space-y-3 p-4 md:p-6">
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                </div>
              ) : !bookings.length ? (
                <EmptyState
                  illustration="/empty-jobs.svg"
                  title={active.empty}
                  description={active.emptyHint}
                />
              ) : (
                <div className="divide-border divide-y">
                  {bookings.map((booking) => (
                    <JobRequestRow key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </div>
          </Pagination>
        </>
      )}
    </div>
  );
}
