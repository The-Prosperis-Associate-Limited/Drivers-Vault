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
          : "px-4 py-20 sm:px-6 lg:px-8 lg:py-28",
      )}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24">
        <div>
          <p
            className={cn(
              "w-fit rounded-full bg-slate-50 font-semibold tracking-wide text-slate-600",
              isClient
                ? "px-3 py-2 text-[9px] sm:px-4 sm:text-[11px]"
                : "px-4 py-2 text-[11px]",
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "max-w-md font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl",
              isClient
                ? "mt-7 text-[1.4rem] leading-tight sm:mt-12"
                : "mt-12 text-3xl",
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              isClient
                ? "mt-7 space-y-7 sm:mt-10 sm:space-y-9"
                : "mt-10 space-y-9",
            )}
          >
            {benefits.map(({ icon: Icon, title: itemTitle, description }) => (
              <div key={itemTitle} className="flex gap-4">
                <div
                  className={cn(
                    "grid shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600",
                    isClient ? "size-10 sm:size-12" : "size-12",
                  )}
                >
                  <Icon
                    className={cn(isClient ? "size-4 sm:size-5" : "size-5")}
                  />
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-semibold text-slate-950",
                      isClient ? "text-sm sm:text-base" : "text-base",
                    )}
                  >
                    {itemTitle}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-slate-600",
                      isClient
                        ? "max-w-md text-xs leading-5 sm:text-sm sm:leading-6"
                        : "text-sm leading-6",
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
                : "mt-10 gap-3 px-6 py-4 text-sm",
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
