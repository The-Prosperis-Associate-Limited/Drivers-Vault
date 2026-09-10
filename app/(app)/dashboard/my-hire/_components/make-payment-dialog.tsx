"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { AppInput } from "@/components/shared/app-input";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { formatMoney, toMajorUnits, toMinorUnits } from "@/lib/utils";
import { CircleCheck, WalletMinimal } from "lucide-react";
import { useState } from "react";
import type { APIResponse } from "@/types/response";
import type { HireDetail } from "@/types/booking";
import type { PaymentQuote } from "@/types/wallet";

interface Props {
  hire: HireDetail;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MakePaymentDialog = function ({
  hire,
  isOpen,
  onOpenChange,
}: Props) {
  const [amount, setAmount] = useState(String(toMajorUnits(hire.amount)));
  const [paid, setPaid] = useState(false);

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

  const { mutate: pay, isPending } = useSubmitData({
    url: API_ENDPOINTS.wallet.pay,
    method: "post",
    onSuccessMessage: "Payment sent",
    additionalQueryKeys: [
      [API_ENDPOINTS.wallet.get],
      [API_ENDPOINTS.dashboard.overview],
    ],
    onSuccess: () => setPaid(true),
  });

  const driverName =
    [hire.driver?.first_name, hire.driver?.last_name]
      .filter(Boolean)
      .join(" ") || "your driver";

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setPaid(false);
      setAmount(String(toMajorUnits(hire.amount)));
    }
    onOpenChange(next);
  };

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title={paid ? "Payment sent" : `Make payment · ${driverName}`}
      width="460px"
    >
      {paid ? (
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
      ) : (
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

              <span className="border-border flex items-center justify-between border-t pt-2">
                <AppText type="caption" className="text-muted-foreground">
                  Payment method
                </AppText>
                <span className="flex items-center gap-1.5">
                  <WalletMinimal className="text-brand h-4 w-4" />
                  <AppText type="label" className="text-sm">
                    Wallet payment
                  </AppText>
                </span>
              </span>
            </div>
          </div>

          <Button
            className="h-12 w-full rounded-xl text-sm"
            isLoading={isPending}
            disabled={amountMinor <= 0 || isQuoting}
            onClick={() =>
              pay({ reference: hire.reference, amount_minor: amountMinor })
            }
          >
            Make Payment
          </Button>
        </div>
      )}
    </AppDialog>
  );
};
