import {
  BookOpen,
  Briefcase,
  LayoutGrid,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string }[];
}

/*
  Earnings is no longer a top-level destination — the wallet, withdrawals and
  payout accounts live on the Settings > Earnings tab, and /dashboard/earnings
  redirects there. Every endpoint behind it still 403s an unverified driver, so
  nothing here is a security boundary.
*/
export const NAV_LINKS: NavLink[] = [
  { label: "Overview", href: "/driver/dashboard", icon: LayoutGrid },
  {
    label: "Job Request",
    href: "/driver/dashboard/job-request",
    icon: Briefcase,
  },
  {
    label: "Training",
    href: "/driver/dashboard/training",
    icon: BookOpen,
    children: [
      { label: "Courses", href: "/driver/dashboard/training/courses" },
    ],
  },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "Settings", href: "/driver/dashboard/settings", icon: Settings },
];
