"use client";

import { AppAvatar } from "@/components/shared/app-avatar";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetData } from "@/hooks/use-get-data";
import { clientName, statusBadgeClass } from "@/lib/admin";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { formatDate, formatMoney } from "@/lib/utils";
import { useState } from "react";
import type { PaginatedResponse } from "@/types/response";
import type { ClientWalletRow } from "@/types/admin";

// Balance state stands in for the mockup's wallet status column — funded vs
// low balance is a threshold, not a stored flag.
const LOW_BALANCE_MINOR = 5000000;

export const WalletsTab = function () {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isFetching } = useGetData<PaginatedResponse<ClientWalletRow>>({
    url: API_ENDPOINTS.adminTransactions.wallets({
      page,
      limit: 10,
      search: debouncedSearch || undefined,
    }),
  });

  const rows = data?.data ?? [];

  const walletStatus = (row: ClientWalletRow) =>
    row.available_minor >= LOW_BALANCE_MINOR
      ? { label: "Funded", className: statusBadgeClass("APPROVED") }
      : { label: "Low Balance", className: statusBadgeClass("PENDING") };

  return (
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
          title="No client wallets yet"
          description="A wallet is created the first time a client opens theirs."
        />
      ) : (
        <>
          <div className="mt-4 hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-border border-b text-left text-xs tracking-wide uppercase">
                  <th className="py-3 pr-4 font-medium">Client</th>
                  <th className="py-3 pr-4 font-medium">Available balance</th>
                  <th className="py-3 pr-4 font-medium">In escrow</th>
                  <th className="py-3 pr-4 font-medium">Last top-up</th>
                  <th className="py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {rows.map((row) => {
                  const status = walletStatus(row);
                  return (
                    <tr key={row.id}>
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-3">
                          <AppAvatar
                            src={row.user.profile_pic ?? undefined}
                            fallback={clientName(row.user)}
                            className="h-9 w-9"
                          />
                          <span className="min-w-0">
                            <span className="block font-medium">
                              {clientName(row.user)}
                            </span>
                            <span className="text-muted-foreground block truncate text-xs">
                              {row.user.email}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-semibold">
                        {formatMoney(row.available_minor, row.currency)}
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {formatMoney(row.pending_minor, row.currency)}
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {row.last_top_up
                          ? `${formatMoney(row.last_top_up.amount_minor, row.currency)} · ${formatDate(row.last_top_up.createdAt)}`
                          : "Never"}
                      </td>
                      <td className="py-3">
                        <StatusBadge
                          label={status.label}
                          className={status.className}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-3 md:hidden">
            {rows.map((row) => {
              const status = walletStatus(row);
              return (
                <div
                  key={row.id}
                  className="border-border rounded-xl border p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">
                      {clientName(row.user)}
                    </span>
                    <StatusBadge
                      label={status.label}
                      className={status.className}
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold">
                    {formatMoney(row.available_minor, row.currency)}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Escrow {formatMoney(row.pending_minor, row.currency)} · last
                    top-up{" "}
                    {row.last_top_up
                      ? formatDate(row.last_top_up.createdAt)
                      : "never"}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Pagination>
  );
};
