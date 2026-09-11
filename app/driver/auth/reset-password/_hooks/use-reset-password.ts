import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { ResetPasswordFormValues } from "@/schemas/auth/password";

export const useResetPassword = function (token: string) {
  const { mutate, isPending } = useSubmitData<
    ResetPasswordFormValues,
    APIResponse<null>
  >({
    url: API_ENDPOINTS.auth.resetPassword(token),
    method: "post",
    skipAuth: true,
    onSuccessMessage: "Password reset successfully",
    redirectTo: "/driver/auth/reset-successful",
  });

  return { resetPassword: mutate, isPending };
};
