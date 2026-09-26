"use client";

import {
  SearchPanel,
  type SearchFilters,
} from "@/components/drivers/search-panel";
import { TalentCard } from "@/components/drivers/talent-card";
import { AppText } from "@/components/shared/app-text";
import { BackLink } from "@/components/shared/back-link";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchX } from "lucide-react";
import { useState } from "react";
import { useDriverSearch } from "@/hooks/use-driver-search";

const PAGE_SIZE = 6;

export default function FindTalent() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [page, setPage] = useState(1);

  const { drivers, total, totalPages, isFetching } = useDriverSearch({
    ...filters,
    page,
    limit: PAGE_SIZE,
  });

  return (
    <div className="mx-auto max-w-6xl">
      <BackLink href="/dashboard" label="Take a step back" />

      <AppText type="h2" className="mt-3 text-xl font-bold md:text-2xl">
        Find verified talent
      </AppText>
      <AppText type="subtitle" className="text-muted-foreground mt-1 text-sm">
        Every profile below has passed Drivers Vault identity, licence and guarantor
        checks. Filter by role, city and budget.
      </AppText>

      <SearchPanel
        className="border-border mt-5 border shadow-sm"
        onSearch={(next) => {
          setFilters(next);
          setPage(1);
        }}
      />

      <AppText type="caption" className="text-muted-foreground mt-6 block">
        {total} {total === 1 ? "profile matches" : "profiles match"} your
        filters
      </AppText>

      {isFetching && !drivers.length ? (
        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[230px] rounded-2xl" />
          ))}
        </div>
      ) : drivers.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No profiles match your filters"
          description="Loosen a filter or two — or check back soon, new drivers are verified every week."
          className="mt-10"
        />
      ) : (
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          onPageChange={setPage}
          isLoading={isFetching}
          className="mt-4"
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {drivers.map((driver) => (
              <TalentCard key={driver.id} driver={driver} />
            ))}
          </div>
        </Pagination>
      )}
    </div>
  );
}
