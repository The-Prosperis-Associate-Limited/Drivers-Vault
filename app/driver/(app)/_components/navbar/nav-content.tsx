"use client";

import { AppText } from "@/components/shared/app-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TegatLogo } from "@/components/svg/logo";
import { cn, getInitials } from "@/lib/utils";
import { BadgeCheck, ChevronDown, ListChecks } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DriverVerificationStatus } from "@/types/driver";
import { FOOTER_LINKS, NAV_LINKS, type NavLink } from "./nav-links";

interface Props {
  status?: DriverVerificationStatus;
  user?: {
    first_name: string | null;
    last_name: string | null;
    profile_pic: string | null;
    state_of_residence: string | null;
    country: string | null;
  };
  onNavigate?: () => void;
}

export const NavContent = function ({ status, user, onNavigate }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/driver/dashboard"
      ? pathname === href
      : pathname.startsWith(href);

  const location = [user?.state_of_residence, user?.country]
    .filter(Boolean)
    .join(", ");

  const renderLink = (link: NavLink, footer = false) => {
    const Icon = link.icon;
    const active = isActive(link.href);
    // Children only unfold once the section is the one being looked at, so the
    // sidebar stays four rows tall the rest of the time.
    const expanded = active && !!link.children?.length;

    return (
      <div key={link.href}>
        <Link
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
          {!!link.children?.length && (
            <ChevronDown
              className={cn(
                "ml-auto h-4 w-4 shrink-0 transition-transform",
                expanded && "rotate-180",
              )}
            />
          )}
        </Link>

        {expanded &&
          link.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className={cn(
                "block rounded-lg py-2 pl-11 text-sm font-medium transition-colors",
                pathname === child.href
                  ? "text-brand"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {child.label}
            </Link>
          ))}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-center px-6 py-4">
        <Link href="/driver/dashboard" onClick={onNavigate}>
          <TegatLogo size={40} />
        </Link>
      </div>

      <Link
        href="/driver/onboarding"
        onClick={onNavigate}
        className="text-muted-foreground hover:text-foreground flex items-center gap-3 px-6 pb-3 transition-colors"
      >
        <ListChecks className="h-5 w-5 shrink-0" />
        <AppText
          type="caption"
          className="font-semibold tracking-wide uppercase"
        >
          Get started
        </AppText>
      </Link>

      <div className="border-border mx-6 border-t" />

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_LINKS.map((link) => renderLink(link))}
      </nav>

      <div className="space-y-1 px-3 pb-4">
        {FOOTER_LINKS.map((link) => renderLink(link, true))}
      </div>

      <div className="border-border flex items-center gap-3 border-t px-5 py-4">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.profile_pic ?? undefined} alt="" />
            <AvatarFallback>
              {getInitials(user?.first_name, user?.last_name)}
            </AvatarFallback>
          </Avatar>
          {status === "APPROVED" && (
            <BadgeCheck className="fill-brand absolute -right-0.5 -bottom-0.5 h-4 w-4 text-white" />
          )}
        </div>

        <div className="min-w-0">
          <AppText type="label" className="block truncate">
            {user?.first_name ?? "Driver"}
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
