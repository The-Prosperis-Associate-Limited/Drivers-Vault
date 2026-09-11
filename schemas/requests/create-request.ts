import z from "zod";

export const createRequestSchema = z.object({
  title: z.string().trim().min(3, "Give the request a title"),
  description: z
    .string()
    .trim()
    .max(600, "Keep it under 600 characters")
    .optional()
    .or(z.literal("")),
  driver_type: z.string().min(1, "Choose a driver category"),
  engagement_type: z.enum(["MONTHLY", "CONTRACT"]),
  state: z.string().min(1, "Select a state"),
  city: z.string().optional().or(z.literal("")),
  // Major units in the input; the server stores minor units.
  budget: z.string().trim().regex(/^\d+$/, "Digits only, e.g. 250000"),
});

export type CreateRequestFormValues = z.infer<typeof createRequestSchema>;
