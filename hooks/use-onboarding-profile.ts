import { useGetData } from "./use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { DriverProfile } from "@/types/driver";

export const useOnboardingProfile = function (shouldFetch = true) {
  const { data, isFetching, refetch } = useGetData<APIResponse<DriverProfile>>({
    url: API_ENDPOINTS.driverOnboarding.profile,
    shouldFetch,
  });

  return { profile: data?.data, isFetching, refetch };
};
