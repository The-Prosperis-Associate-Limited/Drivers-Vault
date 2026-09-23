import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ClientSearchForm } from "@/components/landing/client-search-form";
import { FIND_DRIVER_BENEFITS } from "./content";
import { GridPattern } from "../shared/grid-pattern";

export function ClientIntroSection() {
  return (
    <section className="bg-[#f2f5fb] px-2 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-2xl bg-[#073fa7] sm:rounded-3xl lg:grid-cols-[1.1fr_.9fr]">
        <GridPattern className="opacity-30" />
        <div className="relative flex flex-col justify-center px-5 py-8 text-white sm:px-12 sm:py-12 lg:px-16 lg:py-16">
          <p className="w-fit rounded-full bg-[#052f7e] px-3 py-2 text-[9px] font-semibold tracking-wide sm:px-4 sm:text-[11px]">
            FOR CLIENTS
          </p>
          <h2 className="mt-5 text-[1.4rem] font-semibold tracking-[-0.035em] sm:mt-6 sm:text-4xl">
            Find the right driver
          </h2>
          <p className="mt-3 max-w-xl text-xs leading-5 text-blue-50/85 sm:mt-4 sm:text-base sm:leading-6">
            DriverVault vets every candidate against national identity, licence
            and police records, then scores them on reliability so you decide
            with confidence.
          </p>
          <ul className="mt-5 space-y-2.5 text-xs leading-5 text-blue-50/90 sm:mt-6 sm:space-y-3 sm:text-sm">
            {FIND_DRIVER_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-white" />
                {benefit}
              </li>
            ))}
          </ul>
          <Link
            href="/auth/signup"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-semibold text-slate-900 transition-transform hover:-translate-y-0.5 sm:mt-8 sm:rounded-xl sm:px-6 sm:py-4 sm:text-sm"
          >
            Start hiring <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative flex items-center border-t border-white/10 px-4 py-7 sm:px-7 sm:py-12 lg:border-t-0 lg:border-l lg:px-12">
          <div className="w-full">
            <ClientSearchForm />
          </div>
        </div>
      </div>
    </section>
  );
}
