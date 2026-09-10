import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse, PaginatedResponse } from "@/types/response";
import type { Hire, HireDetail } from "@/types/booking";

export const useHires = function ({
  page = 1,
  limit = 10,
}: { page?: number; limit?: number } = {}) {
  const { data, isFetching } = useGetData<PaginatedResponse<Hire>>({
    url: API_ENDPOINTS.hires.list({ page, limit }),
  });

  return {
    hires: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    isFetching,
  };
};

export const useHire = function (reference: string) {
  const { data, isFetching } = useGetData<APIResponse<HireDetail>>({
    url: API_ENDPOINTS.hires.detail(reference),
  });

  return { hire: data?.data, isFetching };
};
