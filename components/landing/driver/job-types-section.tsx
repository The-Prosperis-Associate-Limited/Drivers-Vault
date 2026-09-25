import { GraduationCap } from "lucide-react";
import { SectionChip } from "../section-chip";
import { blueGrid } from "../cta-section";

const JOB_TYPES = [
  {
    title: "Contract Driver",
    body: "Drive on a fixed-term contract for a company or individual, a defined engagement with a clear start and end date, ideal if you want steady, committed work without a long-term, open-ended tie.",
  },
  {
    title: "Private Driver",
    body: "Drive for an individual or family's daily needs — school runs, errands, and personal appointments.",
  },
  {
    title: "Corporate Driver",
    body: "Drive for a company's staff or executives as part of their day-to-day operations, typically on a long-term assignment.",
  },
  {
    title: "Executive Driver",
    body: "Drive senior executives and management, with an emphasis on discretion, punctuality, and a polished, professional manner.",
  },
  {
    title: "Spy Drivers",
    body: "A specialized security-focused track, separate from standard certification, for drivers trained in defensive and discreet driving, for clients who need an added layer of protection.",
  },
  {
    title: "Expatriate Drivers",
    body: "Drive expatriate clients who need someone familiar with the city, comfortable with cross-cultural communication, and reliable with schedules.",
  },
];

export const JobTypesSection = function () {
  return (
    <section className={`bg-[#0d2fa5] px-4 py-16 md:py-24 ${blueGrid}`}>
      <div className="mx-auto max-w-6xl">
        <SectionChip variant="dark" icon={GraduationCap}>
          Job Types
        </SectionChip>

        <h2 className="mt-6 max-w-md text-3xl font-bold text-white md:text-4xl">
          Choose work that fits your skillset
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOB_TYPES.map((jobType) => (
            <div
              key={jobType.title}
              className="flex flex-col rounded-2xl bg-white p-6"
            >
              <span className="bg-brand-soft flex h-12 w-12 items-center justify-center rounded-full">
                <GraduationCap className="h-5 w-5 text-[#12309f]" />
              </span>
              <h3 className="text-ink mt-auto pt-10 text-lg font-bold">
                {jobType.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {jobType.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
