import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import { LandingHero } from "../shared/landing-hero";
import styles from "./driver-hero.module.css";

type TrustCardProps = {
  image: string;
  name: string;
  role: string;
  score: string;
};

const DRIVERS: readonly TrustCardProps[] = [
  {
    image: "/landing-page/driver-1.svg",
    name: "Mike Thomas",
    role: "Executive Driver",
    score: "91",
  },
  {
    image: "/landing-page/driver-2.svg",
    name: "Emmanuel Adewale",
    role: "Corporate Driver",
    score: "100",
  },
];

function TrustCard({ image, name, role, score }: TrustCardProps) {
  return (
    <div className="flex min-h-[150px] w-full items-center gap-4 rounded-[32px] border border-white/40 bg-white/95 p-4 shadow-[0_10px_30px_rgba(7,32,84,0.14)] sm:min-h-[170px]">
      <div className="relative size-16 shrink-0 sm:size-[90px]">
        <Image
          src={image}
          alt={`${name}, ${role}`}
          width={90}
          height={90}
          className="size-full object-contain"
        />
        <BadgeCheck className="absolute right-0 bottom-0 size-4 fill-blue-500 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[20px] font-medium text-[#111827]">
          {name}
        </p>
        <p className="mt-0.5 text-base text-[#6B7280]">{role}</p>
      </div>
      <div className="grid size-13 shrink-0 place-items-center rounded-full border-[3px] border-blue-600 text-sm font-semibold text-slate-900">
        {score}
      </div>
    </div>
  );
}

function DriverCardMarquee() {
  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
        {[false, true].map((isDuplicate) => (
          <div
            key={String(isDuplicate)}
            aria-hidden={isDuplicate || undefined}
            className="flex flex-col gap-5 pb-5"
          >
            {DRIVERS.map((driver) => (
              <TrustCard key={`${driver.name}-${isDuplicate}`} {...driver} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DriverHero() {
  return (
    <LandingHero
      audience="driver"
      signupHref="/driver/auth/signup"
      title={
        <>
          Drive on your terms.
          <br />
          Earn what you&apos;re worth.
        </>
      }
      description="DriverVault connects you with people and businesses that need dependable drivers, with clear pay, fair terms, and no agency guesswork."
      ctaLabel="Join as a driver"
      visual={<DriverCardMarquee />}
    />
  );
}
