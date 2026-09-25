import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type LandingBenefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type BenefitsSectionProps = {
  audience: "client" | "driver";
  eyebrow: string;
  title: string;
  benefits: readonly LandingBenefit[];
  ctaHref: string;
  ctaLabel: string;
  preview: ReactNode;
};

export function BenefitsSection({
  audience,
  eyebrow,
  title,
  benefits,
  ctaHref,
  ctaLabel,
  preview,
}: BenefitsSectionProps) {
  const isClient = audience === "client";

  return (
    <section
      className={cn(
        isClient
          ? "px-2 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
          : "relative mx-auto w-full bg-white px-4 py-20 sm:px-6 lg:h-[1036px] lg:max-w-[1440px] lg:px-20",
      )}
    >
      {!isClient && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-0.5 bg-[repeating-linear-gradient(to_right,#E8E8E8_0_10px,transparent_10px_20px)]"
          />
          <p className="flex h-12 w-fit items-center rounded-[50px] bg-slate-50 px-6 py-3 text-base leading-[148%] font-medium text-[#344054] uppercase">
            {eyebrow}
          </p>
        </>
      )}
      <div
        className={cn(
          "mx-auto grid max-w-7xl",
          isClient
            ? "items-center gap-10 sm:gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24"
            : "mt-12 items-start gap-12 min-[1440px]:grid-cols-[678px_554px] lg:grid-cols-[.95fr_1.05fr] lg:gap-12",
        )}
      >
        <div
          className={cn(
            !isClient &&
              "flex w-full flex-col items-start gap-10 min-[1440px]:w-[678px] lg:h-[780px] lg:pt-10",
          )}
        >
          {isClient && (
            <p className="w-fit rounded-full bg-slate-50 px-3 py-2 text-[9px] font-semibold tracking-wide text-slate-600 sm:px-4 sm:text-[11px]">
              {eyebrow}
            </p>
          )}
          <h2
            className={cn(
              "max-w-md font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl",
              isClient
                ? "mt-7 text-[1.4rem] leading-tight sm:mt-12"
                : "text-3xl leading-[42px] font-semibold tracking-[-0.018em] text-[#344054] sm:text-[36px]",
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              isClient ? "mt-7 space-y-7 sm:mt-10 sm:space-y-9" : "space-y-9",
            )}
          >
            {benefits.map(({ icon: Icon, title: itemTitle, description }) => (
              <div key={itemTitle} className="flex gap-4">
                <div
                  className={cn(
                    "grid shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600",
                    isClient ? "size-10 sm:size-12" : "size-14 p-4",
                  )}
                >
                  <Icon
                    className={cn(isClient ? "size-4 sm:size-5" : "size-6")}
                  />
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-semibold text-slate-950",
                      isClient
                        ? "text-sm sm:text-base"
                        : "text-lg leading-[120%] font-semibold tracking-[-0.02em] text-[#344054] sm:text-[20px]",
                    )}
                  >
                    {itemTitle}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-slate-600",
                      isClient
                        ? "max-w-md text-xs leading-5 sm:text-sm sm:leading-6"
                        : "text-base leading-[148%] font-medium text-[#344054] sm:text-[18px]",
                    )}
                  >
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href={ctaHref}
            className={cn(
              "inline-flex items-center rounded-xl bg-[#073fa7] font-semibold text-white transition-colors hover:bg-[#06368f]",
              isClient
                ? "mt-8 gap-2 px-5 py-3 text-xs sm:mt-10 sm:px-6 sm:py-4 sm:text-sm"
                : "h-[60px] w-[155px] justify-center gap-3 px-7 py-4 text-lg leading-7 font-medium",
            )}
          >
            {ctaLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        {preview}
      </div>
    </section>
  );
}
