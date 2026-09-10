"use client";

import { AppText } from "@/components/shared/app-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TegatLogo } from "@/components/svg/logo";
import { cn, getInitials } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOOTER_LINKS, NAV_LINKS, type NavLink } from "./nav-links";

interface Props {
  user?: {
    display_name: string | null;
    profile_pic: string | null;
    state_of_residence: string | null;
    country: string | null;
  };
  onNavigate?: () => void;
}

export const NavContent = function ({ user, onNavigate }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const location = [user?.state_of_residence, user?.country]
    .filter(Boolean)
    .join(", ");

  const renderLink = (link: NavLink, footer = false) => {
    const Icon = link.icon;
    const active = isActive(link.href);

    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? cn(
                "text-brand bg-brand-soft",
                !footer && "border-brand border-l-[3px]",
              )
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {link.label}
      </Link>
    );
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-center px-6 py-4">
        <Link href="/dashboard" onClick={onNavigate}>
          <TegatLogo size={40} />
        </Link>
      </div>

      <nav className="space-y-1 px-3 py-4">
        {NAV_LINKS.map((link) => renderLink(link))}
      </nav>

      <div className="px-3">
        <Link
          href="/dashboard/requests/find-talent"
          onClick={onNavigate}
          className="border-border hover:border-brand/40 text-ink flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors"
        >
          Hire a driver
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-auto space-y-1 px-3 pb-4">
        {FOOTER_LINKS.map((link) => renderLink(link, true))}
      </div>

      <div className="border-border flex items-center gap-3 border-t px-5 py-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.profile_pic ?? undefined} alt="" />
          <AvatarFallback>{getInitials(user?.display_name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <AppText type="label" className="block truncate">
            {user?.display_name ?? "Client"}
          </AppText>
          <AppText
            type="caption"
            className="text-muted-foreground block truncate"
          >
            {location || "Location not set"}
          </AppText>
        </div>
      </div>
    </div>
  );
};
