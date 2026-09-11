import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse } from "@/types/response";
import type { SignupFormValues } from "@/schemas/auth/driver-signup";

type SignupPayload = SignupFormValues & { role: "DRIVER"; client: "mobile" };

export const useSignup = function ({
  onSuccess,
}: {
  onSuccess?: (email: string) => void;
}) {
  const { mutate, isPending } = useSubmitData<SignupPayload, APIResponse<null>>(
    {
      url: API_ENDPOINTS.auth.signup,
      method: "post",
      skipAuth: true,
      onSuccessMessage: "Account created, check your email for the code",
      onSuccess: () => onSuccess?.(""),
    },
  );

  return { signup: mutate, isPending };
};
