"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { AppInput } from "@/components/shared/app-input";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/show-toast";
import { cn, formatMoney, toMinorUnits } from "@/lib/utils";
import { CircleCheck, Copy, Landmark } from "lucide-react";
import { useState } from "react";
import type { Wallet } from "@/types/wallet";
import { useSyncFunding } from "@/hooks/use-wallet";

interface Props {
  wallet: Wallet;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "amount" | "summary" | "account" | "done";

const TITLES: Record<Step, { title: string; description?: string }> = {
  amount: { title: "Deposit", description: "How much are you adding?" },
  summary: { title: "Summary" },
  account: {
    title: "Complete payment",
    description: "Your wallet is credited the moment we confirm the payment.",
  },
  done: { title: "Deposit received" },
};

export const DepositDialog = function ({
  wallet,
  isOpen,
  onOpenChange,
}: Props) {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");

  const amountMinor = amount ? toMinorUnits(Number(amount)) : 0;

  const { sync, isSyncing } = useSyncFunding({
    onSynced: (credited) => {
      if (credited > 0) return setStep("done");

      showToast(
        "info",
        "We haven't seen your transfer yet — your wallet is credited automatically the moment it lands.",
      );
      handleOpenChange(false);
    },
  });

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setStep("amount");
      setAmount("");
    }
    onOpenChange(next);
  };

  const copy = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    showToast("success", `${label} copied`);
  };

  const accountRows = [
    { label: "Bank", value: wallet.dva_bank_name },
    { label: "Account number", value: wallet.dva_account_number },
    { label: "Account name", value: wallet.dva_account_name },
  ];

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title={TITLES[step].title}
      description={TITLES[step].description}
      width="480px"
    >
      {step === "amount" && (
        <div className="space-y-5">
          <AppInput
            label="Amount (₦)"
            placeholder="E.g 500000"
            inputMode="numeric"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value.replace(/[^\d]/g, ""))
            }
          />
          <Button
            className="h-12 w-full rounded-xl text-sm"
            disabled={amountMinor <= 0}
            onClick={() => setStep("summary")}
          >
            Continue
          </Button>
        </div>
      )}

      {step === "summary" && (
        <div>
          <span className="border-border flex items-center justify-between border-b pb-3">
            <AppText type="label" className="text-sm">
              Bank transfer
            </AppText>
            <Landmark className="text-brand h-5 w-5" />
          </span>

          <div className="border-border mt-4 rounded-2xl border p-5 text-center">
            <AppText type="caption" className="text-muted-foreground block">
              You're depositing
            </AppText>
            <AppText type="h2" className="mt-2 block text-3xl font-bold">
              {formatMoney(amountMinor, wallet.currency)}
            </AppText>

            <div className="mt-5 space-y-2 text-left">
              {[
                {
                  label: "Amount to Transfer",
                  value: formatMoney(amountMinor, wallet.currency),
                },
                { label: "Fee", value: formatMoney(0, wallet.currency) },
                { label: "Payment Method", value: "Bank Transfer" },
              ].map((row) => (
                <span
                  key={row.label}
                  className="flex items-center justify-between"
                >
                  <AppText type="caption" className="text-muted-foreground">
                    {row.label}
                  </AppText>
                  <AppText type="label" className="text-sm">
                    {row.value}
                  </AppText>
                </span>
              ))}
            </div>
          </div>

          <Button
            className="mt-5 h-12 w-full rounded-xl text-sm"
            onClick={() => setStep("account")}
          >
            Continue
          </Button>
        </div>
      )}

      {step === "account" && !wallet.dva_account_number && (
        <div className="py-4 text-center">
          <AppText type="label" className="block text-sm">
            Bank transfer deposits aren't available yet
          </AppText>
          <AppText
            type="caption"
            className="text-muted-foreground mx-auto mt-2 block max-w-xs"
          >
            We couldn't set up your dedicated account. Try again shortly — it is
            created automatically.
          </AppText>
        </div>
      )}

      {step === "account" && wallet.dva_account_number && (
        <div>
          <div className="border-border rounded-2xl border p-5">
            <AppText type="label" className="block text-sm">
              Transfer exactly
            </AppText>
            <AppText type="h2" className="mt-1 block text-3xl font-bold">
              {formatMoney(amountMinor, wallet.currency)}
            </AppText>

            <div className="border-border mt-4 space-y-3 border-t pt-4">
              {accountRows.map((row) => (
                <span
                  key={row.label}
                  className="flex items-center justify-between gap-3"
                >
                  <AppText type="caption" className="text-muted-foreground">
                    {row.label}
                  </AppText>
                  <span className="flex min-w-0 items-center gap-2">
                    <AppText type="label" className="truncate text-sm">
                      {row.value ?? "—"}
                    </AppText>
                    {row.value && (
                      <button
                        type="button"
                        aria-label={`Copy ${row.label.toLowerCase()}`}
                        onClick={() => copy(row.label, row.value!)}
                        className="text-brand hover:text-brand-hover cursor-pointer"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    )}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <AppText
            type="caption"
            className="text-muted-foreground mt-4 block text-center"
          >
            This account belongs to you only. Transfers from any bank reflect in
            your wallet within seconds.
          </AppText>

          <Button
            className="mt-4 h-12 w-full rounded-xl text-sm"
            isLoading={isSyncing}
            onClick={() => sync(undefined)}
          >
            Transfer Done
          </Button>
        </div>
      )}

      {step === "done" && (
        <div className="flex flex-col items-center py-6 text-center">
          <span className="bg-brand-soft flex h-16 w-16 items-center justify-center rounded-full">
            <CircleCheck className="text-brand h-8 w-8" />
          </span>
          <AppText type="h3" className="mt-4 text-lg font-bold">
            Wallet funded
          </AppText>
          <AppText
            type="caption"
            className="text-muted-foreground mt-2 block max-w-xs"
          >
            Your deposit has landed and your balance is up to date.
          </AppText>
          <Button
            className="mt-6 h-12 w-full rounded-xl text-sm"
            onClick={() => handleOpenChange(false)}
          >
            Done
          </Button>
        </div>
      )}
    </AppDialog>
  );
};
