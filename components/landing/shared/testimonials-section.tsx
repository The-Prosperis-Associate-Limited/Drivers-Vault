"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import styles from "./testimonials-section.module.css";

export type LandingTestimonial = {
  quote: string;
  name: string;
  location: string;
};

type TestimonialsSectionProps = {
  audience: "client" | "driver";
  title: string;
  testimonials: readonly LandingTestimonial[];
};

export function TestimonialsSection({
  title,
  testimonials,
}: TestimonialsSectionProps) {
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
    <section className="w-full bg-[#F9FAFB] px-4 py-20 min-[1440px]:h-[560px] sm:px-6 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl leading-[42px] font-semibold tracking-[-0.018em] text-[#1C1A17] sm:text-[36px]">
          {title}
        </h2>

        <div ref={cardsRef} className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={`${testimonial.quote}-${index}`}
              className={`${styles.card} flex min-h-[328px] flex-col justify-center rounded-2xl bg-white px-6 py-8`}
            >
              <div
                className="flex gap-1 text-[#F59E0B]"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="size-5 fill-current" />
                ))}
              </div>

              <blockquote className="mt-4 text-lg leading-[148%] font-medium tracking-[-0.01em] text-[#344054]">
                “{testimonial.quote}”
              </blockquote>

              <figcaption className="mt-4 flex items-center gap-3">
                <div className="relative size-[43px] shrink-0">
                  <Image
                    src="/landing-page/sarah.svg"
                    alt=""
                    width={43}
                    height={43}
                    className="size-[43px] rounded-full"
                  />
                  <span
                    aria-label="Online"
                    className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-[#16A34A]"
                  />
                </div>
                <div>
                  <p className="text-base leading-6 font-medium text-[#1C1A17]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm leading-5 text-[#667085]">
                    {testimonial.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
