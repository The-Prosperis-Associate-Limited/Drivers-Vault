import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function TestimonialsSection({
  audience,
  title,
  testimonials,
}: TestimonialsSectionProps) {
  const isClient = audience === "client";

  return (
    <section
      className={cn(
        "bg-[#f7f8fa] sm:px-6 lg:px-8",
        isClient ? "px-2 py-12 sm:py-20" : "px-4 py-20",
      )}
    >
      <div className="mx-auto max-w-7xl">
        <h2
          className={cn(
            "text-center font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl",
            isClient ? "text-[1.4rem]" : "text-3xl",
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            "grid md:grid-cols-3",
            isClient ? "mt-7 gap-3 sm:mt-10 sm:gap-4" : "mt-10 gap-4",
          )}
        >
          {testimonials.map((testimonial, index) => (
            <figure
              key={`${testimonial.quote}-${index}`}
              className={cn(
                "rounded-2xl bg-white shadow-[0_10px_40px_rgba(15,23,42,.03)]",
                isClient ? "p-5 sm:p-7" : "p-7",
              )}
            >
              <div
                className="flex gap-1 text-amber-500"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote
                className={cn(
                  "mt-4 text-slate-700",
                  isClient
                    ? "text-xs leading-5 sm:min-h-20 sm:text-sm sm:leading-6"
                    : "min-h-20 text-sm leading-6",
                )}
              >
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-[#50734a] text-[10px] font-semibold text-white">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500">
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
