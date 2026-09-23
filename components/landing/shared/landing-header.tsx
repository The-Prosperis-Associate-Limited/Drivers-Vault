import Link from "next/link";

import { TegatLogo } from "@/components/svg/logo";
import { cn } from "@/lib/utils";
import { LandingMobileNav } from "./landing-mobile-nav";

type LandingHeaderProps = {
  audience: "client" | "driver";
  signupHref: string;
};

const NAV_LINKS: ReadonlyArray<{
  label: string;
  href: string;
  audience?: LandingHeaderProps["audience"];
}> = [
  { label: "FOR CLIENTS", href: "/", audience: "client" },
  { label: "FOR DRIVERS", href: "/driver", audience: "driver" },
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "FAQS", href: "#faqs" },
];

export function LandingHeader({ audience, signupHref }: LandingHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-[1280px] px-2 pt-3 sm:px-6 sm:pt-5 lg:px-0">
      <div className="flex h-14 items-center justify-between rounded-full bg-white px-3 shadow-sm sm:h-[88px] sm:rounded-[40px] sm:py-5 lg:px-10">
        <Link href="/" aria-label="DriverVault home">
          <TegatLogo size={43} />
        </Link>

        <nav
          aria-label={`${audience === "driver" ? "Driver" : "Client"} landing page navigation`}
          className="hidden items-center gap-8 text-[14px] font-semibold tracking-wide text-slate-700 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "transition-colors hover:text-blue-700",
                link.audience === audience && "text-blue-700",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <LandingMobileNav signupHref={signupHref} />
        <Link
          href={signupHref}
          className="hidden rounded-[12px] bg-[#00359E] px-5 py-3 text-base font-medium text-white transition-colors hover:bg-[#07368f] md:inline-flex"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
