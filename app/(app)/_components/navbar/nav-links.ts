import {
  BookOpen,
  Briefcase,
  CreditCard,
  LayoutGrid,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "My drivers", href: "/dashboard/my-drivers", icon: Briefcase },
  { label: "Request", href: "/dashboard/requests", icon: BookOpen },
  { label: "Billings and plan", href: "/dashboard/billing", icon: CreditCard },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
