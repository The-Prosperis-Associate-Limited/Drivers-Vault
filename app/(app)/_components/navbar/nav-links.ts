import {
  BookOpen,
  BriefcaseBusiness,
  LayoutGrid,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Wallet and Transactions left the nav with the org-account payment pivot —
// the routes still exist but nothing links to them.
export const NAV_LINKS: NavLink[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "My Hire", href: "/dashboard/my-hire", icon: BriefcaseBusiness },
  { label: "Request", href: "/dashboard/requests", icon: BookOpen },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
