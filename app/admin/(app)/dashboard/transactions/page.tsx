"use client";

import { AppTabs } from "@/components/shared/app-tabs";
import { AppText } from "@/components/shared/app-text";
import { StatCard } from "@/components/shared/stat-card";
import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { formatMoneyCompact } from "@/lib/utils";
import { useState } from "react";
import type { APIResponse } from "@/types/response";
import type { AdminTransactionStats } from "@/types/admin";
import { PayoutsTab } from "./_components/payouts-tab";
import { ServiceFeesTab } from "./_components/service-fees-tab";
import { WalletsTab } from "./_components/wallets-tab";

type Tab = "wallet" | "payout" | "service-fee";

export default function AdminTransactions() {
  const [tab, setTab] = useState<Tab>("wallet");

  const { data } = useGetData<APIResponse<AdminTransactionStats>>({
    url: API_ENDPOINTS.adminTransactions.stats,
  });

  const stats = data?.data;
  const currency = stats?.currency ?? "NGN";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          Transactions &amp; revenue logs
        </AppText>
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          Track and analyze all financial transactions on the platform.
        </AppText>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Held in client wallets"
          value={
            stats
              ? formatMoneyCompact(stats.held_in_client_wallets_minor, currency)
              : "—"
          }
          caption="Available + escrow"
          captionTone="muted"
        />
        <StatCard
          label="Paid to drivers"
          value={
            stats
              ? formatMoneyCompact(stats.paid_to_drivers_minor, currency)
              : "—"
          }
          caption={stats ? `${stats.paid_payouts} settled payouts` : " "}
          captionTone="muted"
        />
        <StatCard
          label="Awaiting release"
          value={stats ? String(stats.awaiting_release.count) : "—"}
          caption={
            stats
              ? `${formatMoneyCompact(stats.awaiting_release.amount_minor, currency)} escrowed`
              : " "
          }
          captionTone="muted"
        />
        <StatCard
          label="Failed payments"
          value={stats ? String(stats.failed_payouts) : "—"}
          caption={
            stats && stats.failed_payouts > 0 ? "Need attention" : "All clear"
          }
          captionTone={stats && stats.failed_payouts > 0 ? "warning" : "muted"}
        />
      </div>

      <div className="border-border rounded-2xl border bg-white p-5 md:p-6">
        <AppTabs<Tab>
          value={tab}
          onValueChange={setTab}
          variant="outline"
          tabs={[
            { value: "wallet", label: "WALLET" },
            { value: "payout", label: "PAYOUT" },
            { value: "service-fee", label: "SERVICE FEE" },
          ]}
        />

        <div className="mt-4">
          {tab === "wallet" && <WalletsTab />}
          {tab === "payout" && <PayoutsTab />}
          {tab === "service-fee" && <ServiceFeesTab />}
        </div>
      </div>
    </div>
  );
}
