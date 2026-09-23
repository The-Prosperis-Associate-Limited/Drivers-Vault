import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";

import { DRIVER_BENEFITS } from "./content";
import { GridPattern } from "../shared/grid-pattern";
import { RatingBadge } from "../shared/rating-badge";

function ProfilePreview() {
  return (
    <div className="relative mx-auto w-full max-w-md py-8">
      <RatingBadge className="absolute -top-1 left-0 z-10" />
      <div className="ml-auto w-[86%] rounded-[28px] border-[10px] border-slate-50 bg-white px-6 py-8 text-center shadow-[0_18px_45px_rgba(15,23,42,.08)]">
        <div className="relative mx-auto size-28 overflow-hidden rounded-full border-4 border-white bg-[#d7c6af] shadow-lg">
          <Image
            src="/driver-hero.svg"
            alt="Driver profile illustration"
            width={638}
            height={691}
            className="h-full w-full object-cover object-top"
          />
          <BadgeCheck className="absolute right-0 bottom-1 size-6 fill-blue-600 text-white" />
        </div>
        <p className="mt-5 text-base font-semibold text-slate-950">
          Emmanuel Adewale
        </p>
        <p className="mt-1 text-xs text-slate-500">Corporate Driver</p>

        <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-left">
          <ShieldCheck className="size-5 text-amber-500" />
          <div>
            <p className="text-[10px] text-slate-500">Badges Earned</p>
            <p className="text-[10px] font-medium text-slate-700">
              Reliable professional · Road resilience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DriverIntroSection() {
  return (
    <section className="bg-[#f2f5fb] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white lg:grid-cols-2">
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
          <p className="w-fit rounded-full bg-slate-50 px-4 py-2 text-[11px] font-semibold tracking-wide text-slate-700">
            FOR DRIVERS
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] text-slate-800 sm:text-4xl">
            Get steady, Fair work.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
            Build your reputation, choose suitable jobs, and earn through a
            network that values professionals.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            {DRIVER_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-blue-700" />
                {benefit}
              </li>
            ))}
          </ul>
          <Link
            href="/driver/auth/signup"
            className="mt-8 inline-flex w-fit items-center gap-3 rounded-xl bg-[#073fa7] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#06368f]"
          >
            Sign up
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative flex min-h-[430px] items-center overflow-hidden border-t border-slate-100 px-7 lg:border-t-0 lg:border-l">
          <GridPattern className="opacity-50" color="#eef2f7" size={64} />
          <div className="relative w-full">
            <ProfilePreview />
          </div>
        </div>
      </div>
    </section>
  );
}
