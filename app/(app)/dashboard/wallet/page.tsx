"use client";

import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDateTime, formatMoney } from "@/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  ReceiptText,
} from "lucide-react";
import { useState } from "react";
import type { WalletTransaction } from "@/types/wallet";
import { DepositDialog } from "./_components/deposit-dialog";
import { useWallet, useWalletTransactions } from "./_hooks/use-wallet";

const transactionTitle = (transaction: WalletTransaction) => {
  if (transaction.type === "FUNDING") return "Wallet top-up — bank transfer";
  if (transaction.type === "PLATFORM_FEE") return "Payment fee";
  return transaction.description ?? "Payment";
};

export default function WalletPage() {
  const [hidden, setHidden] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);

  const { wallet, isFetching } = useWallet();
  const { transactions, isFetching: isFetchingTransactions } =
    useWalletTransactions({ limit: 5 });

  return (
    <div className="mx-auto max-w-5xl">
      <AppText type="h2" className="text-xl font-bold md:text-2xl">
        Wallet
      </AppText>
      <AppText type="subtitle" className="text-muted-foreground mt-1 text-sm">
        Prepaid balance used to pay your drivers.
      </AppText>

      <div className="border-border mt-6 rounded-2xl border bg-white p-6 md:p-8">
        {isFetching && !wallet ? (
          <Skeleton className="h-20 w-64 rounded-xl" />
        ) : (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <AppText type="caption" className="text-brand block font-medium">
                Available Wallet Balance
              </AppText>
              <span className="mt-1 flex items-center gap-3">
                <AppText type="h2" className="text-3xl font-bold md:text-4xl">
                  {hidden
                    ? "₦ ••••••"
                    : formatMoney(
                        wallet?.available_minor ?? 0,
                        wallet?.currency,
                      )}
                </AppText>
                <button
                  type="button"
                  aria-label={hidden ? "Show balance" : "Hide balance"}
                  onClick={() => setHidden((current) => !current)}
                  className="text-brand cursor-pointer"
                >
                  {hidden ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </span>
            </div>

            <Button
              className="h-12 rounded-xl px-8 text-sm"
              onClick={() => setDepositOpen(true)}
            >
              <ArrowDownLeft className="h-4 w-4" />
              Deposit
            </Button>
          </div>
        )}
      </div>

      <div className="border-border mt-6 rounded-2xl border bg-white p-6 md:p-8">
        <AppText type="h3" className="text-base font-semibold">
          Recent Transactions
        </AppText>

        {isFetchingTransactions && !transactions.length ? (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-14 rounded-xl" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState
            icon={ReceiptText}
            title="Nothing here yet"
            description="Deposits and payments will show up the moment they happen."
            className="mt-4"
          />
        ) : (
          <div className="mt-4 divide-y">
            {transactions.map((transaction) => {
              const credit = transaction.amount_minor > 0;

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                        credit ? "bg-emerald-50" : "bg-red-50",
                      )}
                    >
                      {credit ? (
                        <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <AppText type="label" className="block truncate text-sm">
                        {transactionTitle(transaction)}
                      </AppText>
                      <AppText
                        type="caption"
                        className="block text-emerald-600"
                      >
                        Completed
                      </AppText>
                    </span>
                  </span>

                  <span className="shrink-0 text-right">
                    <AppText
                      type="label"
                      className={cn(
                        "block text-sm font-semibold",
                        credit ? "text-emerald-600" : "text-red-500",
                      )}
                    >
                      {credit ? "+" : "−"}
                      {formatMoney(
                        Math.abs(transaction.amount_minor),
                        transaction.currency,
                      )}
                    </AppText>
                    <AppText
                      type="caption"
                      className="text-muted-foreground block"
                    >
                      {formatDateTime(transaction.createdAt)}
                    </AppText>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {wallet && (
        <DepositDialog
          wallet={wallet}
          isOpen={depositOpen}
          onOpenChange={setDepositOpen}
        />
      )}
    </div>
  );
}
