"use client";

import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { HireRow } from "@/components/hires/hire-row";
import { Pagination } from "@/components/shared/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { BriefcaseBusiness } from "lucide-react";
import { useState } from "react";
import { useHires } from "./_hooks/use-hires";

export default function MyHire() {
  const [page, setPage] = useState(1);

  const { hires, total, totalPages, isFetching } = useHires({ page });

  return (
    <div className="mx-auto max-w-5xl">
      <AppText type="h2" className="text-xl font-bold md:text-2xl">
        My Hire
      </AppText>
      <AppText type="subtitle" className="text-muted-foreground mt-1 text-sm">
        Keep track of the drivers and staff you've brought on board.
      </AppText>

      <div className="border-border mt-5 border-t" />

      <div className="border-border mt-6 rounded-2xl border bg-white p-5 md:p-6">
        <AppText type="h3" className="text-base font-semibold">
          Your hired staff
        </AppText>

        {isFetching && !hires.length ? (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : hires.length === 0 ? (
          <EmptyState
            icon={BriefcaseBusiness}
            title="No active hires yet"
            description="Drivers you hire on a monthly engagement will appear here."
            className="mt-4"
          />
        ) : (
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            onPageChange={setPage}
            isLoading={isFetching}
          >
            <div className="divide-y">
              {hires.map((hire) => (
                <HireRow key={hire.id} hire={hire} />
              ))}
            </div>
          </Pagination>
        )}
      </div>
    </div>
  );
}
