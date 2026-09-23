import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import { LandingHero } from "../shared/landing-hero";
import styles from "./driver-hero.module.css";

type TrustCardProps = {
  image: string;
  name: string;
  role: string;
  score: number;
};

const DRIVERS: readonly TrustCardProps[] = [
  {
    image: "/landing-page/driver-1.svg",
    name: "Mike Thomas",
    role: "Executive Driver",
    score: 91,
  },
  {
    image: "/landing-page/driver-2.svg",
    name: "Emmanuel Adewale",
    role: "Corporate Driver",
    score: 100,
  },
];

function TrustScore({ score }: { score: number }) {
  const value = Math.min(Math.max(score, 0), 100);

  return (
    <div
      className="flex shrink-0 flex-col items-center gap-1"
      aria-label={`Trust score ${value} out of 100`}
    >
      <div className="relative grid size-16 place-items-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          className="absolute inset-0 size-full -rotate-90 overflow-visible"
        >
          <circle
            cx="32"
            cy="32"
            r="29"
            fill="none"
            stroke="#004EEB"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray={`${value} ${100 - value}`}
          />
        </svg>
        <span className="relative text-[21.6px] leading-[28.8px] font-semibold tracking-normal text-[#1C1A17]">
          {value}
        </span>
      </div>
      <span className="text-center text-xs leading-4 font-medium tracking-[-0.01em] whitespace-nowrap text-[#6B7280]">
        Trust Score
      </span>
    </div>
  );
}

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
        <BadgeCheck className="absolute right-1.5 bottom-1.5 size-6 fill-blue-600 text-white drop-shadow-sm" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[20px] font-medium text-[#111827]">
          {name}
        </p>
        <p className="mt-0.5 text-base text-[#6B7280]">{role}</p>
      </div>
      <TrustScore score={score} />
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
