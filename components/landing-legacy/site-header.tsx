import Link from "next/link";
import { TegatLogo } from "@/components/svg/logo";

export const SiteHeader = function () {
  return (
    <header className="border-border border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" aria-label="TEGAT home">
          <TegatLogo size={40} />
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black/85"
        >
          Register as a client
        </Link>
      </div>
    </header>
  );
};
