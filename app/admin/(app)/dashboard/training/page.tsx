"use client";

import { AppTabs } from "@/components/shared/app-tabs";
import { AppText } from "@/components/shared/app-text";
import { StatCard } from "@/components/shared/stat-card";
import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { useState } from "react";
import type { APIResponse } from "@/types/response";
import type { AdminTrainingStats } from "@/types/admin";
import { CoursesTab } from "./_components/courses-tab";
import { ProgressTab } from "./_components/progress-tab";

type Tab = "courses" | "progress";

export default function AdminTraining() {
  const [tab, setTab] = useState<Tab>("courses");

  const { data } = useGetData<APIResponse<AdminTrainingStats>>({
    url: API_ENDPOINTS.adminTraining.stats,
  });

  const stats = data?.data;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          Training
        </AppText>
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          The course library drivers train and certify with.
        </AppText>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard
          label="Published courses"
          value={stats ? String(stats.published) : "—"}
          caption="Visible to drivers"
          captionTone="muted"
        />
        <StatCard
          label="Required for certification"
          value={stats ? String(stats.required) : "—"}
          caption="The certification path"
          captionTone="muted"
        />
        <StatCard
          label="Drafts"
          value={stats ? String(stats.drafts) : "—"}
          caption="Hidden from drivers"
          captionTone="muted"
        />
      </div>

      <div className="border-border rounded-2xl border bg-white p-5 md:p-6">
        <AppTabs<Tab>
          value={tab}
          onValueChange={setTab}
          variant="outline"
          tabs={[
            { value: "courses", label: "COURSES" },
            { value: "progress", label: "DRIVER PROGRESS" },
          ]}
        />

        <div className="mt-4 space-y-4">
          {tab === "courses" ? <CoursesTab /> : <ProgressTab />}
        </div>
      </div>
    </div>
  );
}
