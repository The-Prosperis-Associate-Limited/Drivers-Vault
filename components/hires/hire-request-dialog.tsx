"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { formatMoney } from "@/lib/utils";
import {
  hireRequestSchema,
  type HireRequestFormValues,
} from "@/schemas/requests/hire-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { APIResponse } from "@/types/response";
import type { HireRequest } from "@/types/hire";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  driverUserId: string;
  driverName: string;
  rateMinor: number | null;
  rateCurrency?: string;
}

// A brokered hire is an ongoing engagement — one-off trips go through requests.
const ENGAGEMENT_OPTIONS = [
  { value: "MONTHLY", label: "Full-time (monthly)" },
  { value: "CONTRACT", label: "Contract" },
];

// Submitting costs nothing: an admin reviews the request and sends back an
// invoice; the driver's contact details unlock after that invoice is paid.
export const HireRequestDialog = function ({
  isOpen,
  onOpenChange,
  driverUserId,
  driverName,
  rateMinor,
  rateCurrency = "NGN",
}: Props) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HireRequestFormValues>({
    resolver: zodResolver(hireRequestSchema),
    defaultValues: { engagement_type: "MONTHLY" },
  });

  const { mutate, isPending } = useSubmitData<
    HireRequestFormValues & { driverId: string },
    APIResponse<HireRequest>
  >({
    url: API_ENDPOINTS.hireRequests.create,
    onSuccessMessage: "Request sent — we'll review it and send your invoice",
    onSuccess: (response) => {
      onOpenChange(false);
      router.push(`/dashboard/my-hire/requests/${response.data.reference}`);
    },
  });

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`Hire ${driverName}`}
      description="Tell us when you need them. Our team reviews every hire and sends you an invoice — you pay nothing now."
    >
      <form
        onSubmit={handleSubmit((data) =>
          mutate({ ...data, driverId: driverUserId }),
        )}
        className="space-y-4"
      >
        <div className="bg-brand-soft/60 flex items-center justify-between rounded-xl px-4 py-3">
          <AppText type="caption" className="text-brand text-xs font-medium">
            Advertised monthly rate
          </AppText>
          <AppText type="label" className="text-sm font-bold">
            {rateMinor ? formatMoney(rateMinor, rateCurrency) : "Set at review"}
          </AppText>
        </div>

        <FormSelect<HireRequestFormValues>
          control={control}
          name="engagement_type"
          errors={errors}
          label="Engagement type"
          options={ENGAGEMENT_OPTIONS}
        />

        <FormDatePicker<HireRequestFormValues>
          control={control}
          mode="single"
          name="starts_at"
          errors={errors}
          label="When should they start?"
          minDate={new Date()}
        />

        <FormTextarea<HireRequestFormValues>
          control={control}
          name="note"
          errors={errors}
          label="Anything we should know? (optional)"
          placeholder="E.g school runs on weekdays, occasional weekend trips"
        />

        <Button
          isLoading={isPending}
          className="h-12 w-full rounded-lg text-sm"
        >
          Submit hire request
        </Button>
      </form>
    </AppDialog>
  );
};
