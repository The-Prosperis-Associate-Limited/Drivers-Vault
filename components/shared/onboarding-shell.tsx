"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { AppText } from "./app-text";

const TIP_INTERVAL_MS = 8000;

const RotatingTip = function ({ tips }: { tips: string[] }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  useEffect(() => {
    if (tips.length < 2) return;

    const timer = setInterval(
      () => setIndex((current) => current + 1),
      TIP_INTERVAL_MS,
    );

    return () => clearInterval(timer);
  }, [tips.length]);

  return (
    <div className="border-border border-t px-5 py-4 text-center md:px-8">
      <AppText type="caption" className="text-brand block">
        Tips for you:
      </AppText>
      {/* Reserved height, or the card jolts when a shorter tip rotates in. */}
      <div className="mt-0.5 flex min-h-9 items-center justify-center">
        <AppText
          // Keyed so each tip re-runs the fade rather than swapping in place.
          key={index}
          type="caption"
          className={cn(
            "text-muted-foreground",
            !prefersReducedMotion && "animate-in fade-in duration-500",
          )}
        >
          {tips[index % tips.length]}
        </AppText>
      </div>
    </div>
  );
};

interface Props {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  tips?: string[];
  showBack?: boolean;
  className?: string;
}

export const OnboardingShell = function ({
  children,
  title,
  subtitle,
  tips,
  showBack = true,
  className,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {showBack && (
        <>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-foreground hover:text-brand flex w-fit cursor-pointer items-center gap-3 px-5 py-5 text-sm font-medium transition-colors md:px-10"
          >
            <ArrowLeft className="h-5 w-5" />
            Take a step back
          </button>
          <div className="border-border border-t" />
        </>
      )}

      <div className="flex-1 p-0 md:p-8">
        <div className="bg-brand relative min-h-full overflow-hidden md:rounded-3xl">
          <Image
            src="/cloud-top-left.svg"
            alt=""
            width={300}
            height={103}
            className="pointer-events-none absolute top-8 left-4 hidden w-40 opacity-90 lg:block xl:w-64"
          />
          <Image
            src="/cloud-top-right.svg"
            alt=""
            width={300}
            height={103}
            className="pointer-events-none absolute top-6 right-0 hidden w-40 opacity-90 lg:block xl:w-64"
          />
          <Image
            src="/cloud-bottom-left.svg"
            alt=""
            width={300}
            height={103}
            className="pointer-events-none absolute bottom-4 left-4 hidden w-32 opacity-90 lg:block xl:w-48"
          />
          <Image
            src="/cloud-bottom-right.svg"
            alt=""
            width={300}
            height={103}
            className="pointer-events-none absolute right-4 bottom-4 hidden w-32 opacity-90 lg:block xl:w-48"
          />

          <div className="relative z-10 flex flex-col items-center px-4 py-10 md:px-8 md:py-14">
            {title && (
              <div className="mb-2 max-w-lg text-center text-white">
                <AppText
                  type="h2"
                  className="text-2xl font-bold text-white md:text-[28px]"
                >
                  {title}
                </AppText>
                {subtitle && (
                  <AppText
                    type="subtitle"
                    className="mt-2 text-sm text-white/90 md:text-base"
                  >
                    {subtitle}
                  </AppText>
                )}
              </div>
            )}

            <div
              className={cn(
                "w-full max-w-[620px] overflow-hidden rounded-2xl bg-white shadow-lg",
                className,
              )}
            >
              <div className="p-5 md:p-8">{children}</div>

              {!!tips?.length && <RotatingTip tips={tips} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
