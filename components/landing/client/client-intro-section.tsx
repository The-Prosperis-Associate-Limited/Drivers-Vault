import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ClientSearchForm } from "@/components/landing/client-search-form";
import { FIND_DRIVER_BENEFITS } from "./content";
import { GridPattern } from "../shared/grid-pattern";

export function ClientIntroSection() {
  return (
    <section className="bg-[#f2f5fb] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="relative mx-auto grid max-w-7xl gap-12 overflow-hidden rounded-[32px] bg-[#00359E] p-6 min-[1440px]:flex min-[1440px]:h-[588px] min-[1440px]:items-center min-[1440px]:justify-between sm:p-8 lg:grid-cols-[1.1fr_.9fr] lg:p-12">
        <GridPattern className="opacity-30" />
        <div className="relative flex w-full max-w-[600px] flex-col justify-center text-white">
          <p className="flex h-12 w-fit items-center rounded-[50px] bg-[#052F7E] px-6 py-3 text-base leading-[148%] font-medium uppercase">
            FOR CLIENTS
          </p>
          <h2 className="mt-6 text-3xl leading-[42px] font-semibold tracking-[-0.018em] sm:text-[36px]">
            Find the right driver
          </h2>
          <p className="mt-4 max-w-xl text-base leading-[148%] font-medium text-white sm:text-lg">
            DriverVault vets every candidate against national identity, licence
            and police records, then scores them on reliability so you decide
            with confidence.
          </p>
          <ul className="mt-6 space-y-3 text-base leading-[148%] font-medium text-white sm:text-lg">
            {FIND_DRIVER_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-white" />
                {benefit}
              </li>
            ))}
          </ul>
          <Link
            href="/auth/signup"
            className="mt-8 inline-flex h-[60px] w-fit min-w-[181px] items-center justify-center gap-3 rounded-[12px] bg-white px-7 py-4 text-lg leading-7 font-medium text-[#1C1A17] transition-transform hover:-translate-y-0.5"
          >
            Start hiring <ArrowRight className="size-6" />
          </Link>
        </div>
        <div className="relative flex w-full items-center justify-self-end min-[1440px]:w-[488px] lg:max-w-[488px]">
          <div className="w-full">
            <ClientSearchForm />
          </div>
        </div>
      </div>
    </section>
  );
}
