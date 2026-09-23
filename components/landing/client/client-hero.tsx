import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import { LandingHero } from "../shared/landing-hero";
import { RatingBadge } from "../shared/rating-badge";

function DriverProfileCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm py-0 sm:max-w-md sm:py-7">
      <RatingBadge className="absolute top-0 -left-5 z-10 hidden sm:block" />
      <div className="w-full rounded-[24px] border-[7px] border-white/25 bg-white px-5 py-6 text-center shadow-[0_24px_70px_rgba(2,24,76,.26)] sm:ml-auto sm:w-[92%] sm:rounded-[28px] sm:border-[10px] sm:px-7 sm:py-9">
        <div className="relative mx-auto size-20 overflow-hidden rounded-full border-4 border-white bg-[#d7c6af] shadow-lg sm:size-28">
          <Image
            src="/driver-hero.svg"
            alt="Verified corporate driver"
            width={638}
            height={691}
            priority
            className="h-full w-full object-cover object-top"
          />
          <BadgeCheck className="absolute right-0 bottom-1 size-6 fill-blue-600 text-white" />
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-950 sm:mt-5 sm:text-base">
          Emmanuel Adewale
        </p>
        <p className="mt-1 text-xs text-slate-500">Corporate Driver</p>
      </div>
      <RatingBadge className="absolute -right-5 bottom-0 z-10 hidden sm:block" />
    </div>
  );
}

export function ClientHero() {
  return (
    <LandingHero
      audience="client"
      signupHref="/auth/signup"
      title={
        <>
          Drivers, verified
          <br />
          before they reach you.
        </>
      }
      description="Hire a verified professional driver for a single trip, a recurring schedule, or your whole business, without agencies or guesswork."
      ctaLabel="Hire a Driver"
      visual={<DriverProfileCard />}
    />
  );
}
