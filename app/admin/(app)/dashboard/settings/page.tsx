"use client";

import { AppTabs } from "@/components/shared/app-tabs";
import { AppText } from "@/components/shared/app-text";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ActivityTimeline } from "../../_components/activity-timeline";
import { NotificationsTab } from "./_components/notifications-tab";
import { ProfileTab } from "./_components/profile-tab";
import { SecurityTab } from "./_components/security-tab";
import { TeamTab } from "./_components/team-tab";

type Tab = "profile" | "security" | "notifications" | "activity" | "team";

function AdminSettings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profile } = useGetProfile();

  const tab = (searchParams.get("tab") as Tab) || "profile";

  // Pre-roles admins have no profile row and are treated as supers.
  const isSuperAdmin =
    !profile?.admin_profile ||
    profile.admin_profile.admin_role === "SUPER_ADMIN";

  const tabs: { value: Tab; label: string }[] = [
    { value: "profile", label: "Account Profile" },
    { value: "security", label: "Security" },
    { value: "notifications", label: "Notification Preferences" },
    { value: "activity", label: "Activity Log" },
    ...(isSuperAdmin
      ? [{ value: "team" as const, label: "Roles and Permission" }]
      : []),
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          Settings
        </AppText>
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          Your account, security and console access.
        </AppText>
      </div>

      <AppTabs<Tab>
        value={tab}
        onValueChange={(value) =>
          router.replace(`/admin/dashboard/settings?tab=${value}`)
        }
        variant="pill"
        tabs={tabs}
      />

      {tab === "profile" && <ProfileTab />}
      {tab === "security" && <SecurityTab />}
      {tab === "notifications" && <NotificationsTab />}
      {tab === "activity" && profile && (
        <ActivityTimeline userId={profile.id} />
      )}
      {tab === "team" && isSuperAdmin && <TeamTab />}
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <Suspense fallback={null}>
      <AdminSettings />
    </Suspense>
  );
}
