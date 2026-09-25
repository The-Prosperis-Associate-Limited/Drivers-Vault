import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  title: React.ReactNode;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

// The subtle vertical ruling the mockups draw over every deep-blue field.
export const blueGrid =
  "bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:120px_100%]";

export const CtaSection = function ({ title, body, ctaLabel, ctaHref }: Props) {
  return (
    <section className={`bg-[#0d2fa5] px-4 py-20 md:py-28 ${blueGrid}`}>
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-white md:text-5xl">{title}</h2>
        <p className="mt-4 text-sm text-blue-100 md:text-base">{body}</p>

        <Link
          href={ctaHref}
          className="text-ink mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-blue-50"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
