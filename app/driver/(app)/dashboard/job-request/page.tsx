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
  The bucket names only — the server owns which statuses each one covers, so a
  request cannot be counted under one tab and listed under another.
*/
const TABS: {
  value: JobRequestBucket;
  label: string;
  empty: string;
  emptyHint: string;
}[] = [
  {
    value: "open",
    label: "Open",
    empty: "Nothing is waiting on you right now",
    emptyHint: "New requests land here as soon as a client sends one.",
  },
  {
    value: "accepted",
    label: "Accepted",
    empty: "You have not Accepted any Job Yet",
    emptyHint:
      "Jobs you take on stay here while they run and after they finish.",
  },
  {
    value: "declined",
    label: "Declined",
    empty: "You have not Declined any Job Yet",
    emptyHint: "Requests you turn down are kept here for your records.",
  },
];

const LIMIT = 10;

export default function JobRequests() {
  const [tab, setTab] = useState<JobRequestBucket>("open");
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
    open: summary?.open,
    accepted: summary?.accepted,
    declined: summary?.declined,
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHeader
        title="Job requests"
        subtitle="Clients who matched your verified profile have sent these requests. Open one to see the full brief before responding."
      />

      {profile && !isVerified ? (
        <UnverifiedNotice status={status ?? "UNSUBMITTED"} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              label="Open requests"
              value={summary?.open ?? 0}
              caption="Awaiting your response"
              captionTone="muted"
            />
            <StatCard
              label="Accepted"
              value={summary?.accepted ?? 0}
              caption="Client notified"
              captionTone="muted"
            />
            <StatCard
              label="Response rate"
              value={
                summary?.response_rate == null
                  ? "—"
                  : `${summary.response_rate}%`
              }
              hint="How many closed requests you answered, accepted or declined. A request that expires before you reply counts against it."
              caption="Fast replies rank you higher"
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
