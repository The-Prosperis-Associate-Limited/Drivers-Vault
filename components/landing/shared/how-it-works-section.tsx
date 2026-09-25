"use client";

import { useEffect, useRef } from "react";

import styles from "./how-it-works-section.module.css";

export type LandingStep = {
  number: string;
  title: string;
  description: string;
};

type HowItWorksSectionProps = {
  audience: "client" | "driver";
  title: string;
  steps: readonly LandingStep[];
};

export function HowItWorksSection({ title, steps }: HowItWorksSectionProps) {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards || !("IntersectionObserver" in window)) return;

    cards.classList.add(styles.animated);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) return;

        cards.classList.add(styles.spread);
        observer.disconnect();
      },
      { threshold: [0, 0.35] },
    );

    observer.observe(cards);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      className="w-full scroll-mt-28 bg-[#F9FAFB] px-4 py-20 min-[1440px]:h-[644px] sm:scroll-mt-32 sm:px-6 lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <p className="flex h-12 w-[167px] items-center justify-center rounded-[50px] bg-white px-6 py-3 text-base leading-[148%] font-medium text-[#344054] uppercase">
          HOW IT WORKS
        </p>
        <h2 className="max-w-xl text-3xl leading-[42px] font-semibold tracking-[-0.018em] text-[#1C1A17] sm:text-[36px]">
          {title}
        </h2>
        <div
          ref={cardsRef}
          className="grid gap-4 min-[1440px]:grid-cols-[repeat(3,416px)] md:grid-cols-3"
        >
          {steps.map((step) => (
            <article
              key={step.number}
              className={`${styles.card} flex min-h-[316px] flex-col gap-3 rounded-2xl border border-[#EAECF0] bg-white px-6 py-8 min-[1440px]:h-[316px] min-[1440px]:w-[416px]`}
            >
              <p className="font-grand-hotel text-5xl leading-[54px] font-normal tracking-[-0.02em] text-[#00359E]">
                {step.number}
              </p>
              <div className="mt-auto">
                <h3 className="text-xl leading-8 font-semibold tracking-[-0.016em] text-[#1C1A17] sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-6 font-medium tracking-[-0.01em] text-[#344054]">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
