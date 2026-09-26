"use client";

import { AppSimpleSelect } from "@/components/shared/app-simple-select";
import { AppText } from "@/components/shared/app-text";
import { AppAvatar } from "@/components/shared/app-avatar";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetData } from "@/hooks/use-get-data";
import {
  clientName,
  downloadCsv,
  statusBadgeClass,
  statusLabel,
} from "@/lib/admin";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import type { APIResponse, PaginatedResponse } from "@/types/response";
import type { AdminClientStats, AdminUserRow } from "@/types/admin";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Statuses" },
  { value: "ACTIVE", label: "Active" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "DEACTIVATED", label: "Deactivated" },
];

export default function AdminClients() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: statsData } = useGetData<APIResponse<AdminClientStats>>({
    url: API_ENDPOINTS.adminUsers.stats("CLIENT"),
  });

  const { data, isFetching } = useGetData<PaginatedResponse<AdminUserRow>>({
    url: API_ENDPOINTS.adminUsers.list({
      page,
      limit: 10,
      role: "CLIENT",
      status: status === "ALL" ? undefined : status,
      search: debouncedSearch || undefined,
    }),
  });

  const stats = statsData?.data;
  const rows = data?.data ?? [];

  const exportRows = (format: string) => {
    if (format !== "csv") return window.print();

    downloadCsv(
      "clients.csv",
      ["Client", "Type", "Contact", "Registered", "Status"],
      rows.map((row) => [
        clientName(row),
        row.client_profile?.client_type === "ORGANISATION"
          ? "Organization"
          : "Individual",
        row.email,
        formatDate(row.createdAt),
        row.account_status,
      ]),
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          Clients
        </AppText>
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          Individual and organization clients hiring drivers on Drivers Vault.
        </AppText>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard
          label="All clients"
          value={stats ? String(stats.total) : "—"}
          caption={stats ? `${stats.organisations} organizations` : " "}
          captionTone="muted"
        />
        <StatCard
          label="Active clients"
          value={stats ? String(stats.active) : "—"}
          caption="Accounts in good standing"
          captionTone="muted"
        />
        <StatCard
          label="Suspended"
          value={stats ? String(stats.suspended) : "—"}
          caption={
            stats && stats.suspended > 0 ? "Access revoked" : "All clear"
          }
          captionTone={stats && stats.suspended > 0 ? "warning" : "muted"}
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
          searchPlaceholder="Search clients..."
        >
          {!rows.length ? (
            <EmptyState
              title="No clients found"
              description="Try a different search or status filter."
            />
          ) : (
            <>
              <div className="mt-4 hidden overflow-x-auto md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-border border-b text-left text-xs tracking-wide uppercase">
                      <th className="py-3 pr-4 font-medium">Client</th>
                      <th className="py-3 pr-4 font-medium">Type</th>
                      <th className="py-3 pr-4 font-medium">Contact</th>
                      <th className="py-3 pr-4 font-medium">Registered</th>
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
                              fallback={clientName(row)}
                              className="h-9 w-9"
                            />
                            <span className="font-medium">
                              {clientName(row)}
                            </span>
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <StatusBadge
                            label={
                              row.client_profile?.client_type === "ORGANISATION"
                                ? "Organization"
                                : "Individual"
                            }
                            className={
                              row.client_profile?.client_type === "ORGANISATION"
                                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                                : "border-slate-200 bg-slate-50 text-slate-600"
                            }
                          />
                        </td>
                        <td className="text-muted-foreground py-3 pr-4">
                          {row.email}
                        </td>
                        <td className="text-muted-foreground py-3 pr-4">
                          {formatDate(row.createdAt)}
                        </td>
                        <td className="py-3 pr-4">
                          <StatusBadge
                            label={statusLabel(row.account_status)}
                            className={statusBadgeClass(row.account_status)}
                          />
                        </td>
                        <td className="py-3 text-right">
                          <Link
                            href={`/admin/dashboard/clients/${row.id}`}
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
                    href={`/admin/dashboard/clients/${row.id}`}
                    className="border-border block rounded-xl border p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-3">
                        <AppAvatar
                          src={row.profile_pic ?? undefined}
                          fallback={clientName(row)}
                          className="h-9 w-9"
                        />
                        <span className="text-sm font-medium">
                          {clientName(row)}
                        </span>
                      </span>
                      <StatusBadge
                        label={statusLabel(row.account_status)}
                        className={statusBadgeClass(row.account_status)}
                      />
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs">
                      {row.client_profile?.client_type === "ORGANISATION"
                        ? "Organization"
                        : "Individual"}{" "}
                      · {row.email} · joined {formatDate(row.createdAt)}
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
