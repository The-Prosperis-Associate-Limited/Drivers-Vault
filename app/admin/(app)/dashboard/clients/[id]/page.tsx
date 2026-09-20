"use client";

import { AppTabs } from "@/components/shared/app-tabs";
import { AppText } from "@/components/shared/app-text";
import { BackLink } from "@/components/shared/back-link";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { APIResponse } from "@/types/response";
import type { AdminUserDetail } from "@/types/admin";
import { ActivityTimeline } from "../../../_components/activity-timeline";
import { UserWallet } from "../../../_components/user-wallet";
import { ClientOverview } from "./_components/client-overview";

type Tab = "overview" | "wallet" | "activity";

function ClientDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = (searchParams.get("tab") as Tab) || "overview";

  const { data, isFetching } = useGetData<APIResponse<AdminUserDetail>>({
    url: API_ENDPOINTS.adminUsers.detail(params.id),
  });

  const user = data?.data;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <BackLink href="/admin/dashboard/clients" label="Back to clients" />

      <div>
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          Know your Client.
        </AppText>
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          Review the client's profile, wallet and account activity.
        </AppText>
      </div>

      <AppTabs<Tab>
        value={tab}
        onValueChange={(value) =>
          router.replace(`/admin/dashboard/clients/${params.id}?tab=${value}`)
        }
        variant="chip"
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "wallet", label: "Wallet & Payments" },
          { value: "activity", label: "Activity Log" },
        ]}
      />

      {tab === "overview" &&
        (user ? (
          <ClientOverview user={user} />
        ) : (
          isFetching && <Skeleton className="h-64 w-full rounded-2xl" />
        ))}

      {tab === "wallet" && <UserWallet userId={params.id} />}

      {tab === "activity" && <ActivityTimeline userId={params.id} />}
    </div>
  );
}

export default function ClientDetailPage() {
  return (
    <Suspense fallback={null}>
      <ClientDetail />
    </Suspense>
  );
}
