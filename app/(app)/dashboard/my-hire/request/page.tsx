"use client";

import { AppText } from "@/components/shared/app-text";
import { BackLink } from "@/components/shared/back-link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  DRIVER_TYPE_OPTIONS,
  HIRE_PACKAGE_OPTIONS,
  INSURANCE_COVER_OPTIONS,
  TRANSMISSION_OPTIONS,
  WORK_SCHEDULE_OPTIONS,
  cn,
} from "@/lib/utils";
import {
  conciergeRequestSchema,
  type ConciergeRequestFormValues,
} from "@/schemas/requests/hire-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { State } from "country-state-city";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import type { APIResponse } from "@/types/response";
import type { HireRequest } from "@/types/hire";

const NIGERIA = "NG";

const ENGAGEMENT_OPTIONS = [
  { value: "MONTHLY", label: "Full-time (monthly)" },
  { value: "CONTRACT", label: "Contract" },
];

// The concierge path: no driver named - our team matches one, then invoices.
export default function RequestDriver() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ConciergeRequestFormValues>({
    resolver: zodResolver(conciergeRequestSchema),
    defaultValues: {
      package: "PRIVATE",
      drivers_needed: "1",
      engagement_type: "MONTHLY",
      schedule: "WEEKDAYS",
      provides_accommodation: false,
    },
  });

  const selectedPackage = watch("package");

  const states = useMemo(
    () =>
      State.getStatesOfCountry(NIGERIA).map((entry) => ({
        value: entry.name,
        label: entry.name,
      })),
    [],
  );

  const { mutate, isPending } = useSubmitData<
    Record<string, unknown>,
    APIResponse<HireRequest>
  >({
    url: API_ENDPOINTS.hireRequests.create,
    onSuccessMessage:
      "Request sent - we'll match a driver and send your invoice",
    onSuccess: (response) => {
      router.push(`/dashboard/my-hire/requests/${response.data.reference}`);
    },
  });

  const onSubmit = (data: ConciergeRequestFormValues) => {
    mutate({
      ...data,
      drivers_needed: Number(data.drivers_needed),
      duration_months: data.duration_months
        ? Number(data.duration_months)
        : undefined,
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <BackLink href="/dashboard/my-hire" label="Back to My Hire" />

      <AppText type="h2" className="mt-4 text-xl font-bold md:text-2xl">
        Request a driver
      </AppText>
      <AppText type="subtitle" className="text-muted-foreground mt-1 text-sm">
        Tell us what you need - our team matches you with a vetted driver and
        sends you an invoice. You pay nothing now.
      </AppText>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-border mt-6 space-y-4 rounded-2xl border bg-white p-5 md:p-6"
      >
        <Controller
          control={control}
          name="package"
          render={({ field }) => (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {HIRE_PACKAGE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-colors",
                    field.value === option.value
                      ? "border-brand bg-brand/5"
                      : "border-border hover:border-brand/50",
                  )}
                >
                  <AppText type="label" className="text-sm font-semibold">
                    {option.label}
                  </AppText>
                  <AppText
                    type="caption"
                    className="text-muted-foreground mt-1 block text-xs"
                  >
                    {option.blurb}
                  </AppText>
                </button>
              ))}
            </div>
          )}
        />

        {selectedPackage === "SUBSCRIPTION" && (
          <FormInput<ConciergeRequestFormValues>
            control={control}
            name="duration_months"
            errors={errors}
            label="For how many months?"
            inputMode="numeric"
            placeholder="E.g 6"
          />
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput<ConciergeRequestFormValues>
            control={control}
            name="drivers_needed"
            errors={errors}
            label="How many drivers?"
            inputMode="numeric"
          />
          <FormSelect<ConciergeRequestFormValues>
            control={control}
            name="driver_type"
            errors={errors}
            label="Type of driver (optional)"
            options={DRIVER_TYPE_OPTIONS}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormSelect<ConciergeRequestFormValues>
            control={control}
            name="engagement_type"
            errors={errors}
            label="Engagement type"
            options={ENGAGEMENT_OPTIONS}
          />
          <FormDatePicker<ConciergeRequestFormValues>
            control={control}
            mode="single"
            name="starts_at"
            errors={errors}
            label="When should they start?"
            minDate={new Date()}
          />
        </div>

        <FormSelect<ConciergeRequestFormValues>
          control={control}
          name="schedule"
          errors={errors}
          label="Work schedule"
          options={WORK_SCHEDULE_OPTIONS}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput<ConciergeRequestFormValues>
            control={control}
            name="resumption_time"
            errors={errors}
            label="Resumption time (optional)"
            type="time"
          />
          <FormInput<ConciergeRequestFormValues>
            control={control}
            name="closing_time"
            errors={errors}
            label="Closing time (optional)"
            type="time"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormSelect<ConciergeRequestFormValues>
            control={control}
            name="transmission"
            errors={errors}
            label="Vehicle transmission (optional)"
            options={TRANSMISSION_OPTIONS}
          />
          <FormSelect<ConciergeRequestFormValues>
            control={control}
            name="insurance_cover"
            errors={errors}
            label="Insurance on the vehicle (optional)"
            options={INSURANCE_COVER_OPTIONS}
          />
        </div>

        <Controller
          control={control}
          name="provides_accommodation"
          render={({ field }) => (
            <label className="border-border flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4">
              <span>
                <AppText type="label" className="block text-sm font-semibold">
                  Accommodation provided?
                </AppText>
                <AppText
                  type="caption"
                  className="text-muted-foreground text-xs"
                >
                  Whether you can house the driver - it widens who can take the
                  job.
                </AppText>
              </span>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </label>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormSelect<ConciergeRequestFormValues>
            control={control}
            name="state"
            errors={errors}
            label="State"
            options={states}
          />
          <FormInput<ConciergeRequestFormValues>
            control={control}
            name="nearest_area"
            errors={errors}
            label="Nearest area (optional)"
            placeholder="E.g Lekki Phase 1"
          />
        </div>

        <FormTextarea<ConciergeRequestFormValues>
          control={control}
          name="note"
          errors={errors}
          label="Anything else we should know? (optional)"
          placeholder="E.g school runs on weekdays, occasional weekend trips"
        />

        <Button
          isLoading={isPending}
          className="h-12 w-full rounded-lg text-sm"
        >
          Submit request
        </Button>
      </form>
    </div>
  );
}
