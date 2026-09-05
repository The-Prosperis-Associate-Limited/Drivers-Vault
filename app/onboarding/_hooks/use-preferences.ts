import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { ClientProfile } from "@/types/auth";

export const usePreferences = function () {
  const { data, isFetching } = useGetData<APIResponse<ClientProfile>>({
    url: API_ENDPOINTS.onboarding.preferences,
  });

  return { preferences: data?.data, isFetching };
};
