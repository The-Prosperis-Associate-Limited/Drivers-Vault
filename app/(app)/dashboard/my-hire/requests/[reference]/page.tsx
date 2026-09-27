"use client";

import { AppText } from "@/components/shared/app-text";
import { BackLink } from "@/components/shared/back-link";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import {
  HIRE_REQUEST_STATUS_LABELS,
  HIRE_REQUEST_STATUS_STYLES,
} from "@/components/hires/hire-request-row";
import { TrustRing } from "@/components/drivers/trust-ring";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  cn,
  driverTypeLabel,
  formatDate,
  formatMoney,
  getInitials,
  HIRE_ENGAGEMENT_LABELS,
} from "@/lib/utils";
import {
  Banknote,
  FileQuestion,
  Lock,
  LockOpen,
  Mail,
  MapPin,
  Phone,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import type { APIResponse } from "@/types/response";
import type { HireRequest } from "@/types/hire";
import type { Wallet } from "@/types/wallet";

const STATUS_COPY: Record<string, string> = {
  PENDING_REVIEW:
    "Our team is reviewing this request. You'll get a notification the moment your invoice is ready.",
  INVOICED:
    "Your invoice is ready. Pay from your wallet to unlock the driver's verified contact details.",
  PAID: "Paid — the driver's verified details are yours below.",
  DECLINED: "This request was declined.",
  CANCELLED: "You cancelled this request.",
};

export default function HireRequestDetail({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = use(params);
  const [payOpen, setPayOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const detailUrl = API_ENDPOINTS.hireRequests.detail(reference);
  const { data, isFetching } = useGetData<APIResponse<HireRequest>>({
    url: detailUrl,
  });

  const request = data?.data;
  const invoice = request?.invoice;
  const payable =
    request?.status === "INVOICED" && invoice?.status === "UNPAID";

  const { data: walletData } = useGetData<APIResponse<Wallet>>({
    url: API_ENDPOINTS.wallet.get,
    shouldFetch: !!payable,
  });

  const balance = walletData?.data.available_minor ?? 0;
  const shortfall = invoice ? invoice.total_minor - balance : 0;

  const { mutate: pay, isPending: isPaying } = useSubmitData({
    url: API_ENDPOINTS.hireRequests.pay(reference),
    onSuccessMessage: "Paid — your driver's details are unlocked",
    additionalQueryKeys: [[detailUrl], [API_ENDPOINTS.wallet.get]],
  });

  const { mutate: cancel, isPending: isCancelling } = useSubmitData({
    url: API_ENDPOINTS.hireRequests.cancel(reference),
    onSuccessMessage: "Request cancelled",
    additionalQueryKeys: [[detailUrl]],
  });

  if (!request) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <BackLink href="/dashboard/my-hire" label="Back to My Hire" />
        {isFetching ? (
          <>
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </>
        ) : (
          <EmptyState
            icon={FileQuestion}
            title="Request not found"
            description="This hire request is no longer available."
          />
        )}
      </div>
    );
  }

  const driver = request.driver;
  const name =
    [driver.first_name, driver.last_name].filter(Boolean).join(" ") || "Driver";
  const pack = request.combo_pack;

  return (
    <div className="mx-auto max-w-4xl">
      <BackLink href="/dashboard/my-hire" label="Back to My Hire" />

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="flex items-center gap-2">
            <AppText type="h2" className="text-xl font-bold md:text-2xl">
              Hire request
            </AppText>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                HIRE_REQUEST_STATUS_STYLES[request.status],
              )}
            >
              {HIRE_REQUEST_STATUS_LABELS[request.status]}
            </span>
          </span>
          <AppText
            type="caption"
            className="text-muted-foreground mt-1 block text-xs"
          >
            {request.reference} · Submitted {formatDate(request.createdAt)}
          </AppText>
        </div>

        {["PENDING_REVIEW", "INVOICED"].includes(request.status) && (
          <Button
            variant="outline"
            className="text-destructive border-destructive/40 h-10 rounded-lg px-4 text-sm"
            onClick={() => setCancelOpen(true)}
          >
            <XCircle className="h-4 w-4" />
            Cancel request
          </Button>
        )}
      </div>

      <AppText type="caption" className="text-muted-foreground mt-3 block">
        {request.status === "DECLINED" && request.declined_reason
          ? `${STATUS_COPY.DECLINED} Reason: ${request.declined_reason}`
          : STATUS_COPY[request.status]}
      </AppText>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {/* The engagement summary */}
          <div className="border-border rounded-2xl border bg-white p-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={driver.profile_pic ?? undefined} alt="" />
                <AvatarFallback>
                  {getInitials(driver.first_name, driver.last_name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <AppText type="h3" className="text-base font-bold">
                  {name}
                </AppText>
                <AppText
                  type="caption"
                  className="text-muted-foreground block text-xs"
                >
                  {[
                    driverTypeLabel(
                      driver.driver_profile?.driver_type ?? undefined,
                    ),
                    [driver.city, driver.state_of_residence]
                      .filter(Boolean)
                      .join(", "),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </AppText>
              </div>
              <TrustRing
                score={driver.driver_profile?.trust_score ?? 0}
                size={52}
              />
            </div>

            <div className="border-border mt-4 grid grid-cols-2 gap-3 border-t pt-4">
              <div>
                <AppText
                  type="caption"
                  className="text-muted-foreground text-xs"
                >
                  Engagement
                </AppText>
                <AppText type="label" className="block text-sm font-semibold">
                  {HIRE_ENGAGEMENT_LABELS[request.engagement_type]}
                </AppText>
              </div>
              <div>
                <AppText
                  type="caption"
                  className="text-muted-foreground text-xs"
                >
                  Starts
                </AppText>
                <AppText type="label" className="block text-sm font-semibold">
                  {formatDate(request.starts_at)}
                </AppText>
              </div>
            </div>

            {request.note && (
              <AppText
                type="caption"
                className="text-muted-foreground border-border mt-4 block border-t pt-4 text-sm"
              >
                &ldquo;{request.note}&rdquo;
              </AppText>
            )}
          </div>

          {/* The combo pack — locked until paid */}
          <div className="border-border rounded-2xl border bg-white p-5">
            <span className="flex items-center gap-2">
              {pack ? (
                <LockOpen className="h-4 w-4 text-emerald-600" />
              ) : (
                <Lock className="text-muted-foreground h-4 w-4" />
              )}
              <AppText type="h3" className="text-base font-semibold">
                Driver contact details
              </AppText>
            </span>

            {pack ? (
              <div className="mt-4 space-y-3">
                {[
                  { icon: Phone, label: "Phone", value: pack.phone_no },
                  {
                    icon: Phone,
                    label: "WhatsApp",
                    value: pack.whatsapp_number,
                  },
                  { icon: Mail, label: "Email", value: pack.email },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: [pack.city, pack.state_of_residence]
                      .filter(Boolean)
                      .join(", "),
                  },
                ]
                  .filter((row) => row.value)
                  .map((row) => {
                    const Icon = row.icon;
                    return (
                      <span
                        key={row.label}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="flex items-center gap-3">
                          <span className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                            <Icon className="text-muted-foreground h-4 w-4" />
                          </span>
                          <AppText
                            type="caption"
                            className="text-muted-foreground"
                          >
                            {row.label}
                          </AppText>
                        </span>
                        <AppText type="label" className="text-sm font-semibold">
                          {row.value}
                        </AppText>
                      </span>
                    );
                  })}

                {request.booking && (
                  <AppText
                    type="caption"
                    className="text-muted-foreground border-border block border-t pt-3 text-xs"
                  >
                    This engagement now lives in{" "}
                    <Link
                      href={`/dashboard/my-hire/${request.booking.reference}`}
                      className="text-brand font-semibold underline underline-offset-2"
                    >
                      My Hire
                    </Link>{" "}
                    — reviews and further payments happen there.
                  </AppText>
                )}
              </div>
            ) : (
              <AppText
                type="caption"
                className="text-muted-foreground mt-3 block text-sm"
              >
                The driver's verified phone, WhatsApp and email unlock here once
                your invoice is paid.
              </AppText>
            )}
          </div>
        </div>

        {/* The invoice */}
        <div className="border-border h-fit rounded-2xl border bg-white p-5">
          <AppText type="h3" className="text-base font-semibold">
            Invoice
          </AppText>

          {!invoice ? (
            <AppText
              type="caption"
              className="text-muted-foreground mt-3 block text-sm"
            >
              No invoice yet — our team is reviewing this request.
            </AppText>
          ) : (
            <>
              <AppText
                type="caption"
                className="text-muted-foreground mt-1 block text-xs"
              >
                {invoice.reference} · Issued {formatDate(invoice.createdAt)}
              </AppText>

              <div className="mt-4 space-y-2.5">
                {[
                  {
                    label: "Engagement amount",
                    value: formatMoney(invoice.amount_minor, invoice.currency),
                  },
                  {
                    label: `VAT (${invoice.vat_percent}%)`,
                    value: formatMoney(invoice.vat_minor, invoice.currency),
                  },
                  {
                    label: "Platform fee",
                    value: formatMoney(invoice.fee_minor, invoice.currency),
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

                <span className="border-border flex items-center justify-between border-t pt-2.5">
                  <AppText type="label" className="text-sm font-bold">
                    Total
                  </AppText>
                  <AppText type="label" className="text-base font-bold">
                    {formatMoney(invoice.total_minor, invoice.currency)}
                  </AppText>
                </span>
              </div>

              {invoice.note && (
                <AppText
                  type="caption"
                  className="text-muted-foreground mt-3 block text-xs"
                >
                  {invoice.note}
                </AppText>
              )}

              {payable && (
                <>
                  {shortfall > 0 && (
                    <AppText
                      type="caption"
                      className="mt-4 block text-xs text-amber-600"
                    >
                      Your wallet is short by{" "}
                      {formatMoney(shortfall, invoice.currency)}.{" "}
                      <Link
                        href="/dashboard/wallet"
                        className="font-semibold underline underline-offset-2"
                      >
                        Fund your wallet
                      </Link>{" "}
                      first.
                    </AppText>
                  )}
                  <Button
                    className="mt-4 h-12 w-full rounded-lg text-sm"
                    disabled={shortfall > 0}
                    onClick={() => setPayOpen(true)}
                  >
                    <Banknote className="h-4 w-4" />
                    Pay from wallet
                  </Button>
                </>
              )}

              {invoice.status === "PAID" && (
                <AppText
                  type="caption"
                  className="mt-4 block text-center text-xs font-semibold text-emerald-600"
                >
                  Paid {invoice.paid_at ? formatDate(invoice.paid_at) : ""}
                </AppText>
              )}
            </>
          )}
        </div>
      </div>

      {invoice && (
        <ConfirmDialog
          isOpen={payOpen}
          onOpenChange={setPayOpen}
          icon={Banknote}
          title={`Pay ${formatMoney(invoice.total_minor, invoice.currency)}?`}
          description={`${formatMoney(invoice.total_minor, invoice.currency)} leaves your wallet now — ${name} is paid in full and their verified contact details unlock immediately.`}
          confirmLabel="Pay now"
          isLoading={isPaying}
          onConfirm={() => {
            pay({});
            setPayOpen(false);
          }}
        />
      )}

      <ConfirmDialog
        isOpen={cancelOpen}
        onOpenChange={setCancelOpen}
        icon={XCircle}
        iconClassName="text-destructive"
        title="Cancel this hire request?"
        description="The request closes and any invoice on it is voided. You can always request this driver again."
        confirmLabel="Cancel request"
        confirmVariant="destructive"
        isLoading={isCancelling}
        onConfirm={() => {
          cancel({});
          setCancelOpen(false);
        }}
      />
    </div>
  );
}
