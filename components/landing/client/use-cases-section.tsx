import { Briefcase, CalendarClock, User } from "lucide-react";
import { SectionChip } from "../section-chip";
import { blueGrid } from "../cta-section";

const USE_CASES = [
  {
    icon: User,
    title: "Personal Transport",
    body: "Airport runs, family trips, events, and daily errands with a driver you can trust.",
  },
  {
    icon: Briefcase,
    title: "Business Travel",
    body: "Reliable transport for executives, teams, and visiting partners—on schedule, every time.",
  },
  {
    icon: CalendarClock,
    title: "Recurring Routes",
    body: "School runs, staff shuttles, and scheduled deliveries handled by the same vetted professionals.",
  },
];

export const UseCasesSection = function () {
  return (
    <section className="bg-slate-50 px-4 py-12 md:py-16">
      <div
        className={`mx-auto max-w-6xl rounded-3xl bg-[#0d2fa5] p-6 md:p-12 ${blueGrid}`}
      >
        <SectionChip variant="dark">Use Cases</SectionChip>

        <h2 className="mt-6 max-w-md text-3xl font-bold text-white md:text-4xl">
          However you move, we have drivers for you.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 pb-4 md:grid-cols-3">
          {USE_CASES.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              // The mockup staggers each item a step lower than the last.
              <div
                key={useCase.title}
                className="max-w-xs"
                style={{ marginTop: `calc(${index} * clamp(0px, 4vw, 56px))` }}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                  <Icon className="h-6 w-6 text-[#12309f]" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-wide text-white uppercase">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100">
                  {useCase.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
