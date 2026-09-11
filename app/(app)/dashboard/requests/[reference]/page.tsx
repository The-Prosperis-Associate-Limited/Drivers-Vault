"use client";

import { TalentCard } from "@/components/drivers/talent-card";
import { AppText } from "@/components/shared/app-text";
import { BackLink } from "@/components/shared/back-link";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  cn,
  driverTypeLabel,
  formatMoney,
  getInitials,
  HIRE_ENGAGEMENT_LABELS,
} from "@/lib/utils";
import { SearchX } from "lucide-react";
import { use, useState } from "react";
import type { DriverSearchResult } from "@/types/driver";
import type { APIResponse } from "@/types/response";
import type { RequestApplicant, StaffingRequest } from "@/types/request";

const PAGE_SIZE = 6;

interface MatchesPayload {
  request: StaffingRequest;
  applicants: RequestApplicant[];
  matched: {
    data: DriverSearchResult[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export default function RequestMatches({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = use(params);
  const [page, setPage] = useState(1);

  const { data, isFetching } = useGetData<APIResponse<MatchesPayload>>({
    url: API_ENDPOINTS.requests.matches(reference, {
      page,
      limit: PAGE_SIZE,
    }),
  });

  const payload = data?.data;
  const request = payload?.request;
  const applicants = payload?.applicants ?? [];
  const matched = payload?.matched;

  return (
    <div className="mx-auto max-w-6xl">
      <BackLink href="/dashboard/requests" label="Back to requests" />

      {!request ? (
        <div className="mt-4 space-y-4">
          {isFetching && (
            <>
              <Skeleton className="h-20 rounded-2xl" />
              <Skeleton className="h-[420px] rounded-2xl" />
            </>
          )}
        </div>
      ) : (
        <>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <AppText type="h2" className="text-xl font-bold md:text-2xl">
                {request.title}
              </AppText>
              <AppText
                type="caption"
                className="text-muted-foreground mt-1 block text-sm"
              >
                {[
                  [request.city, request.state].filter(Boolean).join(", "),
                  HIRE_ENGAGEMENT_LABELS[request.engagement_type],
                  `${formatMoney(request.budget, request.currency)} / month`,
                ].join(" · ")}
              </AppText>
            </div>
            <span
              className={cn(
                "shrink-0 self-start rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide uppercase",
                request.status === "OPEN"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {request.status === "OPEN" ? "Open" : "Closed"}
            </span>
          </div>

          <section className="mt-8">
            <AppText type="h3" className="text-base font-bold">
              Applicants ({applicants.length})
            </AppText>

            {applicants.length === 0 ? (
              <AppText
                type="caption"
                className="text-muted-foreground mt-2 block text-sm"
              >
                No applicants yet — drivers who apply will appear here.
              </AppText>
            ) : (
              <div className="border-border mt-3 divide-y rounded-2xl border bg-white px-5">
                {applicants.map((applicant) => {
                  const name =
                    [applicant.driver.first_name, applicant.driver.last_name]
                      .filter(Boolean)
                      .join(" ") || "Driver";

                  const profile = applicant.driver.driver_profile;

                  return (
                    <div
                      key={applicant.id}
                      className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarImage
                            src={applicant.driver.profile_pic ?? undefined}
                            alt=""
                          />
                          <AvatarFallback>
                            {getInitials(
                              applicant.driver.first_name,
                              applicant.driver.last_name,
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <span className="flex items-center gap-2">
                            <AppText
                              type="label"
                              className="truncate text-sm font-semibold"
                            >
                              {name}
                            </AppText>
                            {applicant.status === "SHORTLISTED" && (
                              <span className="bg-brand-soft text-brand rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                                Shortlisted
                              </span>
                            )}
                          </span>
                          <AppText
                            type="caption"
                            className="text-muted-foreground mt-0.5 block truncate text-xs"
                          >
                            {[
                              driverTypeLabel(profile?.driver_type),
                              [
                                applicant.driver.city,
                                applicant.driver.state_of_residence,
                              ]
                                .filter(Boolean)
                                .join(", "),
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </AppText>
                        </div>
                      </div>
                      <AppText
                        type="label"
                        className="shrink-0 pl-13 text-sm font-semibold sm:pl-0"
                      >
                        {profile?.expected_monthly_rate
                          ? `${formatMoney(profile.expected_monthly_rate)} / month`
                          : "Rate not set"}
                      </AppText>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="mt-8">
            <AppText type="h3" className="text-base font-bold">
              Matched drivers
            </AppText>
            <AppText
              type="caption"
              className="text-muted-foreground mt-1 block text-sm"
            >
              Verified drivers who fit this request&apos;s category, location
              and budget.
            </AppText>

            {isFetching && !matched?.data.length ? (
              <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-[230px] rounded-2xl" />
                ))}
              </div>
            ) : !matched?.data.length ? (
              <EmptyState
                icon={SearchX}
                title="No matches yet"
                description="No verified driver fits these criteria right now — new drivers are verified every week."
                className="mt-6"
              />
            ) : (
              <Pagination
                page={page}
                totalPages={matched.totalPages}
                total={matched.total}
                onPageChange={setPage}
                isLoading={isFetching}
                className="mt-4"
              >
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {matched.data.map((driver) => (
                    <TalentCard key={driver.id} driver={driver} />
                  ))}
                </div>
              </Pagination>
            )}
          </section>
        </>
      )}
    </div>
  );
}
