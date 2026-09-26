import { useSearchParams } from "next/navigation";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { DriverProfile } from "@/types/driver";

/*
  Every step saves the same way: PUT the step, refetch the profile the wizard
  reads onboarding_step from, then move on. Passing the next path here rather
  than navigating in the component keeps a step page to a form and nothing else.
  A step opened from the review screen's Edit link (?from=review) returns there
  after saving instead of marching through the remaining steps again.
*/
export const useSaveOnboardingStep = function <TData>({
  url,
  redirectTo,
  onSuccessMessage = "Saved",
}: {
  url: string;
  redirectTo: string;
  onSuccessMessage?: string;
}) {
  const searchParams = useSearchParams();
  const fromReview = searchParams.get("from") === "review";

  const { mutate, isPending } = useSubmitData<
    TData,
    APIResponse<DriverProfile>
  >({
    url,
    method: "put",
    onSuccessMessage,
    additionalQueryKeys: [[API_ENDPOINTS.driverOnboarding.profile]],
    redirectTo: fromReview ? "/driver/onboarding/review" : redirectTo,
  });

  return { save: mutate, isPending };
};
