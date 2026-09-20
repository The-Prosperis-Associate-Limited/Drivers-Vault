"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const createCourseSchema = z.object({
  title: z.string().trim().min(3, "Give the course a title"),
  summary: z.string().trim().min(10, "Describe what drivers will see"),
  category: z.string().trim().min(1, "Select a category"),
  estimated_minutes: z.coerce
    .number<number>()
    .int()
    .min(1, "How long does it take?"),
  is_required: z.boolean(),
});

type CreateCourseFormValues = z.infer<typeof createCourseSchema>;

const CATEGORY_OPTIONS = [
  { value: "CORE", label: "Core" },
  { value: "SAFETY", label: "Safety" },
  { value: "PAYMENTS", label: "Payments" },
  { value: "SPY_DRIVER", label: "Spy-Driver" },
];

const DURATION_OPTIONS = [
  { value: "15", label: "15 min" },
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "1 hr" },
  { value: "90", label: "1 hr 30 min" },
  { value: "120", label: "2 hrs" },
];

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  coursesUrl: string;
}

// Course files (video/PDF) live on modules, not the course — the server refuses
// to publish an empty course, so creation lands in drafts until modules exist.
export const CreateCourseDialog = function ({
  isOpen,
  onOpenChange,
  coursesUrl,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCourseFormValues>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: { is_required: false },
  });

  const { mutate: createCourse, isPending } = useSubmitData<
    CreateCourseFormValues & { slug: string }
  >({
    url: API_ENDPOINTS.adminTraining.createCourse,
    method: "post",
    onSuccessMessage: "Course created as a draft — add modules to publish it",
    additionalQueryKeys: [[coursesUrl]],
    onSuccess: () => {
      reset();
      onOpenChange(false);
    },
  });

  const onSubmit = (data: CreateCourseFormValues) =>
    createCourse({
      ...data,
      slug: data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    });

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Add new course"
      description="Create the course shell, then attach video or PDF modules before publishing."
      width="560px"
      dialogFooter={
        <div className="flex w-full justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button isLoading={isPending} onClick={handleSubmit(onSubmit)}>
            Create Course
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput<CreateCourseFormValues>
          control={control}
          name="title"
          errors={errors}
          label="Course title"
          placeholder="E.g Professional communication"
        />

        <FormTextarea<CreateCourseFormValues>
          control={control}
          name="summary"
          errors={errors}
          label="What drivers will see"
          placeholder="A short summary shown on the course card..."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormSelect<CreateCourseFormValues>
            control={control}
            name="category"
            errors={errors}
            label="Category"
            placeholder="E.g Core"
            options={CATEGORY_OPTIONS}
          />

          <FormSelect<CreateCourseFormValues>
            control={control}
            name="estimated_minutes"
            errors={errors}
            label="Duration"
            placeholder="E.g 45 min"
            options={DURATION_OPTIONS}
          />
        </div>

        <Controller
          control={control}
          name="is_required"
          render={({ field }) => (
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
              />
              Required for certification
            </label>
          )}
        />
      </form>
    </AppDialog>
  );
};
