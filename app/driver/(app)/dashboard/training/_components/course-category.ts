import {
  BookOpen,
  Car,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

interface CategoryStyle {
  icon: LucideIcon;
  label: string;
  text: string;
  tile: string;
}

// The designer's own glyphs are not exported yet, so these are Lucide stand-ins
// in the same tinted tile. `category` is free text on the server — anything not
// listed falls back to the neutral style rather than rendering nothing.
const CATEGORIES: Record<string, CategoryStyle> = {
  ONBOARDING: {
    icon: BookOpen,
    label: "Onboarding",
    text: "text-indigo-600",
    tile: "bg-indigo-50 text-indigo-600",
  },
  SAFETY: {
    icon: ShieldCheck,
    label: "Safety",
    text: "text-emerald-600",
    tile: "bg-emerald-50 text-emerald-600",
  },
  PAYMENTS: {
    icon: Wallet,
    label: "Payments",
    text: "text-amber-600",
    tile: "bg-amber-50 text-amber-600",
  },
  DRIVING: {
    icon: Car,
    label: "Driving",
    text: "text-violet-600",
    tile: "bg-violet-50 text-violet-600",
  },
  MAINTENANCE: {
    icon: Wrench,
    label: "Maintenance",
    text: "text-orange-600",
    tile: "bg-orange-50 text-orange-600",
  },
  GROWTH: {
    icon: TrendingUp,
    label: "Growth",
    text: "text-pink-600",
    tile: "bg-pink-50 text-pink-600",
  },
};

const FALLBACK: CategoryStyle = {
  icon: BookOpen,
  label: "Course",
  text: "text-muted-foreground",
  tile: "bg-brand-soft text-brand",
};

export const categoryStyle = function (category: string | null) {
  if (!category) return FALLBACK;

  return CATEGORIES[category.toUpperCase()] ?? { ...FALLBACK, label: category };
};
