"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { AppText } from "@/components/shared/app-text";
import { AppTextArea } from "@/components/shared/app-textarea";
import { BackLink } from "@/components/shared/back-link";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/use-get-profile";
import { showToast } from "@/lib/show-toast";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_STATUS_STYLES,
  ENGAGEMENT_TYPE_LABELS,
  clientNameOf,
  formatDate,
  formatDateTime,
  formatPay,
  formatPosted,
  formatWorkingHours,
  getInitials,
} from "@/lib/utils";
import { CalendarDays, Clock, Info, MapPin, Phone, Wallet } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  useAcceptJobRequest,
  useCompleteJob,
  useDeclineJobRequest,
  useJobRequest,
  useStartJob,
} from "../_hooks/use-job-requests";
import { UnverifiedNotice } from "../_components/unverified-notice";

interface FactProps {
  icon: typeof MapPin;
  label: string;
  value: React.ReactNode;
}

const Fact = function ({ icon: Icon, label, value }: FactProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-foreground mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0">
        <AppText type="caption" className="text-muted-foreground block">
          {label}
        </AppText>
        <AppText type="label" className="block font-semibold">
          {value}
        </AppText>
      </div>
    </div>
  );
};

export default function JobRequestDetail() {
  const params = useParams<{ reference: string }>();
  const reference = params.reference;

  const { profile } = useGetProfile();
  const verification = profile?.driver_profile?.verification_status;
  const isVerified = verification === "APPROVED";

  const { booking, isFetching } = useJobRequest(reference, isVerified);

  const [declineOpen, setDeclineOpen] = useState(false);
  const [reason, setReason] = useState("");

  const { acceptJobRequest, isPending: isAccepting } =
    useAcceptJobRequest(reference);
  const { declineJobRequest, isPending: isDeclining } =
    useDeclineJobRequest(reference);
  const { startJob, isPending: isStarting } = useStartJob(reference);
  const { completeJob, isPending: isCompleting } = useCompleteJob(reference);

  if (profile && !isVerified) {
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <BackLink href="/driver/dashboard/job-request" />
        <UnverifiedNotice status={verification ?? "UNSUBMITTED"} />
      </div>
    );
  }

  if (isFetching && !booking) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!booking) return null;

  const location = [booking.city, booking.state].filter(Boolean).join(", ");

  // Contact details only make sense once the job is on — before that the driver
  // has not agreed to anything.
  const canSeeContact = ["ACCEPTED", "IN_PROGRESS", "COMPLETED"].includes(
    booking.status,
  );

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <BackLink href="/driver/dashboard/job-request" />

      <div className="border-border divide-border divide-y rounded-xl border bg-white">
        <div className="flex flex-wrap items-start justify-between gap-3 p-4 md:p-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={booking.client.profile_pic ?? undefined}
                alt=""
              />
              <AvatarFallback className="bg-brand-soft text-brand text-xs">
                {getInitials(
                  booking.client.first_name,
                  booking.client.last_name,
                )}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <AppText type="h3" className="text-base font-semibold">
                  {booking.title}
                </AppText>
                <StatusBadge
                  label={ENGAGEMENT_TYPE_LABELS[booking.engagement_type]}
                  className="bg-muted text-muted-foreground border-transparent"
                />
              </div>
              <AppText type="caption" className="text-muted-foreground block">
                {clientNameOf(booking.client)} · posted{" "}
                {formatPosted(booking.createdAt)}
              </AppText>
            </div>
          </div>

          <StatusBadge
            label={BOOKING_STATUS_LABELS[booking.status]}
            className={BOOKING_STATUS_STYLES[booking.status]}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:p-6">
          <Fact
            icon={Wallet}
            label="Pay offered"
            value={formatPay(
              booking.amount,
              booking.currency,
              booking.engagement_type,
            )}
          />
          <Fact
            icon={MapPin}
            label="Location"
            value={location || booking.pickup_address}
          />
          <Fact
            icon={CalendarDays}
            label="Start date"
            value={formatDate(booking.starts_at)}
          />
          <Fact
            icon={Clock}
            label="Working hours"
            value={formatWorkingHours(booking.starts_at, booking.ends_at)}
          />
          <Fact icon={MapPin} label="Pickup" value={booking.pickup_address} />
          {booking.dropoff_address && (
            <Fact
              icon={MapPin}
              label="Drop off"
              value={booking.dropoff_address}
            />
          )}
          {canSeeContact && booking.client.phone_no && (
            <Fact
              icon={Phone}
              label="Contact"
              value={
                <a
                  href={`tel:${booking.client.phone_no}`}
                  className="text-brand"
                >
                  {booking.client.phone_no}
                </a>
              }
            />
          )}
        </div>

        {booking.description && (
          <div className="p-4 md:p-6">
            <AppText type="h4" className="text-base font-semibold">
              Role brief
            </AppText>
            <AppText
              type="caption"
              className="text-muted-foreground mt-1.5 block"
            >
              {booking.description}
            </AppText>
          </div>
        )}

        {!!booking.requirements.length && (
          <div className="p-4 md:p-6">
            <AppText type="h4" className="text-base font-semibold">
              What the client expects
            </AppText>
            <ul className="text-muted-foreground mt-2.5 list-disc space-y-1.5 pl-5 text-sm">
              {booking.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
        )}

        {booking.decline_reason && (
          <div className="p-4 md:p-6">
            <AppText type="caption" className="text-destructive">
              You declined this request — {booking.decline_reason}
            </AppText>
          </div>
        )}

        {booking.status === "REQUESTED" && (
          <div className="flex flex-wrap gap-3 p-4 md:p-6">
            <Button
              isLoading={isAccepting}
              onClick={() => acceptJobRequest({})}
              className="h-11 rounded-lg px-6"
            >
              Accept job
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeclineOpen(true)}
              className="h-11 rounded-lg px-6"
            >
              Decline
            </Button>
          </div>
        )}

        {booking.status === "ACCEPTED" && (
          <div className="p-4 md:p-6">
            <Button
              isLoading={isStarting}
              onClick={() => startJob({})}
              className="h-11 rounded-lg px-6"
            >
              Start job
            </Button>
          </div>
        )}

        {booking.status === "IN_PROGRESS" && (
          <div className="p-4 md:p-6">
            <Button
              isLoading={isCompleting}
              onClick={() => completeJob({})}
              className="h-11 rounded-lg px-6"
            >
              Mark complete
            </Button>
          </div>
        )}
      </div>

      {!canSeeContact && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <AppText type="caption" className="text-amber-700">
            Contact details are shared only after both you and the client
            confirm the booking
          </AppText>
        </div>
      )}

      {!!booking.status_events?.length && (
        <div className="border-border rounded-xl border bg-white p-5 md:p-6">
          <AppText type="h4" className="mb-4 text-base font-semibold">
            Timeline
          </AppText>

          <ol className="space-y-4">
            {booking.status_events.map((event) => (
              <li key={event.id} className="flex gap-3">
                <span className="bg-brand mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                <div>
                  <AppText type="label" className="block">
                    {BOOKING_STATUS_LABELS[event.to_status]}
                  </AppText>
                  <AppText
                    type="caption"
                    className="text-muted-foreground block"
                  >
                    {formatDateTime(event.createdAt)}
                    {event.note ? ` — ${event.note}` : ""}
                  </AppText>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <AppDialog
        isOpen={declineOpen}
        onOpenChange={setDeclineOpen}
        title="Decline this request"
        isSubmitting={isDeclining}
        dialogFooter={
          <>
            <Button
              variant="outline"
              onClick={() => setDeclineOpen(false)}
              className="h-10 rounded-lg px-5"
            >
              Cancel
            </Button>
            <Button
              isLoading={isDeclining}
              onClick={() => {
                if (reason.trim().length < 3) {
                  return showToast("error", "Let the client know why");
                }

                declineJobRequest({ reason: reason.trim() });
                setDeclineOpen(false);
                setReason("");
              }}
              className="h-10 rounded-lg px-5"
            >
              Decline request
            </Button>
          </>
        }
      >
        <AppTextArea
          label="Let the client know why"
          placeholder="E.g I'm unavailable on that date"
          value={reason}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReason(event.target.value)
          }
        />
      </AppDialog>
    </div>
  );
}
