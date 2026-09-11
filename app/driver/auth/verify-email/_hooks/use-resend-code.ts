import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";

export const useResendCode = function () {
  const { mutate, isPending } = useSubmitData<
    { email: string },
    APIResponse<null>
  >({
    url: API_ENDPOINTS.auth.sendEmailOtp,
    method: "post",
    skipAuth: true,
    onSuccessMessage: "A new code is on its way",
  });

  return { resendCode: mutate, isPending };
};
