"use client";

import { AppAvatar } from "@/components/shared/app-avatar";
import { AppDialog } from "@/components/shared/app-dialog";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetData } from "@/hooks/use-get-data";
import {
  clientName,
  downloadCsv,
  personName,
  statusBadgeClass,
  statusLabel,
} from "@/lib/admin";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { formatDate, formatMoney } from "@/lib/utils";
import { useState } from "react";
import type { PaginatedResponse } from "@/types/response";
import type { ServiceFeeRow } from "@/types/admin";
import { DetailRow } from "../../../_components/detail-card";

export const ServiceFeesTab = function () {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<ServiceFeeRow | null>(null);
  const debouncedSearch = useDebounce(search, 400);

  const { data, isFetching } = useGetData<PaginatedResponse<ServiceFeeRow>>({
    url: API_ENDPOINTS.adminTransactions.serviceFees({
      page,
      limit: 10,
      search: debouncedSearch || undefined,
    }),
  });

  const rows = data?.data ?? [];

  const downloadReceipt = (row: ServiceFeeRow) =>
    downloadCsv(
      `${row.reference}.csv`,
      ["Reference", "Driver", "Client", "Hire amount", "Service fee", "Date"],
      [
        [
          row.reference,
          row.booking?.driver ? personName(row.booking.driver) : "—",
          row.booking ? clientName(row.booking.client) : "—",
          row.booking
            ? formatMoney(row.booking.amount, row.booking.currency)
            : "—",
          formatMoney(row.amount_minor, row.currency),
          formatDate(row.createdAt),
        ],
      ],
    );

  return (
    <>
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
        searchPlaceholder="Search by reference..."
      >
        {!rows.length ? (
          <EmptyState
            title="No service fees yet"
            description="The platform's commission on each hire is recorded here."
          />
        ) : (
          <>
            <div className="mt-4 hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-border border-b text-left text-xs tracking-wide uppercase">
                    <th className="py-3 pr-4 font-medium">Fee ref</th>
                    <th className="py-3 pr-4 font-medium">Driver</th>
                    <th className="py-3 pr-4 font-medium">Client</th>
                    <th className="py-3 pr-4 font-medium">Hire amount</th>
                    <th className="py-3 pr-4 font-medium">Service fee</th>
                    <th className="py-3 pr-4 font-medium">Date</th>
                    <th className="py-3 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="max-w-[160px] truncate py-3 pr-4 font-medium">
                        {row.reference}
                      </td>
                      <td className="py-3 pr-4">
                        {row.booking?.driver
                          ? personName(row.booking.driver)
                          : "—"}
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {row.booking ? clientName(row.booking.client) : "—"}
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {row.booking
                          ? formatMoney(
                              row.booking.amount,
                              row.booking.currency,
                            )
                          : "—"}
                      </td>
                      <td className="py-3 pr-4 font-semibold">
                        {formatMoney(row.amount_minor, row.currency)}
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {formatDate(row.createdAt)}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setViewing(row)}
                          className="text-brand cursor-pointer text-sm font-semibold hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3 md:hidden">
              {rows.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => setViewing(row)}
                  className="border-border block w-full cursor-pointer rounded-xl border p-4 text-left"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-medium">
                      {row.reference}
                    </span>
                    <span className="text-sm font-semibold">
                      {formatMoney(row.amount_minor, row.currency)}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {row.booking?.driver ? personName(row.booking.driver) : "—"}{" "}
                    hired by{" "}
                    {row.booking ? clientName(row.booking.client) : "—"} ·{" "}
                    {formatDate(row.createdAt)}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}
      </Pagination>

      <AppDialog
        isOpen={!!viewing}
        onOpenChange={(open) => !open && setViewing(null)}
        title={viewing ? `Service fee ${viewing.reference}` : "Service fee"}
        description={
          viewing
            ? `Commission earned on this hire — ${formatDate(viewing.createdAt)}`
            : undefined
        }
        width="480px"
        dialogFooter={
          viewing && (
            <div className="flex w-full justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => downloadReceipt(viewing)}
              >
                Download receipt
              </Button>
              <Button onClick={() => setViewing(null)}>Done</Button>
            </div>
          )
        }
      >
        {viewing && (
          <div className="space-y-4">
            {viewing.booking?.driver && (
              <div className="border-border flex items-center justify-between gap-3 rounded-xl border p-3">
                <span className="flex items-center gap-3">
                  <AppAvatar
                    src={viewing.booking.driver.profile_pic ?? undefined}
                    fallback={personName(viewing.booking.driver)}
                    className="h-10 w-10"
                  />
                  <span>
                    <AppText type="caption" className="block font-semibold">
                      {personName(viewing.booking.driver)}
                    </AppText>
                    <AppText
                      type="caption"
                      className="text-muted-foreground block"
                    >
                      hired by {clientName(viewing.booking.client)}
                    </AppText>
                  </span>
                </span>
                <StatusBadge
                  label={statusLabel(viewing.status)}
                  className={statusBadgeClass(viewing.status)}
                />
              </div>
            )}

            <div className="divide-border divide-y">
              <DetailRow
                label="Hire amount (monthly)"
                value={
                  viewing.booking
                    ? formatMoney(
                        viewing.booking.amount,
                        viewing.booking.currency,
                      )
                    : "—"
                }
              />
              <DetailRow
                label="Company service fee"
                value={formatMoney(viewing.amount_minor, viewing.currency)}
              />
              <DetailRow
                label="Driver payout"
                value={
                  viewing.booking
                    ? formatMoney(
                        viewing.booking.amount,
                        viewing.booking.currency,
                      )
                    : "—"
                }
              />
            </div>
          </div>
        )}
      </AppDialog>
    </>
  );
};
