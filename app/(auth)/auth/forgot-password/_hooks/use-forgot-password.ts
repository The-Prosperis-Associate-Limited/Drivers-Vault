import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { ForgotPasswordFormValues } from "@/schemas/auth/password";

export const useForgotPassword = function ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { mutate, isPending } = useSubmitData<
    ForgotPasswordFormValues,
    APIResponse<null>
  >({
    url: API_ENDPOINTS.auth.forgotPassword,
    method: "post",
    skipAuth: true,
    onSuccessMessage: "If that account exists, a reset link is on its way",
    onSuccess: () => onSuccess?.(),
  });

  return { forgotPassword: mutate, isPending };
};
