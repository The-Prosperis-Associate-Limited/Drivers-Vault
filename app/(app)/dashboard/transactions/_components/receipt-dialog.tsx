"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { cn, driverTypeLabel, formatDate, formatMoney } from "@/lib/utils";
import type { WalletTransaction } from "@/types/wallet";

interface Props {
  transaction: WalletTransaction | null;
  onOpenChange: (open: boolean) => void;
}

const STATUS_PILL: Record<string, { label: string; className: string }> = {
  PAID_OUT: { label: "PAID", className: "bg-emerald-50 text-emerald-600" },
  AVAILABLE: { label: "PAID", className: "bg-emerald-50 text-emerald-600" },
  PENDING: { label: "PROCESSING", className: "bg-amber-50 text-amber-600" },
  REVERSED: { label: "REVERSED", className: "bg-gray-100 text-gray-600" },
};

export const ReceiptDialog = function ({ transaction, onOpenChange }: Props) {
  if (!transaction) return null;

  const staff =
    [
      transaction.booking?.driver?.first_name,
      transaction.booking?.driver?.last_name,
    ]
      .filter(Boolean)
      .join(" ") || "—";

  const rows = [
    { label: "Staff", value: staff },
    {
      label: "Role",
      value: transaction.booking?.driver_type
        ? driverTypeLabel(transaction.booking.driver_type)
        : "—",
    },
    { label: "Date", value: formatDate(transaction.createdAt) },
    { label: "Payment method", value: "Wallet payment" },
    { label: "Note", value: transaction.description ?? "—" },
  ];

  const status = STATUS_PILL[transaction.status];

  const downloadCsv = () => {
    const csv = [
      "Reference,Staff,Role,Date,Amount,Status,Note",
      [
        transaction.reference,
        staff,
        rows[1].value,
        rows[2].value,
        formatMoney(Math.abs(transaction.amount_minor), transaction.currency),
        status?.label ?? transaction.status,
        transaction.description ?? "",
      ]
        .map((value) => `"${value}"`)
        .join(","),
    ].join("\n");

    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = `${transaction.reference}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <AppDialog
      isOpen={!!transaction}
      onOpenChange={onOpenChange}
      title={`Transaction ${transaction.reference}`}
      width="480px"
    >
      <div className="bg-brand-soft/50 flex items-center justify-between rounded-xl px-4 py-3">
        <AppText type="h3" className="text-lg font-bold">
          {formatMoney(
            Math.abs(transaction.amount_minor),
            transaction.currency,
          )}
        </AppText>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
            status?.className,
          )}
        >
          {status?.label ?? transaction.status}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <span
            key={row.label}
            className="flex items-center justify-between gap-3"
          >
            <AppText type="caption" className="text-muted-foreground">
              {row.label}
            </AppText>
            <AppText type="label" className="truncate text-sm">
              {row.value}
            </AppText>
          </span>
        ))}
      </div>

      <Button
        className="mt-6 h-12 w-full rounded-xl text-sm"
        onClick={downloadCsv}
      >
        Download Details (CSV)
      </Button>
    </AppDialog>
  );
};
