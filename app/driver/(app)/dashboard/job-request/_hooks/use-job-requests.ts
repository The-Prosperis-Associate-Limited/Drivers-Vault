import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { queryClient } from "@/lib/utils";
import type { APIResponse, PaginatedResponse } from "@/types/response";
import type {
  Booking,
  JobRequestBucket,
  JobRequestSummary,
} from "@/types/booking";

export const useJobRequests = function ({
  page,
  limit,
  bucket,
  shouldFetch = true,
}: {
  page: number;
  limit: number;
  bucket?: JobRequestBucket;
  shouldFetch?: boolean;
}) {
  const { data, isFetching } = useGetData<PaginatedResponse<Booking>>({
    url: API_ENDPOINTS.jobRequests.list({ page, limit, bucket }),
    shouldFetch,
  });

  return {
    bookings: data?.data ?? [],
    totalPages: data?.totalPages ?? 1,
    total: data?.total ?? 0,
    isFetching,
  };
};

// Every endpoint on this router 403s an unverified driver, so the screen asks
// before it fetches rather than toasting two rejections at them.
export const useJobRequestSummary = function (shouldFetch = true) {
  const { data, isFetching } = useGetData<APIResponse<JobRequestSummary>>({
    url: API_ENDPOINTS.jobRequests.summary,
    shouldFetch,
  });

  return { summary: data?.data, isFetching };
};

export const useJobRequest = function (reference: string, shouldFetch = true) {
  const { data, isFetching } = useGetData<APIResponse<Booking>>({
    url: API_ENDPOINTS.jobRequests.get(reference),
    shouldFetch: shouldFetch && !!reference,
  });

  return { booking: data?.data, isFetching };
};

/*
  Accept, decline, start and complete are the same shape — a PATCH on the
  reference that refetches the booking and the lists it appears in. The server
  owns which transitions are legal; a refused one comes back as a message.

  The list url carries the page, limit and tab filter, so it is a different
  query key on every tab and no fixed key invalidates it. Matching on the
  prefix is what moves an accepted request off the Open tab.
*/
const useBookingAction = function ({
  url,
  onSuccessMessage,
}: {
  url: string;
  onSuccessMessage: string;
}) {
  return useSubmitData<Record<string, unknown>, APIResponse<Booking>>({
    url,
    method: "patch",
    onSuccessMessage,
    additionalQueryKeys: [
      [API_ENDPOINTS.driverDashboard.stats],
      [API_ENDPOINTS.driverDashboard.upcomingJobs({ limit: 5 })],
    ],
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          String(query.queryKey[0]).startsWith("/driver/job-requests"),
      });
    },
  });
};

export const useAcceptJobRequest = function (reference: string) {
  const { mutate, isPending } = useBookingAction({
    url: API_ENDPOINTS.jobRequests.accept(reference),
    onSuccessMessage: "Job request accepted",
  });

  return { acceptJobRequest: mutate, isPending };
};

export const useDeclineJobRequest = function (reference: string) {
  const { mutate, isPending } = useBookingAction({
    url: API_ENDPOINTS.jobRequests.decline(reference),
    onSuccessMessage: "Job request declined",
  });

  return { declineJobRequest: mutate, isPending };
};

export const useStartJob = function (reference: string) {
  const { mutate, isPending } = useBookingAction({
    url: API_ENDPOINTS.jobRequests.start(reference),
    onSuccessMessage: "Job started",
  });

  return { startJob: mutate, isPending };
};

export const useCompleteJob = function (reference: string) {
  const { mutate, isPending } = useBookingAction({
    url: API_ENDPOINTS.jobRequests.complete(reference),
    onSuccessMessage: "Job marked complete",
  });

  return { completeJob: mutate, isPending };
};
