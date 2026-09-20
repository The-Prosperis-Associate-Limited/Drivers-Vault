"use client";

import { AppSimpleSelect } from "@/components/shared/app-simple-select";
import { AppText } from "@/components/shared/app-text";
import { AppAvatar } from "@/components/shared/app-avatar";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetData } from "@/hooks/use-get-data";
import { personName, statusBadgeClass, statusLabel } from "@/lib/admin";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { driverTypeLabel, formatDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import type { PaginatedResponse } from "@/types/response";
import type { VerificationQueueRow } from "@/types/admin";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export const VerificationQueue = function () {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("PENDING");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isFetching } = useGetData<
    PaginatedResponse<VerificationQueueRow>
  >({
    url: API_ENDPOINTS.adminVerifications.queue({
      page,
      limit: 10,
      status,
      search: debouncedSearch || undefined,
    }),
  });

  const rows = data?.data ?? [];

  const documentsSummary = (row: VerificationQueueRow) => {
    const documents = row.user.documents ?? [];
    const approved = documents.filter(
      (document) => document.status === "APPROVED",
    ).length;
    return documents.length ? `${approved}/${documents.length} verified` : "—";
  };

  return (
    <div className="border-border rounded-2xl border bg-white p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AppText
          type="label"
          className="text-foreground font-semibold tracking-wide uppercase"
        >
          Verification queue
        </AppText>

        <AppSimpleSelect
          options={STATUS_OPTIONS}
          value={status}
          onValueChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          containerClassName="w-[140px]"
        />
      </div>

      <Pagination
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
        total={data?.total}
        isLoading={isFetching}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        searchPlaceholder="Search applicants..."
      >
        {!rows.length ? (
          <EmptyState
            title="Nothing in the queue"
            description="Submissions land here the moment a driver completes onboarding."
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="mt-4 hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-border border-b text-left text-xs tracking-wide uppercase">
                    <th className="py-3 pr-4 font-medium">Applicant</th>
                    <th className="py-3 pr-4 font-medium">Role</th>
                    <th className="py-3 pr-4 font-medium">Date applied</th>
                    <th className="py-3 pr-4 font-medium">Documents</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-3">
                          <AppAvatar
                            src={row.user.profile_pic ?? undefined}
                            fallback={personName(row.user)}
                            className="h-9 w-9"
                          />
                          <span className="font-medium">
                            {personName(row.user)}
                          </span>
                        </span>
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {driverTypeLabel(row.user.driver_profile?.driver_type)}
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {row.submitted_at ? formatDate(row.submitted_at) : "—"}
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {documentsSummary(row)}
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge
                          label={statusLabel(row.status)}
                          className={statusBadgeClass(row.status)}
                        />
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={`/admin/dashboard/drivers/${row.userId}?tab=documents`}
                          className="text-brand text-sm font-semibold hover:underline"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stacked cards below md */}
            <div className="mt-4 space-y-3 md:hidden">
              {rows.map((row) => (
                <div
                  key={row.id}
                  className="border-border rounded-xl border p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <AppAvatar
                        src={row.user.profile_pic ?? undefined}
                        fallback={personName(row.user)}
                        className="h-9 w-9"
                      />
                      <span className="text-sm font-medium">
                        {personName(row.user)}
                      </span>
                    </span>
                    <StatusBadge
                      label={statusLabel(row.status)}
                      className={statusBadgeClass(row.status)}
                    />
                  </div>

                  <div className="text-muted-foreground mt-3 space-y-1 text-xs">
                    <p>
                      {driverTypeLabel(row.user.driver_profile?.driver_type)}
                    </p>
                    <p>
                      Applied{" "}
                      {row.submitted_at ? formatDate(row.submitted_at) : "—"} ·{" "}
                      {documentsSummary(row)}
                    </p>
                  </div>

                  <Link
                    href={`/admin/dashboard/drivers/${row.userId}?tab=documents`}
                    className="text-brand mt-3 inline-block text-sm font-semibold hover:underline"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </Pagination>
    </div>
  );
};
