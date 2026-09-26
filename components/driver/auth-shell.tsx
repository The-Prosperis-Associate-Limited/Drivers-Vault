"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { DriverIllustration } from "@/components/svg/driver-illustration";
import { AppText } from "@/components/shared/app-text";
import { Reveal } from "@/components/shared/reveal";

interface Props {
  children: React.ReactNode;
  backHref?: string;
}

export const AuthShell = function ({ children, backHref }: Props) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <button
        type="button"
        onClick={() => (backHref ? router.push(backHref) : router.back())}
        className="text-foreground hover:text-brand flex w-fit cursor-pointer items-center gap-3 px-5 py-5 text-sm font-medium transition-colors md:px-10"
      >
        <ArrowLeft className="h-5 w-5" />
        Take a step back
      </button>

      <div className="border-border border-t" />

      {/* Vertical padding stays tight so the 80vh panel plus the header still
          fits a laptop viewport without the page scrolling. */}
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-10 px-5 py-8 md:px-10 lg:grid-cols-2 lg:gap-12 lg:py-6">
        <Reveal y={16} className="mx-auto w-full max-w-md lg:mx-0">
          {children}
        </Reveal>
        <DriverIllustration />
      </div>
    </div>
  );
};

interface HeadingProps {
  title: string;
  subtitle?: React.ReactNode;
}

export const AuthHeading = function ({ title, subtitle }: HeadingProps) {
  return (
    <div className="mb-7 space-y-1.5">
      <AppText type="h2" className="text-[26px] font-bold">
        {title}
      </AppText>
      {subtitle && (
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          {subtitle}
        </AppText>
      )}
    </div>
  );
};
