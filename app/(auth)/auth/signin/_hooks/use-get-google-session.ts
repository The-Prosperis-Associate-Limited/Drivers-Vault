import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { AuthSession } from "@/types/auth";

export const useGetGoogleSession = function (token: string) {
  const { data, isFetching } = useGetData<APIResponse<AuthSession>>({
    url: API_ENDPOINTS.auth.validateGoogleSession(token),
    skipAuth: true,
    shouldFetch: !!token,
  });

  return { sessionData: data?.data, isFetching };
};
