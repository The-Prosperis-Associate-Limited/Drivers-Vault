"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { TegatLogo } from "@/components/svg/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const LINKS = [
  { label: "For clients", href: "/" },
  { label: "For drivers", href: "/driver" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQs", href: "#faqs" },
];

export function ClientMobileNav({
  signupHref = "/auth/signup",
}: {
  signupHref?: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="grid size-10 place-items-center rounded-full text-slate-800 transition-colors hover:bg-slate-100 md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="top"
        overlayClassName="bg-transparent backdrop-blur-none"
        className="gap-0 border-0 bg-white px-3 pt-3 pb-3 shadow-none"
      >
        <SheetHeader className="flex h-10 flex-row items-center p-0">
          <TegatLogo size={30} />
          <SheetTitle className="sr-only">DriverVault navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Choose a page or get started with DriverVault.
          </SheetDescription>
        </SheetHeader>
        <nav
          className="mt-3 flex flex-col items-center"
          aria-label="Mobile navigation"
        >
          {LINKS.map((link) => (
            <SheetClose key={link.label} asChild>
              <Link
                href={link.href}
                className="px-3 py-1.5 text-[11px] font-medium uppercase text-slate-800 transition-colors hover:text-blue-700"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link
              href={signupHref}
              className="mt-3 w-full rounded-lg bg-[#073fa7] px-5 py-2.5 text-center text-xs font-semibold text-white"
            >
              Get started
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
