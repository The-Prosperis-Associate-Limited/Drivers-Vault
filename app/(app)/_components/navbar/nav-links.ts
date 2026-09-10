import {
  BookOpen,
  BriefcaseBusiness,
  LayoutGrid,
  ReceiptText,
  Settings,
  WalletMinimal,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "My Hire", href: "/dashboard/my-hire", icon: BriefcaseBusiness },
  { label: "Request", href: "/dashboard/requests", icon: BookOpen },
  { label: "Wallet", href: "/dashboard/wallet", icon: WalletMinimal },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: ReceiptText,
  },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
