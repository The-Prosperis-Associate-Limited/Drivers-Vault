"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { AppInput } from "@/components/shared/app-input";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { useSyncFunding, useWallet } from "@/hooks/use-wallet";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { showToast } from "@/lib/show-toast";
import { cn, formatMoney, toMajorUnits, toMinorUnits } from "@/lib/utils";
import {
  ArrowLeft,
  CircleCheck,
  Copy,
  Landmark,
  WalletMinimal,
} from "lucide-react";
import { useState } from "react";
import type { APIResponse } from "@/types/response";
import type { HireDetail } from "@/types/booking";
import type { PaymentQuote } from "@/types/wallet";

interface Props {
  hire: HireDetail;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "details" | "method" | "transfer" | "paid";
type Method = "wallet" | "transfer";

export const MakePaymentDialog = function ({
  hire,
  isOpen,
  onOpenChange,
}: Props) {
  const [step, setStep] = useState<Step>("details");
  const [method, setMethod] = useState<Method>("wallet");
  const [amount, setAmount] = useState(String(toMajorUnits(hire.amount)));

  const { wallet } = useWallet();

  const amountMinor = amount ? toMinorUnits(Number(amount)) : 0;
  const debouncedAmount = useDebounce(amountMinor, 400);

  // The fee preview is the server's answer, never local arithmetic — the
  // percent, floor and cap live in server env and would drift here.
  const { data: quoteData, isFetching: isQuoting } = useGetData<
    APIResponse<PaymentQuote>
  >({
    url: debouncedAmount > 0 ? API_ENDPOINTS.wallet.quote(debouncedAmount) : "",
    shouldFetch: debouncedAmount > 0,
  });

  const quote = quoteData?.data;
  const totalMinor = quote?.total_minor ?? amountMinor;

  const { mutate: pay, isPending } = useSubmitData({
    url: API_ENDPOINTS.wallet.pay,
    method: "post",
    onSuccessMessage: "Payment sent",
    additionalQueryKeys: [
      [API_ENDPOINTS.wallet.get],
      [API_ENDPOINTS.dashboard.overview],
    ],
    onSuccess: () => setStep("paid"),
  });

  // The transfer lands in the wallet first (idempotent sync), then the same
  // wallet payment runs — one rail regardless of the picked method. If the
  // transfer hasn't arrived yet the pay fails loudly and can be retried.
  const { sync, isSyncing } = useSyncFunding({
    onSynced: (credited) => {
      if (credited <= 0) {
        showToast(
          "info",
          "We haven't seen your transfer yet — give it a moment and tap again.",
        );
        return;
      }
      pay({ reference: hire.reference, amount_minor: amountMinor });
    },
  });

  const driverName =
    [hire.driver?.first_name, hire.driver?.last_name]
      .filter(Boolean)
      .join(" ") || "your driver";

  const balance = wallet?.available_minor ?? 0;
  const walletCovers = balance >= totalMinor;

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setStep("details");
      setMethod("wallet");
      setAmount(String(toMajorUnits(hire.amount)));
    }
    onOpenChange(next);
  };

  const confirmMethod = () => {
    if (method === "wallet") {
      return pay({ reference: hire.reference, amount_minor: amountMinor });
    }
    setStep("transfer");
  };

  const copy = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    showToast("success", `${label} copied`);
  };

  const accountRows = wallet
    ? [
        { label: "Bank", value: wallet.dva_bank_name },
        { label: "Account number", value: wallet.dva_account_number },
        { label: "Account name", value: wallet.dva_account_name },
      ]
    : [];

  const methodOptions: {
    value: Method;
    label: string;
    description: string;
    icon: typeof WalletMinimal;
    disabled?: boolean;
  }[] = [
    {
      value: "wallet",
      label: "Pay from wallet",
      description: `Balance: ${formatMoney(balance, wallet?.currency ?? hire.currency)}`,
      icon: WalletMinimal,
      disabled: !walletCovers,
    },
    {
      value: "transfer",
      label: "Bank transfer",
      description: wallet?.dva_account_number
        ? "Transfer into your dedicated account, then we complete the payment."
        : "Your dedicated account isn't ready yet — try again shortly.",
      icon: Landmark,
      disabled: !wallet?.dva_account_number,
    },
  ];

  const titles: Record<Step, { title: string; description?: string }> = {
    details: { title: `Make payment · ${driverName}` },
    method: {
      title: `Pay ${driverName}`,
      description: "Choose how you'd like to pay the driver.",
    },
    transfer: {
      title: "Complete transfer",
      description: "The payment goes out the moment your transfer lands.",
    },
    paid: { title: "Payment sent" },
  };

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title={titles[step].title}
      description={titles[step].description}
      width="460px"
      isSubmitting={isPending || isSyncing}
    >
      {step === "paid" && (
        <div className="flex flex-col items-center py-6 text-center">
          <span className="bg-brand-soft flex h-16 w-16 items-center justify-center rounded-full">
            <CircleCheck className="text-brand h-8 w-8" />
          </span>
          <AppText type="h3" className="mt-4 text-lg font-bold">
            {formatMoney(quote?.amount_minor ?? amountMinor, hire.currency)}{" "}
            sent
          </AppText>
          <AppText
            type="caption"
            className="text-muted-foreground mt-2 block max-w-xs"
          >
            {driverName} has been notified. The full amount goes to them — the
            fee is itemised on your statement.
          </AppText>
          <Button
            className="mt-6 h-12 w-full rounded-xl text-sm"
            onClick={() => handleOpenChange(false)}
          >
            Done
          </Button>
        </div>
      )}

      {step === "details" && (
        <div className="space-y-5">
          <AppInput
            label="Amount to pay (₦)"
            inputMode="numeric"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value.replace(/[^\d]/g, ""))
            }
          />

          <div className="border-border rounded-2xl border p-5">
            <div className="space-y-2">
              {[
                {
                  label: "Amount Deducted",
                  value: quote
                    ? formatMoney(quote.total_minor, hire.currency)
                    : "…",
                },
                {
                  label: "Fee",
                  value: quote
                    ? formatMoney(quote.fee_minor, hire.currency)
                    : "…",
                },
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
            className="h-12 w-full rounded-xl text-sm"
            disabled={amountMinor <= 0 || isQuoting || !quote}
            onClick={() => setStep("method")}
          >
            Continue
          </Button>
        </div>
      )}

      {step === "method" && (
        <div>
          <button
            type="button"
            onClick={() => setStep("details")}
            className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="mt-4 space-y-3" role="radiogroup">
            {methodOptions.map((option) => {
              const Icon = option.icon;
              const selected = method === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={option.disabled}
                  onClick={() => setMethod(option.value)}
                  className={cn(
                    "border-border flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left transition-colors",
                    selected && "border-brand bg-brand-soft/30",
                    option.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  <span className="bg-brand-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Icon className="text-brand h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <AppText type="label" className="block text-sm">
                      {option.label}
                    </AppText>
                    <AppText
                      type="caption"
                      className="text-muted-foreground mt-0.5 block"
                    >
                      {option.description}
                    </AppText>
                  </span>
                  <span
                    className={cn(
                      "border-border h-4 w-4 shrink-0 rounded-full border-2",
                      selected && "border-brand border-5",
                    )}
                  />
                </button>
              );
            })}
          </div>

          <Button
            className="mt-5 h-12 w-full rounded-xl text-sm"
            isLoading={isPending}
            onClick={confirmMethod}
          >
            Continue
          </Button>
        </div>
      )}

      {step === "transfer" && (
        <div>
          <button
            type="button"
            onClick={() => setStep("method")}
            className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="border-border mt-4 rounded-2xl border p-5">
            <AppText type="label" className="block text-sm">
              Transfer exactly
            </AppText>
            <AppText type="h2" className="mt-1 block text-3xl font-bold">
              {formatMoney(totalMinor, hire.currency)}
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
            This account belongs to you only. Once the transfer lands, we pay{" "}
            {driverName} from your wallet automatically.
          </AppText>

          <Button
            className="mt-4 h-12 w-full rounded-xl text-sm"
            isLoading={isSyncing || isPending}
            onClick={() => sync(undefined)}
          >
            I&apos;ve made the transfer
          </Button>
        </div>
      )}
    </AppDialog>
  );
};
