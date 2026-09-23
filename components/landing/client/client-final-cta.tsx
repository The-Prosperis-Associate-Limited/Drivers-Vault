import Link from "next/link";
import { ArrowRight, CircleDollarSign } from "lucide-react";

import { GridPattern } from "../shared/grid-pattern";

export function ClientFinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#073fa7] px-3 py-14 text-center text-white sm:px-6 sm:py-20 lg:px-8">
      <GridPattern className="opacity-30" />
      <div className="relative mx-auto max-w-xl">
        <CircleDollarSign className="mx-auto size-6 text-blue-200 sm:size-8" />
        <h2 className="mt-4 text-[1.8rem] leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
          Book a verified
          <br />
          driver today
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-xs leading-5 text-blue-50/85 sm:text-sm sm:leading-6">
          Tell DriverVault what you need and get matched with a verified
          professional—usually within a day.
        </p>
        <Link
          href="/auth/signup"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-semibold text-slate-900 transition-transform hover:-translate-y-0.5 sm:mt-7 sm:rounded-xl sm:px-6 sm:py-4 sm:text-sm"
        >
          Start hiring <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
