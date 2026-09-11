"use client";

import { AppInput } from "@/components/shared/app-input";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { Bell, Headset } from "lucide-react";
import { useState } from "react";
import type { APIResponse } from "@/types/response";
import { NotificationsSheet } from "@/components/notifications/notifications-sheet";
import { SupportSheet } from "../support/support-sheet";

interface Props {
  mobileTrigger?: React.ReactNode;
}

export const TopNav = function ({ mobileTrigger }: Props) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const { data } = useGetData<APIResponse<{ count: number }>>({
    url: API_ENDPOINTS.notifications.unreadCount,
  });

  const unread = data?.data.count ?? 0;

  return (
    <>
      <header className="border-border flex h-16 shrink-0 items-center gap-3 border-b bg-white px-4 md:px-6">
        {mobileTrigger}

        <div className="max-w-md flex-1">
          <AppInput
            type="search"
            placeholder="Search here...."
            className="h-10"
          />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              unread > 0 ? `Notifications, ${unread} unread` : "Notifications"
            }
            onClick={() => setNotificationsOpen(true)}
            className="size-10"
          >
            {/* The badge hangs off the icon's corner rather than sitting on it —
                anchored to the icon, not the button, so it clears the glyph. */}
            <span className="relative inline-flex">
              <Bell className="h-[22px] w-[22px]" />
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
            <Headset className="h-[22px] w-[22px]" />
          </Button>
        </div>
      </header>

      <NotificationsSheet
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
        actionUrlPrefix="/driver"
      />
      <SupportSheet open={supportOpen} onOpenChange={setSupportOpen} />
    </>
  );
};
