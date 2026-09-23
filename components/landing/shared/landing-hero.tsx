import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GridPattern } from "./grid-pattern";
import { LandingHeader } from "./landing-header";

type LandingHeroProps = {
  audience: "client" | "driver";
  signupHref: string;
  title: ReactNode;
  description: ReactNode;
  ctaLabel: string;
  visual: ReactNode;
};

export function LandingHero({
  audience,
  signupHref,
  title,
  description,
  ctaLabel,
  visual,
}: LandingHeroProps) {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#073fa7]">
      <GridPattern className="opacity-40" size={118} />
      <LandingHeader audience={audience} signupHref={signupHref} />

      <div className="relative z-10 mx-auto grid min-h-[530px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl leading-[1.02] font-semibold tracking-[-0.04em] sm:text-5xl lg:text-[64px]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white sm:text-xl">
            {description}
          </p>
          <Link
            href={signupHref}
            className="mt-8 inline-flex items-center gap-3 rounded-[12px] bg-white px-7 py-4 text-sm font-semibold text-black shadow-sm transition-transform hover:-translate-y-0.5"
          >
            {ctaLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-md flex-col gap-5 lg:ml-auto">
          {visual}
        </div>
      </div>
    </section>
  );
}
