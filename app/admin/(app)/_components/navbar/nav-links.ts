import {
  ArrowLeftRight,
  GraduationCap,
  LayoutGrid,
  Settings,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const ADMIN_NAV_LINKS: AdminNavLink[] = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/admin/dashboard/drivers", label: "Driver", icon: UserRound },
  { href: "/admin/dashboard/clients", label: "Client", icon: UsersRound },
  {
    href: "/admin/dashboard/transactions",
    label: "Transaction",
    icon: ArrowLeftRight,
  },
  {
    href: "/admin/dashboard/training",
    label: "Training",
    icon: GraduationCap,
  },
];

export const ADMIN_FOOTER_LINKS: AdminNavLink[] = [
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];
