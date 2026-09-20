"use client";

import { FormInput } from "@/components/form/form-input";
import { AuthHeading, AuthShell } from "@/components/shared/auth-shell";
import { TegatLogo } from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { signinSchema, type SigninFormValues } from "@/schemas/auth/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useAdminLogin } from "./_hooks/use-admin-login";

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SigninFormValues>({ resolver: zodResolver(signinSchema) });

  const { login, isPending } = useAdminLogin({
    callbackUrl,
    onSuccess: () => reset(),
  });

  return (
    <AuthShell>
      <div className="mb-2">
        <TegatLogo size={48} />
      </div>

      <AuthHeading
        title="Admin sign in"
        subtitle="Enter your details to access the console."
      />

      <form
        onSubmit={handleSubmit((data) => login(data))}
        className="space-y-5"
      >
        <FormInput<SigninFormValues>
          control={control}
          name="email"
          errors={errors}
          label="Email Address"
          placeholder="E.g johndoe@gmail.com"
          type="email"
          icon={Mail}
        />

        <FormInput<SigninFormValues>
          control={control}
          name="password"
          errors={errors}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <Link
          href="/admin/auth/forgot-password"
          className="text-brand block text-sm font-semibold hover:underline"
        >
          Forgotten Password?
        </Link>

        <Button
          isLoading={isPending}
          className="h-12 w-full rounded-lg text-sm"
        >
          Continue
        </Button>
      </form>

      <Link
        href="/"
        className="text-foreground mt-6 flex items-center justify-center gap-2 text-sm font-semibold"
      >
        <ArrowLeft className="h-4 w-4" />
        Take a step back
      </Link>
    </AuthShell>
  );
}

export default function AdminSignIn() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
