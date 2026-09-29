import z from "zod";

export const hireRequestSchema = z.object({
  engagement_type: z.enum(["MONTHLY", "CONTRACT"], {
    message: "Pick an engagement type",
  }),
  starts_at: z.string().min(1, "Pick a start date"),
  schedule: z.enum(
    ["WEEKDAYS", "WEEKDAYS_AND_SATURDAY", "FULL_WEEK", "CUSTOM"],
    { message: "Pick a work schedule" },
  ),
  resumption_time: z.string().optional(),
  closing_time: z.string().optional(),
  transmission: z.enum(["AUTOMATIC", "MANUAL", "BOTH"]).optional(),
  note: z
    .string()
    .trim()
    .max(1000, "Keep the note under 1000 characters")
    .optional(),
});

export type HireRequestFormValues = z.infer<typeof hireRequestSchema>;

export const conciergeRequestSchema = z.object({
  package: z.enum(["PRIVATE", "SUBSCRIPTION"], {
    message: "Pick a package",
  }),
  duration_months: z.string().optional(),
  drivers_needed: z
    .string()
    .min(1, "How many drivers do you need?")
    .refine((value) => {
      const parsed = Number(value);
      return Number.isInteger(parsed) && parsed >= 1 && parsed <= 50;
    }, "Between 1 and 50 drivers"),
  driver_type: z
    .enum(
      [
        "CORPORATE_DRIVER",
        "PRIVATE_DRIVER",
        "LOGISTICS_DRIVER",
        "RIDE_HAILING_DRIVER",
        "HEAVY_DUTY_DRIVER",
      ],
      { message: "Pick a driver type" },
    )
    .optional(),
  engagement_type: z.enum(["MONTHLY", "CONTRACT"], {
    message: "Pick an engagement type",
  }),
  starts_at: z.string().min(1, "Pick a start date"),
  schedule: z.enum(
    ["WEEKDAYS", "WEEKDAYS_AND_SATURDAY", "FULL_WEEK", "CUSTOM"],
    { message: "Pick a work schedule" },
  ),
  resumption_time: z.string().optional(),
  closing_time: z.string().optional(),
  transmission: z.enum(["AUTOMATIC", "MANUAL", "BOTH"]).optional(),
  insurance_cover: z.string().optional(),
  provides_accommodation: z.boolean(),
  state: z.string().min(1, "Pick your state"),
  nearest_area: z
    .string()
    .trim()
    .max(120, "Keep it under 120 characters")
    .optional(),
  note: z
    .string()
    .trim()
    .max(1000, "Keep the note under 1000 characters")
    .optional(),
});

export type ConciergeRequestFormValues = z.infer<typeof conciergeRequestSchema>;
