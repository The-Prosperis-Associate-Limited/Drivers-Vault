"use client";

import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { AppSheet } from "@/components/shared/app-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { cn, formatRelativeTime, groupByRecency } from "@/lib/utils";
import { BellOff } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AppNotification } from "@/types/notification";
import type { PaginatedResponse } from "@/types/response";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const listUrl = API_ENDPOINTS.notifications.list({ page: 1, limit: 30 });

export const NotificationsSheet = function ({ open, onOpenChange }: Props) {
  const router = useRouter();

  const { data, isFetching } = useGetData<PaginatedResponse<AppNotification>>({
    url: listUrl,
    shouldFetch: open,
  });

  const { mutate: markAllAsRead } = useSubmitData({
    url: API_ENDPOINTS.notifications.markAllAsRead,
    method: "patch",
    onSuccessMessage: "All notifications marked as read",
    additionalQueryKeys: [[listUrl], [API_ENDPOINTS.notifications.unreadCount]],
  });

  const { mutate: markAsRead } = useSubmitData<{ id: string }>({
    url: (payload) => API_ENDPOINTS.notifications.markAsRead(payload.id),
    method: "patch",
    onSuccessMessage: "Marked as read",
    additionalQueryKeys: [[listUrl], [API_ENDPOINTS.notifications.unreadCount]],
  });

  const notifications = data?.data ?? [];

  // The design groups by Today / Yesterday / This week; the order the server
  // returns is already newest-first, so grouping keeps that order.
  const groups = notifications.reduce<Record<string, AppNotification[]>>(
    (accumulator, notification) => {
      const key = groupByRecency(notification.createdAt);
      accumulator[key] = [...(accumulator[key] ?? []), notification];
      return accumulator;
    },
    {},
  );

  return (
    <AppSheet
      isOpen={open}
      onOpenChange={onOpenChange}
      title="Notifications"
      width="480px"
    >
      <div className="space-y-5">
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => markAllAsRead({})}
            className="text-brand cursor-pointer text-sm font-semibold underline underline-offset-2"
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-5">
          {isFetching && !notifications.length ? (
            <div className="space-y-3">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          ) : !notifications.length ? (
            <EmptyState
              icon={BellOff}
              title="Nothing here yet"
              description="Job requests, payouts and verification updates will show up here."
            />
          ) : (
            Object.entries(groups).map(([label, items]) => (
              <div key={label} className="space-y-2">
                <AppText type="caption" className="text-muted-foreground block">
                  {label}
                </AppText>

                {items.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => {
                      if (notification.status === "UNREAD") {
                        markAsRead({ id: notification.id });
                      }
                      if (notification.actionUrl) {
                        onOpenChange(false);
                        router.push(notification.actionUrl);
                      }
                    }}
                    className={cn(
                      "w-full cursor-pointer rounded-xl p-4 text-left transition-colors",
                      notification.status === "UNREAD"
                        ? "bg-brand-soft"
                        : "bg-gray-50",
                    )}
                  >
                    <AppText type="caption" className="text-foreground block">
                      {notification.title && (
                        <span className="text-brand font-semibold">
                          {notification.title}{" "}
                        </span>
                      )}
                      {notification.message}
                    </AppText>

                    <AppText
                      type="caption"
                      className="text-muted-foreground mt-2 block"
                    >
                      {formatRelativeTime(notification.createdAt)}
                    </AppText>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </AppSheet>
  );
};
