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

const GROUPS: {
  title: string;
  description?: string;
  items: { key: PreferenceKey; label: string; description: string }[];
}[] = [
  {
    title: "Job alerts",
    description: "Choose how you hear about new requests.",
    items: [
      {
        key: "job_requests",
        label: "New job requests",
        description: "Push notification when a matching job comes in.",
      },
      {
        key: "sms_alerts",
        label: "SMS alerts",
        description: "Text me for urgent, same-day trips.",
      },
      {
        key: "client_messages",
        label: "Client messages",
        description: "Notify me when a client sends a message.",
      },
    ],
  },
  {
    title: "Account & platform",
    items: [
      {
        key: "verification_updates",
        label: "Verification updates",
        description: "Progress on your identity and document checks.",
      },
      {
        key: "training_reminders",
        label: "Training reminders",
        description: "Nudge me about courses that raise my trust score.",
      },
      {
        key: "product_news",
        label: "Product news & tips",
        description: "Occasional updates about new Tegat features.",
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
        <Skeleton className="h-64 w-full rounded-xl" />
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
