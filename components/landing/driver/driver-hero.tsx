import { ArrowRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { TrustRing } from "@/components/drivers/trust-ring";
import { LandingNav } from "../landing-nav";
import { blueGrid } from "../cta-section";

const DRIVERS = [
  {
    name: "Mike Thomas",
    role: "Executive Driver",
    score: 91,
    avatar: "/landing/avatar-mike.png",
  },
  {
    name: "Emmanuel Adewale",
    role: "Corporate Driver",
    score: 100,
    avatar: "/landing/avatar-emmanuel.png",
  },
];

export const DriverHero = function () {
  return (
    <header className={`bg-[#0d2fa5] px-4 pt-5 pb-20 md:pb-28 ${blueGrid}`}>
      <LandingNav ctaHref="/driver/auth/signup" />

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 items-center gap-14 md:mt-20 lg:grid-cols-2">
        <Reveal y={20}>
          <h1 className="text-4xl leading-tight font-bold text-white md:text-6xl">
            Drive on your terms. Earn what you're worth
          </h1>
          <p className="mt-5 max-w-lg text-base text-blue-100 md:text-lg">
            DriverVault connects you with people and businesses that need
            dependable drivers, with clear pay, fair terms, and no agency
            guesswork.
          </p>

          <Link
            href="/driver/auth/signup"
            className="text-ink mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-blue-50"
          >
            Join as a driver
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto w-full max-w-md space-y-5">
          {DRIVERS.map((driver) => (
            <div
              key={driver.name}
              className="flex items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-xl md:p-6"
            >
              <span className="flex items-center gap-4">
                <span className="relative shrink-0">
                  <Image
                    src={driver.avatar}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <BadgeCheck className="fill-brand absolute -right-0.5 bottom-1 h-5 w-5 text-white" />
                </span>
                <span>
                  <span className="text-ink block text-lg font-semibold">
                    {driver.name}
                  </span>
                  <span className="text-muted-foreground block text-sm">
                    {driver.role}
                  </span>
                </span>
              </span>

              <TrustRing score={driver.score} size={56} className="shrink-0" />
            </div>
          ))}
        </Reveal>
      </div>
    </header>
  );
};
