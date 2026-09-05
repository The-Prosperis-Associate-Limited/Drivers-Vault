"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationsSheet } from "@/components/notifications/notifications-sheet";
import { SupportSheet } from "@/components/support/support-sheet";
import { TegatLogo } from "@/components/svg/logo";
import { useGetData } from "@/hooks/use-get-data";
import { useGetProfile } from "@/hooks/use-get-profile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { cn, getInitials } from "@/lib/utils";
import { Bell, Headset } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { APIResponse } from "@/types/response";

const LINKS = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Dashboard", href: "/dashboard" },
];

export const MarketplaceHeader = function () {
  const pathname = usePathname();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const { profile } = useGetProfile();

  const { data } = useGetData<APIResponse<{ count: number }>>({
    url: API_ENDPOINTS.notifications.unreadCount,
  });

  const unread = data?.data.count ?? 0;

  return (
    <>
      <header className="border-border border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-8">
          <Link href="/marketplace" aria-label="Marketplace home">
            <TegatLogo size={40} />
          </Link>

          <div className="flex items-center gap-1 md:gap-4">
            <nav className="flex items-center gap-4 md:gap-6">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium underline-offset-4 transition-colors",
                    pathname.startsWith(link.href)
                      ? "text-ink underline"
                      : "text-muted-foreground hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label={
                  unread > 0
                    ? `Notifications, ${unread} unread`
                    : "Notifications"
                }
                onClick={() => setNotificationsOpen(true)}
                className="size-10"
              >
                <span className="relative inline-flex">
                  <Bell className="h-[20px] w-[20px]" />
                  {unread > 0 && (
                    <span className="bg-brand ring-background absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] leading-none font-semibold text-white ring-2">
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Support"
                onClick={() => setSupportOpen(true)}
                className="size-10"
              >
                <Headset className="h-[20px] w-[20px]" />
              </Button>

              <Avatar className="ml-1 h-9 w-9">
                <AvatarImage src={profile?.profile_pic ?? undefined} alt="" />
                <AvatarFallback>
                  {getInitials(profile?.first_name, profile?.last_name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <NotificationsSheet
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
      />
      <SupportSheet open={supportOpen} onOpenChange={setSupportOpen} />
    </>
  );
};
