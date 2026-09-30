"use client";

import { AppText } from "@/components/shared/app-text";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  driverTypeLabel,
  formatDate,
  TRANSMISSION_OPTIONS,
  WORK_SCHEDULE_LABELS,
} from "@/lib/utils";
import { CalendarCheck, XCircle } from "lucide-react";
import { useState } from "react";
import type { APIResponse } from "@/types/response";
import type { DriverShortlist } from "@/types/hire";

// The availability handshake: the admin shortlists candidates in parallel and
// this card is where the driver answers. No client identity before payment.
export const ShortlistCard = function () {
  const [decliningId, setDecliningId] = useState<string | null>(null);

  const { data } = useGetData<APIResponse<DriverShortlist[]>>({
    url: API_ENDPOINTS.shortlists.list,
  });

  const shortlists = data?.data ?? [];

  const { mutate: respond, isPending } = useSubmitData<{
    available: boolean;
    id: string;
  }>({
    url: (payload) => API_ENDPOINTS.shortlists.respond(payload.id),
    onSuccessMessage: "Response sent",
    additionalQueryKeys: [[API_ENDPOINTS.shortlists.list]],
    onSuccess: () => setDecliningId(null),
  });

  if (!shortlists.length) return null;

  return (
    <div className="border-brand/30 bg-brand-soft/40 rounded-xl border p-4 md:p-5">
      <span className="flex items-center gap-2">
        <CalendarCheck className="text-brand h-5 w-5" />
        <AppText type="h4" className="text-base font-semibold">
          You've been shortlisted - confirm your availability
        </AppText>
      </span>
      <AppText type="caption" className="text-muted-foreground mt-1 block">
        A client is hiring and you're a candidate. Quick replies keep you at the
        top of the list.
      </AppText>

      <div className="mt-4 space-y-3">
        {shortlists.map((entry) => {
          const request = entry.hire_request;
          const facts = [
            driverTypeLabel(request.driver_type ?? undefined),
            `Starts ${formatDate(request.starts_at)}`,
            WORK_SCHEDULE_LABELS[request.schedule],
            request.resumption_time && request.closing_time
              ? `${request.resumption_time} - ${request.closing_time}`
              : null,
            request.transmission
              ? TRANSMISSION_OPTIONS.find(
                  (option) => option.value === request.transmission,
                )?.label
              : null,
            [request.nearest_area, request.state].filter(Boolean).join(", ") ||
              null,
            request.duration_months
              ? `${request.duration_months} month${request.duration_months > 1 ? "s" : ""}`
              : null,
            request.provides_accommodation ? "Accommodation provided" : null,
          ].filter(Boolean);

          return (
            <div
              key={entry.id}
              className="border-border rounded-lg border bg-white p-4"
            >
              <AppText type="caption" className="text-muted-foreground block">
                {facts.join(" · ")}
              </AppText>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  className="h-9 rounded-lg px-4 text-xs"
                  isLoading={isPending && decliningId === null}
                  onClick={() => respond({ id: entry.id, available: true })}
                >
                  I'm available
                </Button>
                <Button
                  variant="outline"
                  className="text-destructive border-destructive/40 h-9 rounded-lg px-4 text-xs"
                  onClick={() => setDecliningId(entry.id)}
                >
                  Not available
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        isOpen={decliningId !== null}
        onOpenChange={(open) => !open && setDecliningId(null)}
        icon={XCircle}
        iconClassName="text-destructive"
        title="Mark yourself as not available?"
        description="The team will pick another driver for this engagement. This won't affect your profile or trust score."
        confirmLabel="Not available"
        confirmVariant="destructive"
        isLoading={isPending}
        onConfirm={() =>
          decliningId && respond({ id: decliningId, available: false })
        }
      />
    </div>
  );
};
