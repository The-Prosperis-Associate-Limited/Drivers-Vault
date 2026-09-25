import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  place: string;
  avatar: string;
}

interface Props {
  heading: string;
  items: Testimonial[];
}

export const TestimonialsSection = function ({ heading, items }: Props) {
  return (
    <section className="bg-slate-50 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-ink text-center text-3xl font-bold md:text-4xl">
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.quote}
              className="border-border rounded-2xl border bg-white p-6"
            >
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <blockquote className="text-ink mt-4 text-base font-medium">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3">
                <Image
                  src={item.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span>
                  <span className="text-ink block text-sm font-semibold">
                    {item.name}
                  </span>
                  <span className="text-muted-foreground block text-xs">
                    {item.place}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
