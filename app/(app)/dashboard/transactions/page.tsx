"use client";

import { AppSimpleSelect } from "@/components/shared/app-simple-select";
import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { StatCard } from "@/components/shared/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { cn, formatDate, formatMoney } from "@/lib/utils";
import { ReceiptText } from "lucide-react";
import { useState } from "react";
import type { APIResponse } from "@/types/response";
import type { WalletSummary, WalletTransaction } from "@/types/wallet";
import { useWalletTransactions } from "../wallet/_hooks/use-wallet";
import { ReceiptDialog } from "./_components/receipt-dialog";

const PAGE_SIZE = 10;

const staffName = (transaction: WalletTransaction) =>
  [
    transaction.booking?.driver?.first_name,
    transaction.booking?.driver?.last_name,
  ]
    .filter(Boolean)
    .join(" ") || "—";

// A payment leg is settled the moment it is written, so PAID_OUT is the only
// status a charge can carry today; PENDING covers whatever a future scheduler adds.
const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  PAID_OUT: { label: "Paid", className: "bg-emerald-50 text-emerald-700" },
  AVAILABLE: { label: "Paid", className: "bg-emerald-50 text-emerald-700" },
  PENDING: {
    label: "Processing",
    className: "bg-amber-50 text-amber-600 uppercase",
  },
  REVERSED: { label: "Reversed", className: "bg-gray-100 text-gray-600" },
};

export default function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<WalletTransaction | null>(null);

  const { data: summaryData } = useGetData<APIResponse<WalletSummary>>({
    url: API_ENDPOINTS.wallet.summary,
  });

  const summary = summaryData?.data;

  const { transactions, total, totalPages, isFetching } = useWalletTransactions(
    { page, limit: PAGE_SIZE, type: "BOOKING_CHARGE" },
  );

  const exportRows = () =>
    transactions.map((transaction) => ({
      reference: transaction.reference,
      staff: staffName(transaction),
      date: formatDate(transaction.createdAt),
      amount: formatMoney(
        Math.abs(transaction.amount_minor),
        transaction.currency,
      ),
      status: STATUS_STYLES[transaction.status]?.label ?? transaction.status,
    }));

  const exportAs = (format: string) => {
    if (format === "pdf") return window.print();

    const rows = exportRows();
    const header = "Reference,Staff,Date,Amount,Status";
    const csv = [
      header,
      ...rows.map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(","),
      ),
    ].join("\n");

    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "tegat-payments.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const cards = [
    {
      label: "Total paid to date",
      value: formatMoney(summary?.total_paid_minor ?? 0, summary?.currency),
      caption: "Across all payments",
    },
    {
      label: "Pending this cycle",
      value: formatMoney(summary?.pending_cycle_minor ?? 0, summary?.currency),
      caption: summary
        ? `Scheduled for ${formatDate(summary.cycle_ends_at)}`
        : undefined,
    },
    {
      label: "Monthly commitment",
      value: formatMoney(
        summary?.monthly_commitment_minor ?? 0,
        summary?.currency,
      ),
      caption: "Across active hires",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <AppText type="h2" className="text-xl font-bold md:text-2xl">
        My Transaction
      </AppText>
      <AppText type="subtitle" className="text-muted-foreground mt-1 text-sm">
        A record of your payments and billing history.
      </AppText>

      <div className="border-border mt-5 border-t" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) =>
          summary ? (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              caption={card.caption}
              captionTone="muted"
            />
          ) : (
            <Skeleton key={card.label} className="h-[110px] rounded-xl" />
          ),
        )}
      </div>

      <div
        className="border-border mt-6 rounded-2xl border bg-white"
        data-print-transactions
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <AppText
            type="label"
            className="text-sm font-semibold tracking-wide uppercase"
          >
            Payment history
          </AppText>

          <AppSimpleSelect
            options={[
              { value: "pdf", label: "PDF" },
              { value: "csv", label: "CSV" },
            ]}
            value=""
            onValueChange={exportAs}
            placeholder="Export as"
            className="w-32"
          />
        </div>

        {isFetching && !transactions.length ? (
          <div className="space-y-3 px-5 pb-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 rounded-lg" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState
            icon={ReceiptText}
            title="No payments yet"
            description="Payments to your hired drivers will appear here."
            className="pb-10"
          />
        ) : (
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            onPageChange={setPage}
            isLoading={isFetching}
            className="px-5 pb-5"
          >
            {/* A five-column table is unreadable on a phone — rows become cards below md. */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-muted-foreground text-left text-xs tracking-wide uppercase">
                    <th className="px-5 py-3 font-medium">Reference</th>
                    <th className="px-5 py-3 font-medium">Staff</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => {
                    const status = STATUS_STYLES[transaction.status];

                    return (
                      <tr
                        key={transaction.id}
                        onClick={() => setSelected(transaction)}
                        className="border-border hover:bg-muted/30 cursor-pointer border-b last:border-0"
                      >
                        <td className="px-5 py-4">{transaction.reference}</td>
                        <td className="px-5 py-4">{staffName(transaction)}</td>
                        <td className="text-muted-foreground px-5 py-4">
                          {formatDate(transaction.createdAt)}
                        </td>
                        <td className="px-5 py-4 font-medium">
                          {formatMoney(
                            Math.abs(transaction.amount_minor),
                            transaction.currency,
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-xs font-medium",
                              status?.className,
                            )}
                          >
                            {status?.label ?? transaction.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 px-4 pb-2 md:hidden">
              {transactions.map((transaction) => {
                const status = STATUS_STYLES[transaction.status];

                return (
                  <div
                    key={transaction.id}
                    onClick={() => setSelected(transaction)}
                    className="border-border cursor-pointer rounded-xl border p-4"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <AppText type="label" className="text-sm">
                        {staffName(transaction)}
                      </AppText>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          status?.className,
                        )}
                      >
                        {status?.label ?? transaction.status}
                      </span>
                    </span>
                    <AppText
                      type="caption"
                      className="text-muted-foreground mt-1 block"
                    >
                      {transaction.reference} ·{" "}
                      {formatDate(transaction.createdAt)}
                    </AppText>
                    <AppText type="label" className="mt-2 block text-base">
                      {formatMoney(
                        Math.abs(transaction.amount_minor),
                        transaction.currency,
                      )}
                    </AppText>
                  </div>
                );
              })}
            </div>
          </Pagination>
        )}
      </div>

      <ReceiptDialog
        transaction={selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  );
}
