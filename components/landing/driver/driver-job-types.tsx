import { BriefcaseBusiness } from "lucide-react";

import { JOB_TYPES } from "./content";
import { GridPattern } from "../shared/grid-pattern";

export function DriverJobTypes() {
  return (
    <section className="relative w-full overflow-hidden bg-[#00359E] px-4 py-20 text-white min-[1440px]:h-[984px] min-[1440px]:px-20 sm:px-6 lg:px-16">
      <GridPattern
        className="opacity-30"
        color="rgba(255,255,255,.05)"
        size={100}
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="inline-flex h-12 items-center gap-2 rounded-[50px] bg-[#053385] px-6 py-3 text-base leading-[148%] font-medium uppercase">
          <BriefcaseBusiness className="size-4" />
          JOB TYPES
        </p>
        <h2 className="mt-6 max-w-md text-3xl leading-[42px] font-semibold tracking-[-0.018em] sm:text-[36px]">
          Choose work that fits your skillset
        </h2>
        <div className="mt-6 grid gap-4 min-[1440px]:grid-cols-[repeat(3,416px)] md:grid-cols-2 lg:grid-cols-3">
          {JOB_TYPES.map((job) => (
            <article
              key={job.title}
              className="flex min-h-[316px] flex-col rounded-2xl bg-white px-6 py-8 text-slate-950 min-[1440px]:h-[316px] min-[1440px]:w-[416px]"
            >
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-blue-50 p-4 text-blue-600">
                <BriefcaseBusiness className="size-6" />
              </div>
              <div className="mt-auto pt-10">
                <h3 className="text-xl leading-6 font-semibold tracking-[-0.02em] text-[#1C1A17]">
                  {job.title}
                </h3>
                <p className="mt-3 text-base leading-6 font-medium tracking-[-0.01em] text-[#344054]">
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
