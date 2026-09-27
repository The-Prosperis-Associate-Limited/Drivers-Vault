"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { AppInput } from "@/components/shared/app-input";
import { AppText } from "@/components/shared/app-text";
import { AppTextArea } from "@/components/shared/app-textarea";
import {
  HIRE_REQUEST_STATUS_LABELS,
  HIRE_REQUEST_STATUS_STYLES,
} from "@/components/hires/hire-request-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSubmitData } from "@/hooks/use-submit-data";
import { clientName } from "@/lib/admin";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  cn,
  driverTypeLabel,
  formatDate,
  formatMoney,
  getInitials,
  HIRE_ENGAGEMENT_LABELS,
} from "@/lib/utils";
import { ReceiptText, XCircle } from "lucide-react";
import { useState } from "react";
import type { HireRequest } from "@/types/hire";

interface Props {
  request: HireRequest;
  listUrl: string;
}

const DEFAULT_VAT = 7.5;

export const HireRequestCard = function ({ request, listUrl }: Props) {
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);

  const rate = request.driver.driver_profile?.expected_monthly_rate ?? null;
  const currency = request.driver.driver_profile?.rate_currency ?? "NGN";

  // Naira input for the admin, kobo on the wire.
  const [amountMajor, setAmountMajor] = useState(
    rate ? String(Math.round(rate / 100)) : "",
  );
  const [vatPercent, setVatPercent] = useState(String(DEFAULT_VAT));
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");

  const driver = request.driver;
  const driverName =
    [driver.first_name, driver.last_name].filter(Boolean).join(" ") || "Driver";
  const requester = request.client ? clientName(request.client) : "Client";

  const amountMinor = Math.round(Number(amountMajor || 0) * 100);
  const vatMinor = Math.round((amountMinor * Number(vatPercent || 0)) / 100);

  const { mutate: generate, isPending: isGenerating } = useSubmitData<{
    amount_minor: number;
    vat_percent: number;
    note?: string;
  }>({
    url: API_ENDPOINTS.adminHires.invoice(request.reference),
    onSuccessMessage: "Invoice generated and sent to the client",
    additionalQueryKeys: [[listUrl]],
    onSuccess: () => setInvoiceOpen(false),
  });

  const { mutate: decline, isPending: isDeclining } = useSubmitData<{
    reason: string;
  }>({
    url: API_ENDPOINTS.adminHires.decline(request.reference),
    onSuccessMessage: "Request declined",
    additionalQueryKeys: [[listUrl]],
    onSuccess: () => setDeclineOpen(false),
  });

  return (
    <div className="border-border rounded-2xl border bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-11 w-11 shrink-0">
            <AvatarImage src={driver.profile_pic ?? undefined} alt="" />
            <AvatarFallback>
              {getInitials(driver.first_name, driver.last_name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <span className="flex items-center gap-2">
              <AppText type="label" className="truncate text-sm font-bold">
                {driverName}
              </AppText>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                  HIRE_REQUEST_STATUS_STYLES[request.status],
                )}
              >
                {HIRE_REQUEST_STATUS_LABELS[request.status]}
              </span>
            </span>
            <AppText
              type="caption"
              className="text-muted-foreground mt-0.5 block truncate text-xs"
            >
              Requested by {requester} · {request.reference} ·{" "}
              {formatDate(request.createdAt)}
            </AppText>
          </div>
        </div>

        {request.status === "PENDING_REVIEW" && (
          <div className="flex shrink-0 gap-2">
            <Button
              className="h-9 rounded-lg px-4 text-xs"
              onClick={() => setInvoiceOpen(true)}
            >
              <ReceiptText className="h-3.5 w-3.5" />
              Generate invoice
            </Button>
            <Button
              variant="outline"
              className="text-destructive border-destructive/40 h-9 rounded-lg px-4 text-xs"
              onClick={() => setDeclineOpen(true)}
            >
              <XCircle className="h-3.5 w-3.5" />
              Decline
            </Button>
          </div>
        )}
      </div>

      <div className="border-border mt-4 grid grid-cols-2 gap-3 border-t pt-4 md:grid-cols-4">
        {[
          {
            label: "Engagement",
            value: HIRE_ENGAGEMENT_LABELS[request.engagement_type],
          },
          { label: "Starts", value: formatDate(request.starts_at) },
          {
            label: "Driver type",
            value: driverTypeLabel(
              driver.driver_profile?.driver_type ?? undefined,
            ),
          },
          {
            label: request.invoice ? "Invoice total" : "Advertised rate",
            value: request.invoice
              ? formatMoney(
                  request.invoice.total_minor,
                  request.invoice.currency,
                )
              : rate
                ? `${formatMoney(rate, currency)} / month`
                : "Not set",
          },
        ].map((entry) => (
          <div key={entry.label}>
            <AppText type="caption" className="text-muted-foreground text-xs">
              {entry.label}
            </AppText>
            <AppText type="label" className="block text-sm font-semibold">
              {entry.value}
            </AppText>
          </div>
        ))}
      </div>

      {request.note && (
        <AppText
          type="caption"
          className="text-muted-foreground mt-3 block text-xs"
        >
          Client note: &ldquo;{request.note}&rdquo;
        </AppText>
      )}

      {request.status === "DECLINED" && request.declined_reason && (
        <AppText type="caption" className="text-destructive mt-3 block text-xs">
          Declined: {request.declined_reason}
        </AppText>
      )}

      <AppDialog
        isOpen={invoiceOpen}
        onOpenChange={setInvoiceOpen}
        title="Generate invoice"
        description={`The client pays the total below; ${driverName} receives the engagement amount in full.`}
      >
        <div className="space-y-4">
          <AppInput
            label={`Engagement amount (${currency}, per month)`}
            type="number"
            min={1}
            value={amountMajor}
            onChange={(event) => setAmountMajor(event.target.value)}
            placeholder="E.g 250000"
          />

          <AppInput
            label="VAT (%)"
            type="number"
            min={0}
            max={50}
            step="0.5"
            value={vatPercent}
            onChange={(event) => setVatPercent(event.target.value)}
          />

          <AppTextArea
            label="Note to the client (optional)"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="E.g covers the first month of the engagement"
          />

          <div className="bg-brand-soft/60 space-y-1.5 rounded-xl px-4 py-3">
            <span className="flex items-center justify-between">
              <AppText type="caption" className="text-muted-foreground text-xs">
                Amount
              </AppText>
              <AppText type="label" className="text-sm">
                {formatMoney(amountMinor, currency)}
              </AppText>
            </span>
            <span className="flex items-center justify-between">
              <AppText type="caption" className="text-muted-foreground text-xs">
                VAT ({vatPercent || 0}%)
              </AppText>
              <AppText type="label" className="text-sm">
                {formatMoney(vatMinor, currency)}
              </AppText>
            </span>
            {/* The platform fee is quoted server-side at issue time. */}
            <AppText
              type="caption"
              className="text-muted-foreground block text-xs"
            >
              The payment fee is added when the invoice is issued.
            </AppText>
          </div>

          <Button
            className="h-11 w-full rounded-lg text-sm"
            disabled={amountMinor <= 0}
            isLoading={isGenerating}
            onClick={() =>
              generate({
                amount_minor: amountMinor,
                vat_percent: Number(vatPercent || 0),
                ...(note.trim() && { note: note.trim() }),
              })
            }
          >
            Issue invoice
          </Button>
        </div>
      </AppDialog>

      <AppDialog
        isOpen={declineOpen}
        onOpenChange={setDeclineOpen}
        title="Decline this request"
        description="The client sees your reason word for word."
      >
        <div className="space-y-4">
          <AppTextArea
            label="Reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="E.g this driver is no longer available in your area"
          />
          <Button
            variant="destructive"
            className="h-11 w-full rounded-lg text-sm"
            disabled={reason.trim().length < 5}
            isLoading={isDeclining}
            onClick={() => decline({ reason: reason.trim() })}
          >
            Decline request
          </Button>
        </div>
      </AppDialog>
    </div>
  );
};
