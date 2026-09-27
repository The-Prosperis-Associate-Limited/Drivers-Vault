import z from "zod";

export const hireRequestSchema = z.object({
  engagement_type: z.enum(["MONTHLY", "CONTRACT"], {
    message: "Pick an engagement type",
  }),
  starts_at: z.string().min(1, "Pick a start date"),
  note: z
    .string()
    .trim()
    .max(1000, "Keep the note under 1000 characters")
    .optional(),
});

export type HireRequestFormValues = z.infer<typeof hireRequestSchema>;
