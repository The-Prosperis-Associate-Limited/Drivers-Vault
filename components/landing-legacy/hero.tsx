import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Hero = function () {
  return (
    <section className="px-4 pt-6 md:px-8">
      <div className="bg-brand relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
        <Image
          src="/cloud-top-left.svg"
          alt=""
          width={300}
          height={103}
          className="pointer-events-none absolute top-8 left-6 hidden w-40 opacity-90 lg:block xl:w-56"
        />
        <Image
          src="/cloud-bottom-left.svg"
          alt=""
          width={300}
          height={103}
          className="pointer-events-none absolute bottom-0 left-6 hidden w-32 opacity-90 lg:block xl:w-44"
        />

        <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-12 md:px-12 md:py-16 lg:flex-row lg:gap-16 lg:py-20">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
              Hire drivers you can actually trust.
            </h1>
            <p className="mt-5 text-base text-white/85 md:text-lg">
              Drivers Vault vets every candidate against national identity,
              licence and police records, then scores them on reliability so you
              decide with confidence.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/auth/signup"
                className="text-ink rounded-xl bg-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/90"
              >
                Register as a client
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 rounded-xl border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Browse the directory
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* The export already carries the white circle and verified rosette. */}
          <Image
            src="/driver-hero.svg"
            alt=""
            width={638}
            height={691}
            priority
            className="w-64 shrink-0 sm:w-80 lg:w-105"
          />
        </div>
      </div>
    </section>
  );
};
