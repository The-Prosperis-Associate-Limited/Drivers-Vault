"use client";

import { FormInput } from "@/components/form/form-input";
import { AuthHeading, AuthShell } from "@/components/shared/auth-shell";
import { AppTabs } from "@/components/shared/app-tabs";
import { AppText } from "@/components/shared/app-text";
import { GoogleAuthButton } from "@/components/shared/google-auth-button";
import { OrDemacator } from "@/components/shared/or-demacator";
import { PasswordChecklist } from "@/components/shared/password-checklist";
import { Button } from "@/components/ui/button";
import { ENV } from "@/lib/utils";
import { signupSchema, type SignupFormValues } from "@/schemas/auth/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSignup } from "./_hooks/use-signup";

export default function SignUp() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { client_type: "INDIVIDUAL", accepted_terms: false },
  });

  const password = watch("password") ?? "";
  const clientType = watch("client_type");
  const isOrganisation = clientType === "ORGANISATION";

  const { signup, isPending } = useSignup();

  const onSubmit = (data: SignupFormValues) => signup(data);

  return (
    <AuthShell>
      <AuthHeading
        title="Create your client account"
        subtitle="Verification builds a trusted marketplace on both sides. Choose your account type to begin."
      />

      <AppTabs
        variant="segmented"
        className="mb-6"
        value={clientType}
        onValueChange={(value) => setValue("client_type", value)}
        tabs={[
          { value: "INDIVIDUAL", label: "Individual" },
          { value: "ORGANISATION", label: "Organization" },
        ]}
      />

      <GoogleAuthButton
        label="Sign Up with Google"
        onClick={() => router.push(`${ENV.API_URL}/auth/google/client`)}
      />

      <OrDemacator />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput<SignupFormValues>
          control={control}
          name="full_name"
          errors={errors}
          label={isOrganisation ? "Company name" : "Full name"}
          placeholder={isOrganisation ? "E.g Acme Logistics" : "E.g John Doe"}
          icon={isOrganisation ? Building2 : UserRound}
        />

        <FormInput<SignupFormValues>
          control={control}
          name="email"
          errors={errors}
          label={isOrganisation ? "Official company email" : "Email Address"}
          placeholder={
            isOrganisation ? "E.g hiring@acme.com" : "E.g johndoe@gmail.com"
          }
          type="email"
          icon={Mail}
        />

        <div className="space-y-3">
          <FormInput<SignupFormValues>
            control={control}
            name="password"
            errors={errors}
            label="Password"
            placeholder="Create a password"
            type="password"
          />

          <PasswordChecklist password={password} />
        </div>

        <FormInput<SignupFormValues>
          control={control}
          name="accepted_terms"
          errors={errors}
          type="checkbox"
          label="I agree to Drivers Vault's Terms of Service and Privacy Policy"
        />

        <Button
          isLoading={isPending}
          className="h-12 w-full rounded-lg text-sm"
        >
          Continue
        </Button>
      </form>

      <AppText type="caption" className="mt-6 block text-center">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="text-brand font-semibold underline underline-offset-2"
        >
          Sign in
        </Link>
      </AppText>
    </AuthShell>
  );
}
