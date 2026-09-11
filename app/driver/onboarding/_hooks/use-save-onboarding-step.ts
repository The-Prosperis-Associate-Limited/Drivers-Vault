import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { DriverProfile } from "@/types/driver";

/*
  Every step saves the same way: PUT the step, refetch the profile the wizard
  reads onboarding_step from, then move on. Passing the next path here rather
  than navigating in the component keeps a step page to a form and nothing else.
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
  const { mutate, isPending } = useSubmitData<
    TData,
    APIResponse<DriverProfile>
  >({
    url,
    method: "put",
    onSuccessMessage,
    additionalQueryKeys: [[API_ENDPOINTS.driverOnboarding.profile]],
    redirectTo,
  });

  return { save: mutate, isPending };
};
