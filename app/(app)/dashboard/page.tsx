"use client";

import { AppText } from "@/components/shared/app-text";
import { StatCard } from "@/components/shared/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useDashboardStats } from "./_hooks/use-dashboard";

export default function DashboardOverview() {
  const { profile } = useGetProfile();
  const { stats, isFetching } = useDashboardStats();

  const displayName =
    profile?.client_profile?.organisation_name || profile?.first_name;

  const cards = [
    {
      label: "Active drivers",
      value: stats?.active_drivers,
      caption: "Currently engaged",
    },
    {
      label: "Open requests",
      value: stats?.open_requests,
      caption: "Awaiting placement",
    },
    {
      label: "In request list",
      value: stats?.request_list,
      caption: "Not yet submitted",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <AppText type="h2" className="text-xl font-bold md:text-2xl">
        {displayName ? `Welcome back, ${displayName}` : "Welcome back"}
      </AppText>
      <AppText type="subtitle" className="text-muted-foreground mt-1 text-sm">
        Here's what's happening across your account.
      </AppText>

      <div className="border-border mt-5 border-t" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isFetching && !stats
          ? cards.map((card) => (
              <Skeleton key={card.label} className="h-[120px] rounded-xl" />
            ))
          : cards.map((card) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value ?? 0}
                caption={card.caption}
                captionTone="muted"
              />
            ))}
      </div>
    </div>
  );
}
