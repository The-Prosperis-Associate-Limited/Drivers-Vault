"use client";

import { AppSimpleSelect } from "@/components/shared/app-simple-select";
import { AppText } from "@/components/shared/app-text";
import { AppAvatar } from "@/components/shared/app-avatar";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { TrustRing } from "@/components/drivers/trust-ring";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetData } from "@/hooks/use-get-data";
import {
  downloadCsv,
  personName,
  statusBadgeClass,
  statusLabel,
} from "@/lib/admin";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { driverTypeLabel, formatDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import type { APIResponse, PaginatedResponse } from "@/types/response";
import type { AdminDriverStats, AdminUserRow } from "@/types/admin";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Statuses" },
  { value: "ACTIVE", label: "Active" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "DEACTIVATED", label: "Deactivated" },
];

export default function AdminDrivers() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: statsData } = useGetData<APIResponse<AdminDriverStats>>({
    url: API_ENDPOINTS.adminUsers.stats("DRIVER"),
  });

  const { data, isFetching } = useGetData<PaginatedResponse<AdminUserRow>>({
    url: API_ENDPOINTS.adminUsers.list({
      page,
      limit: 10,
      role: "DRIVER",
      status: status === "ALL" ? undefined : status,
      search: debouncedSearch || undefined,
    }),
  });

  const stats = statsData?.data;
  const rows = data?.data ?? [];

  const exportRows = (format: string) => {
    if (format !== "csv") return window.print();

    downloadCsv(
      "drivers.csv",
      ["Name", "Email", "Role", "Date applied", "Trust score", "Status"],
      rows.map((row) => [
        personName(row),
        row.email,
        driverTypeLabel(row.driver_profile?.driver_type),
        formatDate(row.createdAt),
        row.driver_profile?.trust_score ?? 0,
        row.driver_profile?.verification_status ?? "UNSUBMITTED",
      ]),
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          Drivers
        </AppText>
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          Applicants and active drivers. Open a profile to review documents and
          verification.
        </AppText>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard
          label="All drivers"
          value={stats ? String(stats.total) : "—"}
          caption="Every driver account"
          captionTone="muted"
        />
        <StatCard
          label="Active drivers"
          value={stats ? String(stats.active) : "—"}
          caption="Verified and discoverable"
          captionTone="muted"
        />
        <StatCard
          label="Pending approval"
          value={stats ? String(stats.pending_approval) : "—"}
          caption={
            stats && stats.pending_approval > 0
              ? "Awaiting review"
              : "All clear"
          }
          captionTone={
            stats && stats.pending_approval > 0 ? "warning" : "muted"
          }
        />
      </div>

      <div className="border-border rounded-2xl border bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-end gap-3">
          <AppSimpleSelect
            options={STATUS_OPTIONS}
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
            containerClassName="w-[150px]"
          />
          <AppSimpleSelect
            placeholder="EXPORT AS"
            options={[
              { value: "pdf", label: "PDF" },
              { value: "csv", label: "CSV" },
            ]}
            onValueChange={exportRows}
            containerClassName="w-[130px]"
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
          searchPlaceholder="Search drivers..."
        >
          {!rows.length ? (
            <EmptyState
              title="No drivers found"
              description="Try a different search or status filter."
            />
          ) : (
            <>
              <div className="mt-4 hidden overflow-x-auto md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-border border-b text-left text-xs tracking-wide uppercase">
                      <th className="py-3 pr-4 font-medium">Applicant</th>
                      <th className="py-3 pr-4 font-medium">Role</th>
                      <th className="py-3 pr-4 font-medium">Date applied</th>
                      <th className="py-3 pr-4 font-medium">Trustscore</th>
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
                              src={row.profile_pic ?? undefined}
                              fallback={personName(row)}
                              className="h-9 w-9"
                            />
                            <span className="min-w-0">
                              <span className="block font-medium">
                                {personName(row)}
                              </span>
                              <span className="text-muted-foreground block truncate text-xs">
                                {row.email}
                              </span>
                            </span>
                          </span>
                        </td>
                        <td className="text-muted-foreground py-3 pr-4">
                          {driverTypeLabel(row.driver_profile?.driver_type)}
                        </td>
                        <td className="text-muted-foreground py-3 pr-4">
                          {formatDate(row.createdAt)}
                        </td>
                        <td className="py-3 pr-4">
                          <TrustRing
                            score={row.driver_profile?.trust_score ?? 0}
                            size={36}
                          />
                        </td>
                        <td className="py-3 pr-4">
                          <StatusBadge
                            label={statusLabel(
                              row.driver_profile?.verification_status ??
                                "UNSUBMITTED",
                            )}
                            className={statusBadgeClass(
                              row.driver_profile?.verification_status ??
                                "UNSUBMITTED",
                            )}
                          />
                        </td>
                        <td className="py-3 text-right">
                          <Link
                            href={`/admin/dashboard/drivers/${row.id}`}
                            className="text-brand text-sm font-semibold hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-3 md:hidden">
                {rows.map((row) => (
                  <Link
                    key={row.id}
                    href={`/admin/dashboard/drivers/${row.id}`}
                    className="border-border block rounded-xl border p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-3">
                        <AppAvatar
                          src={row.profile_pic ?? undefined}
                          fallback={personName(row)}
                          className="h-9 w-9"
                        />
                        <span className="text-sm font-medium">
                          {personName(row)}
                        </span>
                      </span>
                      <StatusBadge
                        label={statusLabel(
                          row.driver_profile?.verification_status ??
                            "UNSUBMITTED",
                        )}
                        className={statusBadgeClass(
                          row.driver_profile?.verification_status ??
                            "UNSUBMITTED",
                        )}
                      />
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs">
                      {driverTypeLabel(row.driver_profile?.driver_type)} ·
                      joined {formatDate(row.createdAt)} · trust{" "}
                      {row.driver_profile?.trust_score ?? 0}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </Pagination>
      </div>
    </div>
  );
}
