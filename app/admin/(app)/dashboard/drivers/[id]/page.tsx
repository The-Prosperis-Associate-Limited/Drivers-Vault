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
import { UserWallet } from "../../../_components/user-wallet";
import { DriverDocuments } from "./_components/driver-documents";
import { DriverOverview } from "./_components/driver-overview";

type Tab = "overview" | "documents" | "wallet";

function DriverDetail() {
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
      <BackLink href="/admin/dashboard/drivers" label="Back to drivers" />

      <div>
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          Know your Driver.
        </AppText>
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          Review the driver's profile, documents and wallet before making a
          decision.
        </AppText>
      </div>

      <AppTabs<Tab>
        value={tab}
        onValueChange={(value) =>
          router.replace(`/admin/dashboard/drivers/${params.id}?tab=${value}`)
        }
        variant="chip"
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "documents", label: "KYC Documents" },
          { value: "wallet", label: "Wallet & Payments" },
        ]}
      />

      {tab === "overview" &&
        (user ? (
          <DriverOverview user={user} />
        ) : (
          isFetching && <Skeleton className="h-64 w-full rounded-2xl" />
        ))}

      {tab === "documents" && <DriverDocuments userId={params.id} />}

      {tab === "wallet" && <UserWallet userId={params.id} />}
    </div>
  );
}

export default function DriverDetailPage() {
  return (
    <Suspense fallback={null}>
      <DriverDetail />
    </Suspense>
  );
}
