"use client";

import { AppText } from "@/components/shared/app-text";
import { StatCard } from "@/components/shared/stat-card";
import { useGetData } from "@/hooks/use-get-data";
import { useGetProfile } from "@/hooks/use-get-profile";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { AdminDashboardStats } from "@/types/admin";
import { GrowthChart } from "./_components/growth-chart";
import { VerificationQueue } from "./_components/verification-queue";

export default function AdminOverview() {
  const { profile } = useGetProfile();

  const { data } = useGetData<APIResponse<AdminDashboardStats>>({
    url: API_ENDPOINTS.adminDashboard.stats,
  });

  const stats = data?.data;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          Welcome back, {profile?.first_name ?? "Admin"}
        </AppText>
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          Here's what's happening across your account.
        </AppText>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total users"
          value={stats ? String(stats.total_users) : "—"}
          caption={
            stats ? `${stats.drivers} drivers · ${stats.clients} clients` : " "
          }
          captionTone="muted"
        />
        <StatCard
          label="Active drivers"
          value={stats ? String(stats.active_drivers) : "—"}
          caption="Verified and discoverable"
          captionTone="muted"
        />
        <StatCard
          label="Open requests"
          value={stats ? String(stats.open_requests) : "—"}
          caption="Awaiting match or in progress"
          captionTone="muted"
        />
        <StatCard
          label="Pending verifications"
          value={stats ? String(stats.pending_verifications) : "—"}
          caption={
            stats && stats.pending_verifications > 0
              ? "Need your attention"
              : "All clear"
          }
          captionTone={
            stats && stats.pending_verifications > 0 ? "warning" : "muted"
          }
        />
      </div>

      <GrowthChart />

      <VerificationQueue />
    </div>
  );
}
