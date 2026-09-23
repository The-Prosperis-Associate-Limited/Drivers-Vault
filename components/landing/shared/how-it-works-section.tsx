import { cn } from "@/lib/utils";

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

export function HowItWorksSection({
  audience,
  title,
  steps,
}: HowItWorksSectionProps) {
  const isClient = audience === "client";

  return (
    <section
      id="how-it-works"
      className={cn(
        "scroll-mt-8 bg-[#f7f8fa] sm:px-6 lg:px-8",
        isClient ? "px-2 py-12 sm:py-20" : "px-4 py-20",
      )}
    >
      <div className="mx-auto max-w-7xl">
        <p
          className={cn(
            "w-fit rounded-full bg-white py-2 font-semibold tracking-wide text-slate-600 shadow-sm",
            isClient
              ? "px-3 text-[9px] sm:px-4 sm:text-[11px]"
              : "px-4 text-[11px]",
          )}
        >
          HOW IT WORKS
        </p>
        <h2
          className={cn(
            "mt-5 max-w-lg leading-tight font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl",
            isClient ? "text-[1.4rem]" : "text-3xl",
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            "grid md:grid-cols-3",
            isClient ? "mt-6 gap-3 sm:mt-8 sm:gap-4" : "mt-8 gap-4",
          )}
        >
          {steps.map((step) => (
            <article
              key={step.number}
              className={cn(
                "flex flex-col rounded-2xl border border-slate-200 bg-white sm:min-h-64 sm:p-8",
                isClient ? "min-h-52 p-5" : "min-h-64 p-6",
              )}
            >
              <p
                className={cn(
                  "font-medium tracking-tight text-[#073fa7] sm:text-3xl",
                  isClient ? "text-2xl" : "text-3xl",
                )}
              >
                {step.number}
              </p>
              <div
                className={cn("mt-auto", isClient ? "pt-8 sm:pt-12" : "pt-12")}
              >
                <h3
                  className={cn(
                    "font-semibold text-slate-950",
                    isClient ? "text-sm sm:text-base" : "text-base",
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "text-slate-600",
                    isClient
                      ? "mt-2 text-xs leading-5 sm:mt-3 sm:text-sm sm:leading-6"
                      : "mt-3 text-sm leading-6",
                  )}
                >
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
