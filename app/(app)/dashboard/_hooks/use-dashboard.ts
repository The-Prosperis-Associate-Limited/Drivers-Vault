import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";

export interface DashboardStats {
  active_drivers: number;
  open_requests: number;
  request_list: number;
}

export const useDashboardStats = function () {
  const { data, isFetching } = useGetData<APIResponse<DashboardStats>>({
    url: API_ENDPOINTS.dashboard.stats,
  });

  return { stats: data?.data, isFetching };
};
