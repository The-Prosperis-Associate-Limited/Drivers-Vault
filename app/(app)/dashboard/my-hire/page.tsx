"use client";

import { AppTabs } from "@/components/shared/app-tabs";
import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { HireRow } from "@/components/hires/hire-row";
import { HireRequestRow } from "@/components/hires/hire-request-row";
import { Pagination } from "@/components/shared/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { BriefcaseBusiness, FileClock } from "lucide-react";
import { useState } from "react";
import type { PaginatedResponse } from "@/types/response";
import type { HireRequest } from "@/types/hire";
import { useHires } from "./_hooks/use-hires";

type Tab = "hires" | "requests";

const TABS: { value: Tab; label: string }[] = [
  { value: "hires", label: "Active hires" },
  { value: "requests", label: "Hire requests" },
];

export default function MyHire() {
  const [tab, setTab] = useState<Tab>("hires");
  const [page, setPage] = useState(1);
  const [requestsPage, setRequestsPage] = useState(1);

  const { hires, total, totalPages, isFetching } = useHires({ page });

  const { data: requestsData, isFetching: isFetchingRequests } = useGetData<
    PaginatedResponse<HireRequest>
  >({
    url: API_ENDPOINTS.hireRequests.list({ page: requestsPage, limit: 10 }),
    shouldFetch: tab === "requests",
  });

  const requests = requestsData?.data ?? [];

  return (
    <div className="mx-auto max-w-5xl">
      <AppText type="h2" className="text-xl font-bold md:text-2xl">
        My Hire
      </AppText>
      <AppText type="subtitle" className="text-muted-foreground mt-1 text-sm">
        Keep track of the drivers and staff you've brought on board.
      </AppText>

      <div className="border-border mt-5 border-t" />

      <AppTabs
        variant="pill"
        tabs={TABS}
        value={tab}
        onValueChange={(value) => setTab(value as Tab)}
        className="mt-6"
      />

      {tab === "hires" ? (
        <div className="border-border mt-4 rounded-2xl border bg-white p-5 md:p-6">
          <AppText type="h3" className="text-base font-semibold">
            Your hired staff
          </AppText>

          {isFetching && !hires.length ? (
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : hires.length === 0 ? (
            <EmptyState
              icon={BriefcaseBusiness}
              title="No active hires yet"
              description="Drivers you hire on a monthly engagement will appear here."
              className="mt-4"
            />
          ) : (
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              onPageChange={setPage}
              isLoading={isFetching}
            >
              <div className="divide-y">
                {hires.map((hire) => (
                  <HireRow key={hire.id} hire={hire} />
                ))}
              </div>
            </Pagination>
          )}
        </div>
      ) : (
        <div className="border-border mt-4 rounded-2xl border bg-white p-5 md:p-6">
          <AppText type="h3" className="text-base font-semibold">
            Your hire requests
          </AppText>
          <AppText
            type="caption"
            className="text-muted-foreground mt-1 block text-xs"
          >
            Each request is reviewed by our team, invoiced, and unlocked once
            paid.
          </AppText>

          {isFetchingRequests && !requests.length ? (
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <EmptyState
              icon={FileClock}
              title="No hire requests yet"
              description="Request a driver from the marketplace and track it here."
              className="mt-4"
            />
          ) : (
            <Pagination
              page={requestsPage}
              totalPages={requestsData?.totalPages ?? 1}
              total={requestsData?.total ?? 0}
              onPageChange={setRequestsPage}
              isLoading={isFetchingRequests}
            >
              <div className="divide-y">
                {requests.map((request) => (
                  <HireRequestRow key={request.id} request={request} />
                ))}
              </div>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
}
