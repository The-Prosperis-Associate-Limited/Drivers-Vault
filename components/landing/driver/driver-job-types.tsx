import { BriefcaseBusiness } from "lucide-react";

import { JOB_TYPES } from "./content";
import { GridPattern } from "../shared/grid-pattern";

export function DriverJobTypes() {
  return (
    <section className="relative overflow-hidden bg-[#073fa7] px-4 py-20 text-white sm:px-6 lg:px-8">
      <GridPattern
        className="opacity-30"
        color="rgba(255,255,255,.05)"
        size={100}
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#053385] px-4 py-2 text-[11px] font-semibold tracking-wide">
          <BriefcaseBusiness className="size-4" />
          JOB TYPES
        </p>
        <h2 className="mt-5 max-w-sm text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-4xl">
          Choose work that fits your skillset
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {JOB_TYPES.map((job) => (
            <article
              key={job.title}
              className="flex min-h-64 flex-col rounded-2xl bg-white p-6 text-slate-950 sm:p-7"
            >
              <div className="grid size-10 place-items-center rounded-full bg-blue-50 text-blue-600">
                <BriefcaseBusiness className="size-4" />
              </div>
              <div className="mt-auto pt-10">
                <h3 className="text-base font-semibold">{job.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {job.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
