import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { Booking, DashboardStats } from "@/types/booking";
import type { TrustScoreBreakdown } from "@/types/driver";

export const useDashboardStats = function () {
  const { data, isFetching } = useGetData<APIResponse<DashboardStats>>({
    url: API_ENDPOINTS.driverDashboard.stats,
  });

  return { stats: data?.data, isFetching };
};

export const useUpcomingJobs = function (limit = 5) {
  const { data, isFetching } = useGetData<APIResponse<Booking[]>>({
    url: API_ENDPOINTS.driverDashboard.upcomingJobs({ limit }),
  });

  return { jobs: data?.data ?? [], isFetching };
};

export const useTrustScore = function () {
  const { data, isFetching } = useGetData<APIResponse<TrustScoreBreakdown>>({
    url: API_ENDPOINTS.driverDashboard.trustScore,
  });

  return { trustScore: data?.data, isFetching };
};
