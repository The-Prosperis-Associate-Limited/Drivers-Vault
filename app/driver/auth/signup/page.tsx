"use client";

import { FormInput } from "@/components/form/form-input";
import { AuthHeading, AuthShell } from "@/components/driver/auth-shell";
import { AppText } from "@/components/shared/app-text";
import { GoogleAuthButton } from "@/components/shared/google-auth-button";
import { OrDemacator } from "@/components/shared/or-demacator";
import { PasswordChecklist } from "@/components/shared/password-checklist";
import { TegatLogo } from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { ENV } from "@/lib/utils";
import {
  signupSchema,
  type SignupFormValues,
} from "@/schemas/auth/driver-signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, UserRound } from "lucide-react";
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
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { accepted_terms: false },
  });

  const password = watch("password") ?? "";
  const email = watch("email") ?? "";

  const { signup, isPending } = useSignup({
    onSuccess: () =>
      router.push(
        `/driver/auth/verify-email?email=${encodeURIComponent(email)}`,
      ),
  });

  const onSubmit = (data: SignupFormValues) =>
    // "mobile" asks the server for a 6-digit code rather than the emailed link,
    // which is what the next screen collects.
    signup({ ...data, role: "DRIVER", client: "mobile" });

  return (
    <AuthShell backHref="/">
      <div className="mb-2">
        <TegatLogo size={48} />
      </div>

      <AuthHeading
        title="Create your account"
        subtitle="Takes about 2 minutes. You'll verify your documents in the next step."
      />

      <GoogleAuthButton
        onClick={() => router.push(`${ENV.API_URL}/auth/google/driver`)}
      />

      <OrDemacator />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput<SignupFormValues>
          control={control}
          name="full_name"
          errors={errors}
          label="Full name"
          placeholder="E.g John Doe"
          icon={UserRound}
        />

        <FormInput<SignupFormValues>
          control={control}
          name="email"
          errors={errors}
          label="Email Address"
          placeholder="E.g johndoe@gmail.com"
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
          label="I agree to TEGAT's Terms of Service and Privacy Policy"
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
          href="/driver/auth/signin"
          className="text-brand font-semibold underline underline-offset-2"
        >
          Sign in
        </Link>
      </AppText>
    </AuthShell>
  );
}
