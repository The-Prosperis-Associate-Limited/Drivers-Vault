import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionChip } from "./section-chip";
import { blueGrid } from "./cta-section";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface Props {
  chip: string;
  heading: React.ReactNode;
  features: Feature[];
  ctaLabel: string;
  ctaHref: string;
  screenshot: string;
  screenshotAlt: string;
}

export const WhySection = function ({
  chip,
  heading,
  features,
  ctaLabel,
  ctaHref,
  screenshot,
  screenshotAlt,
}: Props) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionChip>{chip}</SectionChip>

            <h2 className="text-ink mt-6 max-w-md text-3xl font-bold md:text-4xl">
              {heading}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={index * 0.12}>
                  <span className="bg-brand-soft flex h-12 w-12 items-center justify-center rounded-full">
                    <Icon className="h-5 w-5 text-[#12309f]" />
                  </span>
                  <h3 className="text-ink mt-3 text-lg font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 max-w-md text-sm leading-relaxed">
                    {feature.body}
                  </p>
                </Reveal>
              );
            })}
          </div>

          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#12309f] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0e2782]"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          className={`overflow-hidden rounded-3xl bg-[#0d2fa5] pt-14 pl-10 md:pt-20 md:pl-16 ${blueGrid}`}
        >
          <Image
            src={screenshot}
            alt={screenshotAlt}
            width={1030}
            height={1450}
            className="w-full rounded-tl-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};
