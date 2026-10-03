"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { AppDialog } from "@/components/shared/app-dialog";
import { Button } from "@/components/ui/button";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { lgaOptionsForState } from "@/lib/nigeria-lgas";
import {
  AGE_RANGE_OPTIONS,
  DRIVER_TYPE_OPTIONS,
  ETHNICITY_OPTIONS,
  RELIGION_PREFERENCE_OPTIONS,
} from "@/lib/utils";
import {
  createRequestSchema,
  type CreateRequestFormValues,
} from "@/schemas/requests/create-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { State } from "country-state-city";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const NIGERIA = "NG";

const ENGAGEMENT_OPTIONS = [
  { value: "MONTHLY", label: "Full-time" },
  { value: "CONTRACT", label: "Contract" },
];

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  // The list url currently on screen - creating a request refetches it.
  listUrl: string;
}

export const CreateRequestDialog = function ({
  isOpen,
  onOpenChange,
  listUrl,
}: Props) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateRequestFormValues>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      title: "",
      description: "",
      driver_type: "",
      engagement_type: "MONTHLY",
      state: "",
      city: "",
      budget: "",
      preferred_ethnicity: "",
      preferred_religion: "",
      preferred_age_range: "",
    },
  });

  const state = watch("state");

  // A city from the previous state is not a valid pick for the new one.
  useEffect(() => {
    setValue("city", "");
  }, [state, setValue]);

  const states = useMemo(
    () =>
      State.getStatesOfCountry(NIGERIA).map((entry) => ({
        value: entry.name,
        label: entry.name,
      })),
    [],
  );

  const cities = useMemo(() => lgaOptionsForState(state), [state]);

  const { mutate, isPending } = useSubmitData({
    url: API_ENDPOINTS.requests.create,
    onSuccessMessage: "Request posted",
    additionalQueryKeys: [[listUrl]],
    onSuccess: () => {
      reset();
      onOpenChange(false);
    },
  });

  const submit = (values: CreateRequestFormValues) => {
    mutate({
      title: values.title,
      description: values.description || undefined,
      driver_type: values.driver_type,
      engagement_type: values.engagement_type,
      state: values.state,
      city: values.city || undefined,
      budget: Number(values.budget),
      preferred_ethnicity: values.preferred_ethnicity || undefined,
      preferred_religion: values.preferred_religion || undefined,
      preferred_age_range: values.preferred_age_range || undefined,
    });
  };

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Post a request"
      description="Tell drivers what you need - matched profiles see it and apply."
      width="520px"
      isSubmitting={isPending}
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <FormInput
          control={control}
          name="title"
          errors={errors}
          label="Title"
          placeholder="E.g Executive corporate driver"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormSelect
            control={control}
            name="driver_type"
            errors={errors}
            options={DRIVER_TYPE_OPTIONS}
            label="Driver category"
            placeholder="Select a category"
          />
          <FormSelect
            control={control}
            name="engagement_type"
            errors={errors}
            options={ENGAGEMENT_OPTIONS}
            label="Engagement"
            placeholder="Select"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormSelect
            control={control}
            name="state"
            errors={errors}
            options={states}
            label="State"
            placeholder="Select a state"
          />
          <FormSelect
            control={control}
            name="city"
            errors={errors}
            options={cities}
            label="City / LGA"
            placeholder={state ? "Select a city" : "Pick a state first"}
            disabled={!state}
          />
        </div>

        <FormInput
          control={control}
          name="budget"
          errors={errors}
          label="Monthly budget (₦)"
          placeholder="E.g 250000"
          inputMode="numeric"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormSelect
            control={control}
            name="preferred_ethnicity"
            errors={errors}
            options={ETHNICITY_OPTIONS}
            label="Ethnicity (optional)"
            placeholder="Any"
          />
          <FormSelect
            control={control}
            name="preferred_religion"
            errors={errors}
            options={RELIGION_PREFERENCE_OPTIONS}
            label="Religion (optional)"
            placeholder="Any"
          />
          <FormSelect
            control={control}
            name="preferred_age_range"
            errors={errors}
            options={AGE_RANGE_OPTIONS}
            label="Age range (optional)"
            placeholder="Any"
          />
        </div>

        <FormTextarea
          control={control}
          name="description"
          errors={errors}
          label="Description"
          placeholder="Routes, schedule, vehicle - anything a driver should know before applying."
          rows={4}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 w-full rounded-xl text-sm"
        >
          {isPending ? "Posting…" : "Post request"}
        </Button>
      </form>
    </AppDialog>
  );
};
