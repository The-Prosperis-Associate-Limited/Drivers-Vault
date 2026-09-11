import { useGetData } from "./use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { VerificationStatus } from "@/types/driver";

export const useVerificationStatus = function (shouldFetch = true) {
  const { data, isFetching, refetch } = useGetData<
    APIResponse<VerificationStatus>
  >({
    url: API_ENDPOINTS.driverOnboarding.verificationStatus,
    shouldFetch,
  });

  return { verification: data?.data, isFetching, refetch };
};
