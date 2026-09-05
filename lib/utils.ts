import { QueryClient } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import type {
  AssignmentType,
  BudgetRange,
  ClientDriverCategory,
  DriversNeededRange,
  HiringTimeline,
} from "@/types/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const queryClient = new QueryClient();

export const passwordValidationRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+.])[A-Za-z\d@$!%*?&#^()\-_=+.]{8,}$/;

export const ENV = {
  get API_URL() {
    return process.env.NEXT_PUBLIC_API_URL ?? "";
  },
} as const;

// Only allow safe, relative, in-app paths — prevents open-redirect via callbackUrl
export const isSafeCallback = function (url: string | null): url is string {
  return !!url && url.startsWith("/") && !url.startsWith("//");
};

// This app is the client surface. A driver signing in here has an account but
// no screens, so they are sent to their own surface rather than dropped into a
// dashboard built for clients. A client lands on the wizard, which forwards
// anyone already onboarded to the dashboard.
export const handleSigninRedirect = function (role: string) {
  if (role === "CLIENT") return "/onboarding";
  return "/";
};

/*
================= NOTE: money — the API returns integers in minor units plus a
currency code. Format at the edge, never compute in major units.
*/

export const currencyMapper = {
  NGN: "₦",
  GHS: "₵",
  KES: "KSh",
  ZAR: "R",
  USD: "$",
  GBP: "£",
  EUR: "€",
  CAD: "C$",
  AED: "د.إ",
} as const;

export const formatMoney = function (
  minor: number | undefined,
  currency = "NGN",
) {
  const symbol =
    currencyMapper[currency as keyof typeof currencyMapper] ?? `${currency} `;

  return `${symbol}${((minor ?? 0) / 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

export const toMinorUnits = (amount: number) => Math.round(amount * 100);

export const toMajorUnits = (minor: number) => minor / 100;

export function formatRelativeTime(date: string | Date) {
  const now = new Date();
  const then = new Date(date);
  const diffMins = Math.floor((now.getTime() - then.getTime()) / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return then.toLocaleDateString();
}

// Notifications group under Today / Yesterday / This week / Earlier
export function groupByRecency(date: string | Date) {
  const then = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfThen = new Date(then);
  startOfThen.setHours(0, 0, 0, 0);

  const dayDiff = Math.round(
    (today.getTime() - startOfThen.getTime()) / 86400000,
  );

  if (dayDiff <= 0) return "Today";
  if (dayDiff === 1) return "Yesterday";
  if (dayDiff < 7) return "This week";
  return "Earlier";
}

export const formatDate = (date: string | Date) =>
  format(new Date(date), "d MMM yyyy");

export const formatDateTime = (date: string | Date) =>
  format(new Date(date), "d MMM yyyy 'at' h:mm a");

export const formatTime = (date: string | Date) =>
  format(new Date(date), "h:mm a");

export const greetingForNow = function () {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const getInitials = function (
  firstName?: string | null,
  lastName?: string | null,
) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?";
};

/*
================= NOTE: the option lists the search selects render. These
mirror the server enums exactly — a value that is not in the server enum is a
400 the client cannot fix.
*/

export const DRIVER_TYPE_OPTIONS = [
  { value: "CORPORATE_DRIVER", label: "Corporate Driver" },
  { value: "PRIVATE_DRIVER", label: "Private Driver" },
  { value: "LOGISTICS_DRIVER", label: "Logistics Driver" },
  { value: "RIDE_HAILING_DRIVER", label: "Ride Hailing Driver" },
  { value: "HEAVY_DUTY_DRIVER", label: "Heavy Duty Driver" },
];

/*
================= NOTE: onboarding — the step order the wizard runs in, and the
option lists its cards render. Values mirror the server enums exactly — a value
that is not in the server enum is a 400 the client cannot fix.
*/

export const ONBOARDING_STEPS = [
  { path: "/onboarding/hire-type", label: "How will you hire?" },
  { path: "/onboarding/category", label: "Category of drivers" },
  { path: "/onboarding/capacity", label: "How many, and for how long" },
  { path: "/onboarding/location", label: "Where and when" },
  { path: "/onboarding/budget", label: "Budget per driver" },
] as const;

export const CLIENT_DRIVER_CATEGORY_OPTIONS: {
  value: ClientDriverCategory;
  label: string;
  blurb: string;
}[] = [
  {
    value: "CONTRACT",
    label: "Contract driver",
    blurb: "Hiring for myself or family",
  },
  {
    value: "PRIVATE",
    label: "Private driver",
    blurb: "Hiring for myself or family",
  },
  {
    value: "CORPORATE",
    label: "Corporate driver",
    blurb: "Hiring for a company",
  },
  {
    value: "EXECUTIVE",
    label: "Executive driver",
    blurb: "Hiring for myself or family",
  },
  {
    value: "SPY",
    label: "Spy drivers",
    blurb: "Hiring for myself or family",
  },
  {
    value: "EXPATRIATE",
    label: "Expatriate drivers",
    blurb: "Hiring for a company",
  },
];

export const DRIVERS_NEEDED_OPTIONS: {
  value: DriversNeededRange;
  label: string;
}[] = [
  { value: "ONE", label: "1" },
  { value: "TWO_TO_FIVE", label: "2–5" },
  { value: "SIX_TO_FIFTEEN", label: "6–15" },
  { value: "SIXTEEN_PLUS", label: "16+" },
];

export const ASSIGNMENT_TYPE_OPTIONS: {
  value: AssignmentType;
  label: string;
}[] = [
  { value: "PERMANENT", label: "Permanent" },
  { value: "TEMPORARY", label: "Temporary / Short-term" },
];

export const HIRING_TIMELINE_OPTIONS: {
  value: HiringTimeline;
  label: string;
}[] = [
  { value: "IMMEDIATELY", label: "Immediately" },
  { value: "WITHIN_TWO_WEEKS", label: "Within 2 weeks" },
  { value: "THIS_MONTH", label: "This month" },
  { value: "EXPLORING", label: "Just exploring" },
];

export const BUDGET_RANGE_OPTIONS: { value: BudgetRange; label: string }[] = [
  { value: "RANGE_150_200K", label: "₦150k – ₦200k / month" },
  { value: "RANGE_201_250K", label: "₦201k – ₦250k / month" },
  { value: "RANGE_251_300K", label: "₦251k – ₦300k / month" },
  { value: "RANGE_301K_PLUS", label: "₦301k / per month and above" },
];
