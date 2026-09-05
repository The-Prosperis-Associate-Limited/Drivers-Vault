import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { BUDGET_RANGE_BOUNDS } from "@/lib/utils";
import type { BudgetRange } from "@/types/auth";
import type { DriverSearchResult } from "@/types/driver";
import type { PaginatedResponse } from "@/types/response";

interface Filters {
  driver_type?: string;
  state?: string;
  city?: string;
  budget?: string;
  page?: number;
  limit?: number;
}

export const buildSearchQuery = function (filters: Filters) {
  const params = new URLSearchParams();

  if (filters.driver_type) params.set("driver_type", filters.driver_type);
  if (filters.state) params.set("state", filters.state);
  if (filters.city) params.set("city", filters.city);

  const bounds = filters.budget
    ? BUDGET_RANGE_BOUNDS[filters.budget as BudgetRange]
    : undefined;
  if (bounds?.min !== undefined) params.set("budget_min", String(bounds.min));
  if (bounds?.max !== undefined) params.set("budget_max", String(bounds.max));

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? 6));

  return params.toString();
};

export const useDriverSearch = function (filters: Filters) {
  const { data, isFetching } = useGetData<
    PaginatedResponse<DriverSearchResult>
  >({
    url: API_ENDPOINTS.drivers.search(buildSearchQuery(filters)),
  });

  return {
    drivers: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    isFetching,
  };
};
