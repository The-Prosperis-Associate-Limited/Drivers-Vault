"use client";

import { AppText } from "@/components/shared/app-text";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { NotificationPreferences } from "@/types/notification";

type PreferenceKey = keyof NotificationPreferences;

// The preference row is shared with the driver surface; only the keys that
// mean something to a client are surfaced here.
const GROUPS: {
  title: string;
  description?: string;
  items: { key: PreferenceKey; label: string; description: string }[];
}[] = [
  {
    title: "Hiring alerts",
    description: "Choose how you hear about your requests and hires.",
    items: [
      {
        key: "job_requests",
        label: "Booking & request activity",
        description: "When a driver responds to a request or a hire changes.",
      },
      {
        key: "sms_alerts",
        label: "SMS alerts",
        description: "Text me for urgent, time-sensitive updates.",
      },
      {
        key: "client_messages",
        label: "Messages",
        description: "Notify me when I get a new message.",
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        key: "product_news",
        label: "Product news & tips",
        description: "Occasional updates about new Drivers Vault features.",
      },
    ],
  },
];

export const NotificationSettings = function () {
  const { data, isFetching } = useGetData<APIResponse<NotificationPreferences>>(
    { url: API_ENDPOINTS.notifications.preferences },
  );

  const { mutate: savePreference } = useSubmitData<
    Partial<NotificationPreferences>
  >({
    url: API_ENDPOINTS.notifications.preferences,
    method: "put",
    onSuccessMessage: "Notification preferences updated",
  });

  const preferences = data?.data;

  if (isFetching && !preferences) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {GROUPS.map((group) => (
        <div
          key={group.title}
          className="border-border rounded-xl border bg-white p-5 md:p-6"
        >
          <div className="space-y-1">
            <AppText type="h4" className="text-base font-semibold">
              {group.title}
            </AppText>
            {group.description && (
              <AppText type="caption" className="text-muted-foreground block">
                {group.description}
              </AppText>
            )}
          </div>

          <div className="divide-border mt-4 divide-y">
            {group.items.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0 space-y-0.5">
                  <AppText type="label" className="block">
                    {item.label}
                  </AppText>
                  <AppText
                    type="caption"
                    className="text-muted-foreground block"
                  >
                    {item.description}
                  </AppText>
                </div>

                <Switch
                  checked={preferences?.[item.key] ?? false}
                  onCheckedChange={(checked) =>
                    savePreference({ [item.key]: checked })
                  }
                  aria-label={item.label}
                  className="shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
