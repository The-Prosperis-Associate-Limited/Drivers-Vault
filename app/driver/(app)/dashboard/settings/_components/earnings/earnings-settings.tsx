"use client";

import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Pagination } from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatDate, formatMoney } from "@/lib/utils";
import { Banknote, CircleAlert } from "lucide-react";
import { useState } from "react";
import type { WalletTransaction } from "@/types/earnings";
import { BankAccounts } from "./bank-accounts";
import { EarningsTrend } from "./earnings-trend";
import { WithdrawDialog } from "./withdraw-dialog";
import {
  useEarningsHistory,
  useEarningsSummary,
  useEarningsTrend,
} from "../../_hooks/use-earnings";

const statusTones: Record<WalletTransaction["status"], string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  AVAILABLE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PAID_OUT: "bg-gray-50 text-gray-600 border-gray-200",
  REVERSED: "bg-red-50 text-red-700 border-red-200",
};

const typeLabels: Record<WalletTransaction["type"], string> = {
  BOOKING_PAYMENT: "Payment",
  PLATFORM_FEE: "Fee",
  PAYOUT: "Withdrawal",
  PAYOUT_REVERSAL: "Reversal",
  ADJUSTMENT: "Adjustment",
};

export const EarningsSettings = function () {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { summary, isFetching } = useEarningsSummary();
  const {
    transactions,
    totalPages,
    isFetching: isFetchingHistory,
  } = useEarningsHistory({ page, limit: 10 });
  const { trend } = useEarningsTrend();

  const currency = summary?.currency ?? "NGN";

  return (
    <div className="space-y-6">
      <div className="border-border flex flex-col gap-4 rounded-xl border bg-white p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div className="space-y-1">
          <AppText type="caption" className="text-muted-foreground block">
            Total Earnings
          </AppText>

          {isFetching && !summary ? (
            <Skeleton className="h-9 w-40" />
          ) : (
            <AppText type="h2" className="text-3xl font-semibold" as="p">
              {formatMoney(summary?.total_earnings_minor, currency)}
            </AppText>
          )}

          <AppText
            type="caption"
            className="flex items-center gap-1.5 text-amber-600"
          >
            <CircleAlert className="h-3.5 w-3.5" />
            Withdrawal amount: {formatMoney(summary?.available_minor, currency)}
          </AppText>
        </div>

        <Button
          onClick={() => setWithdrawOpen(true)}
          disabled={!summary?.available_minor}
          className="bg-brand-deep hover:bg-brand-deep/90 h-12 rounded-lg px-7 text-sm"
        >
          Withdraw Funds
        </Button>
      </div>

      <div className="space-y-3">
        <AppText type="h4" className="text-base font-semibold">
          Earning History
        </AppText>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          limit={10}
          isLoading={isFetchingHistory}
        >
          <div className="border-border overflow-hidden rounded-xl border bg-white">
            {isFetchingHistory && !transactions.length ? (
              <div className="space-y-3 p-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : !transactions.length ? (
              <EmptyState
                icon={Banknote}
                title="Nothing here yet."
                description="Completed jobs and withdrawals will show up here."
              />
            ) : (
              <>
                {/* Below sm the table becomes stacked cards — a six-column table
                  on a phone is unreadable however it is scrolled. */}
                <div className="divide-border divide-y sm:hidden">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="space-y-2 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <AppText type="label">
                          {transaction.description ??
                            typeLabels[transaction.type]}
                        </AppText>
                        <AppText
                          type="label"
                          className={cn(
                            transaction.amount_minor < 0
                              ? "text-destructive"
                              : "text-emerald-600",
                          )}
                        >
                          {formatMoney(transaction.amount_minor, currency)}
                        </AppText>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <AppText
                          type="caption"
                          className="text-muted-foreground"
                        >
                          {formatDate(transaction.createdAt)}
                        </AppText>
                        <StatusBadge
                          label={transaction.status
                            .toLowerCase()
                            .replace("_", " ")}
                          className={statusTones[transaction.status]}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden overflow-x-auto sm:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Ref ID</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {formatDate(transaction.createdAt)}
                          </TableCell>
                          <TableCell>{typeLabels[transaction.type]}</TableCell>
                          <TableCell className="max-w-[220px] truncate">
                            {transaction.description ?? "—"}
                          </TableCell>
                          <TableCell>
                            {transaction.booking
                              ? [
                                  transaction.booking.client.first_name,
                                  transaction.booking.client.last_name,
                                ]
                                  .filter(Boolean)
                                  .join(" ") || "—"
                              : "—"}
                          </TableCell>
                          <TableCell>
                            <StatusBadge
                              label={transaction.status
                                .toLowerCase()
                                .replace("_", " ")}
                              className={statusTones[transaction.status]}
                            />
                          </TableCell>
                          <TableCell
                            className={cn(
                              "font-medium",
                              transaction.amount_minor < 0
                                ? "text-destructive"
                                : "text-emerald-600",
                            )}
                          >
                            {formatMoney(transaction.amount_minor, currency)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {transaction.reference}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        </Pagination>
      </div>

      <div className="space-y-3">
        <AppText type="h4" className="text-base font-semibold">
          Payout accounts
        </AppText>

        <BankAccounts />
      </div>

      <div className="space-y-3">
        <AppText type="h4" className="text-base font-semibold">
          Earning Trend
        </AppText>

        <div className="border-border rounded-xl border bg-white p-4 md:p-5">
          <EarningsTrend trend={trend} currency={currency} />
        </div>
      </div>

      <WithdrawDialog
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        availableMinor={summary?.available_minor ?? 0}
        currency={currency}
      />
    </div>
  );
};
