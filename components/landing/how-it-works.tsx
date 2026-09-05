import { SectionEyebrow } from "./section-eyebrow";

const STEPS = [
  {
    number: "01",
    title: "Browse & search",
    blurb:
      "Explore verified candidates by role, or search by name or TEGAT ID.",
  },
  {
    number: "02",
    title: "Evaluate on trust",
    blurb:
      "Read trust scores, certifications, reviews and real-time availability.",
  },
  {
    number: "03",
    title: "Request & confirm",
    blurb:
      "Add candidates to a request list, submit criteria, and get next steps.",
  },
];

export const HowItWorks = function () {
  return (
    <section className="border-brand/20 border-y">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <SectionEyebrow index="03" label="How it works" />

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number}>
              <p className="text-brand text-3xl font-medium">{step.number}</p>
              <h3 className="text-ink mt-4 text-xl font-semibold">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {step.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
