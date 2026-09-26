import { SectionChip } from "./section-chip";

interface Step {
  title: string;
  body: string;
}

interface Props {
  heading: React.ReactNode;
  steps: Step[];
}

export const StepsSection = function ({ heading, steps }: Props) {
  return (
    <section id="how-it-works" className="bg-slate-50 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionChip>How It Works</SectionChip>

        <h2 className="text-ink mt-5 max-w-xl text-3xl font-bold md:text-4xl">
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="border-border flex min-h-56 flex-col justify-between rounded-2xl border bg-white p-6 md:min-h-72"
            >
              <span className="text-3xl font-bold text-[#12309f] md:text-4xl">
                0{index + 1}
              </span>
              <div className="mt-10 space-y-2">
                <h3 className="text-ink text-lg font-bold md:text-xl">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
