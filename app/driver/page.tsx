import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CirclePlus,
  LayoutDashboard,
  ListChecks,
  Mail,
  Minus,
  ShieldCheck,
  Star,
  WalletCards,
} from "lucide-react";

import { TegatLogo } from "@/components/svg/logo";
import { SiteFooter } from "@/components/shared/site-footer";
import { ClientMobileNav } from "@/components/landing/client-mobile-nav";

export const metadata: Metadata = {
  title: "Drive with DriverVault",
  description:
    "Choose suitable driving jobs, set your availability, and earn with verified clients on DriverVault.",
};

function DriverHeader() {
  return (
    <header className="lg: relative z-20 mx-auto w-full max-w-7xl px-2 pt-3 sm:h-[88px] sm:px-6 sm:pt-5 lg:px-8">
      <div className="flex h-14 items-center justify-between rounded-[40px] bg-white px-3 shadow-sm sm:h-[88px] sm:py-5">
        <Link href="/" aria-label="DriverVault home">
          <TegatLogo size={43} />
        </Link>

        <nav
          aria-label="Driver landing page navigation"
          className="hidden items-center gap-8 text-[14px] font-semibold tracking-wide text-slate-700 md:flex"
        >
          <Link href="/" className="transition-colors hover:text-blue-700">
            FOR CLIENTS
          </Link>
          <Link href="/driver" className="text-blue-700">
            FOR DRIVERS
          </Link>
          <Link
            href="#how-it-works"
            className="transition-colors hover:text-blue-700"
          >
            HOW IT WORKS
          </Link>
          <Link href="#faqs" className="transition-colors hover:text-blue-700">
            FAQS
          </Link>
        </nav>

        <ClientMobileNav signupHref="/driver/auth/signup" />
        <Link
          href="/driver/auth/signup"
          className="hidden rounded-[12px] bg-[#00359E] px-5 py-3 text-base font-medium text-white transition-colors hover:bg-[#07368f] md:inline-flex"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}

function TrustCard({
  name,
  role,
  score,
  accent,
}: {
  name: string;
  role: string;
  score: string;
  accent: string;
}) {
  return (
    <div className="sm:h-[] flex items-center gap-4 rounded-[32px] border border-white/40 bg-white/95 p-4 shadow-[0_10px_30px_rgba(7,32,84,0.14)] sm:h-[170px] sm:w-[450px]">
      <div
        className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: accent }}
      >
        {name
          .split(" ")
          .map((part) => part[0])
          .join("")}
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

function DriverHero() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#073fa7]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)",
          backgroundSize: "118px 118px",
        }}
      />
      <DriverHeader />

      <div className="relative z-10 mx-auto grid min-h-[530px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl leading-[1.02] font-semibold tracking-[-0.04em] sm:text-5xl lg:text-[64px]">
            Drive on your terms.
            <br />
            Earn what you&apos;re worth.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[neutral/shade/White] sm:text-xl">
            DriverVault connects you with people and businesses that need
            dependable drivers, with clear pay, fair terms, and no agency
            guesswork.
          </p>
          <Link
            href="/driver/auth/signup"
            className="mt-8 inline-flex items-center gap-3 rounded-[12px] bg-white px-7 py-4 text-sm font-semibold text-black shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Join as a driver
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-md flex-col gap-5 lg:ml-auto">
          {/* <div className="absolute top-11 -left-28 hidden size-28 overflow-hidden rounded-full border-[8px] border-slate-800/65 bg-slate-800 shadow-xl xl:block">
            <Image
              src="/driver-hero.svg"
              alt=""
              width={638}
              height={691}
              className="h-full w-full object-cover object-top"
            />
          </div> */}
          <TrustCard
            name="Mike Thomas"
            role="Executive Driver"
            score="91"
            accent="#608544"
          />
          <TrustCard
            name="Emmanuel Adewale"
            role="Corporate Driver"
            score="100"
            accent="#146f74"
          />
        </div>
      </div>
    </section>
  );
}

const DRIVER_BENEFITS = [
  "Choose opportunities that suit you",
  "See job and pay details upfront",
  "Get support throughout each job",
];

const WORK_BENEFITS = [
  {
    icon: WalletCards,
    title: "Clear earnings.",
    description:
      "See what a job pays before you accept, with no hidden deductions.",
  },
  {
    icon: CalendarDays,
    title: "Your schedule.",
    description:
      "Set your availability and choose only the jobs that suit you.",
  },
  {
    icon: ShieldCheck,
    title: "Verified clients",
    description: "Every request comes through a trusted, accountable network.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Apply and get verified",
    description:
      "Share your details and complete identity, licence, and insurance checks.",
  },
  {
    number: "02",
    title: "Pick the jobs you want",
    description:
      "Browse opportunities with routes, schedules, and earnings shown upfront.",
  },
  {
    number: "03",
    title: "Drive and get paid",
    description:
      "Complete trips with full support and receive reliable payouts.",
  },
];

const JOB_TYPES = [
  {
    title: "Contract Driver",
    description:
      "Drive on a fixed-term contract for a company or individual, with a clear start and end date.",
  },
  {
    title: "Private Driver",
    description:
      "Drive for an individual or family’s daily needs — school runs, errands, and appointments.",
  },
  {
    title: "Corporate Driver",
    description:
      "Drive for a company’s staff or executives as part of their day-to-day operations.",
  },
  {
    title: "Executive Driver",
    description:
      "Drive senior executives with the discretion, punctuality, and polish expected for the role.",
  },
  {
    title: "Spy Driver",
    description:
      "A specialised security-focused role for drivers trained in defensive and discreet driving.",
  },
  {
    title: "Expatriate Driver",
    description:
      "Drive expatriate clients who need local knowledge, comfortable communication, and reliable service.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I see the pay and route before I accept. That kind of clarity is rare in this work.",
    name: "Sarah Tarleton",
    location: "Kigali, Rwanda",
  },
  {
    quote: "When a schedule changed mid-job, support sorted it out in minutes.",
    name: "Sarah Tarleton",
    location: "Kigali, Rwanda",
  },
  {
    quote:
      "The verification process was straightforward, and my first request arrived quickly.",
    name: "Sarah Tarleton",
    location: "Kigali, Rwanda",
  },
];

const FAQS = [
  {
    question: "How do I join the network?",
    answer:
      "Create an account, complete your profile, and upload your identity, licence, and supporting documents. Our team will review them and let you know when you are verified.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Your agreed rate is shown before you accept a job. Completed jobs are paid through the platform according to the schedule shown in the request.",
  },
  {
    question: "Can I choose my own schedule?",
    answer:
      "Yes. You set your availability and choose which suitable requests you want to accept.",
  },
  {
    question: "What kinds of jobs are available?",
    answer:
      "Opportunities include private, corporate, contract, executive, specialist security, and expatriate driving roles.",
  },
  {
    question: "What support do I get on a job?",
    answer:
      "DriverVault support stays available from acceptance through completion to help resolve schedule, route, or client issues.",
  },
];

function ProfilePreview() {
  return (
    <div className="relative mx-auto w-full max-w-md py-8">
      <div className="absolute -top-1 left-0 z-10 rounded-2xl bg-white px-5 py-3 shadow-[0_12px_34px_rgba(15,23,42,.12)]">
        <p className="text-[9px] text-slate-500">Average rating</p>
        <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-800">
          4.8
          <span className="ml-1 flex text-amber-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-3 fill-current" />
            ))}
          </span>
        </div>
      </div>

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

function DriverIntro() {
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
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(#eef2f7 1px, transparent 1px), linear-gradient(90deg, #eef2f7 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="relative w-full">
            <ProfilePreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-[30px] bg-[#073fa7] p-6 pb-0 shadow-[0_24px_70px_rgba(7,63,167,.18)]">
      <div className="flex min-h-[470px] overflow-hidden rounded-t-2xl bg-white">
        <aside className="hidden w-32 shrink-0 border-r border-slate-100 px-4 py-7 sm:block">
          <TegatLogo size={28} />
          <div className="mt-9 space-y-3 text-[9px] text-slate-400">
            <div className="flex items-center gap-2">
              <ListChecks className="size-3" /> GET STARTED
            </div>
            <div className="flex items-center gap-2 rounded-md bg-blue-50 px-2 py-2 font-semibold text-blue-700">
              <LayoutDashboard className="size-3" /> Overview
            </div>
            <div className="flex items-center gap-2 px-2">
              <BriefcaseBusiness className="size-3" /> Job Request
            </div>
          </div>
        </aside>
        <div className="flex-1 bg-slate-50 px-5 py-7 sm:px-7">
          <div className="rounded-lg bg-white p-3 text-[9px] text-slate-400">
            Search here...
          </div>
          <p className="mt-7 text-xs font-semibold text-slate-900">
            Good afternoon, Chidinma 👋
          </p>
          <p className="mt-1 text-[9px] text-slate-500">
            You’re almost done! Here’s what is left to access Tegat.
          </p>
          <div className="mt-6 rounded-xl bg-blue-600 p-5 text-white shadow-lg">
            <p className="text-[9px] font-medium uppercase">Overall progress</p>
            <p className="mt-2 text-2xl font-semibold">80%</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-4/5 rounded-full bg-white" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ["Ongoing project", "0"],
              ["Trust score", "0"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-[8px] text-slate-400 uppercase">{label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 h-28 rounded-xl bg-white p-4 shadow-sm">
            <p className="text-[9px] font-semibold text-slate-800">
              Upcoming jobs
            </p>
            <div className="mt-6 h-2 w-2/3 rounded-full bg-slate-100" />
            <div className="mt-3 h-2 w-1/2 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyDrive() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24">
        <div>
          <p className="w-fit rounded-full bg-slate-50 px-4 py-2 text-[11px] font-semibold tracking-wide text-slate-600">
            WHY DRIVE WITH TEGAT
          </p>
          <h2 className="mt-12 max-w-md text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Work that respect your profession.
          </h2>
          <div className="mt-10 space-y-9">
            {WORK_BENEFITS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/driver/auth/signup"
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-[#073fa7] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#06368f]"
          >
            Sign up
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <DashboardPreview />
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-8 bg-[#f7f8fa] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="w-fit rounded-full bg-white px-4 py-2 text-[11px] font-semibold tracking-wide text-slate-600 shadow-sm">
          HOW IT WORKS
        </p>
        <h2 className="mt-5 max-w-lg text-3xl leading-tight font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
          From application to First Payout In Three Steps.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
            >
              <p className="text-3xl font-medium tracking-tight text-[#073fa7]">
                {step.number}
              </p>
              <div className="mt-auto pt-12">
                <h3 className="text-base font-semibold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JobTypes() {
  return (
    <section className="relative overflow-hidden bg-[#073fa7] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#053385] px-4 py-2 text-[11px] font-semibold tracking-wide">
          <BriefcaseBusiness className="size-4" />
          JOB TYPES
        </p>
        <h2 className="mt-5 max-w-sm text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-4xl">
          Choose work that fits your skillset
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {JOB_TYPES.map((job) => (
            <article
              key={job.title}
              className="flex min-h-64 flex-col rounded-2xl bg-white p-6 text-slate-950 sm:p-7"
            >
              <div className="grid size-10 place-items-center rounded-full bg-blue-50 text-blue-600">
                <BriefcaseBusiness className="size-4" />
              </div>
              <div className="mt-auto pt-10">
                <h3 className="text-base font-semibold">{job.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {job.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#f7f8fa] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
          What drivers say about us
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <figure
              key={`${testimonial.quote}-${index}`}
              className="rounded-2xl bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,.03)]"
            >
              <div
                className="flex gap-1 text-amber-500"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 min-h-20 text-sm leading-6 text-slate-700">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-[#50734a] text-[10px] font-semibold text-white">
                  ST
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {testimonial.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function DriverFaqs() {
  return (
    <section
      id="faqs"
      className="scroll-mt-8 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
          DRIVER QUESTIONS, ANSWERED
        </h2>
        <div className="mt-10 space-y-3">
          {FAQS.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group rounded-2xl border border-transparent px-5 py-4 open:border-slate-100 open:bg-[#f8f9fb] sm:px-7"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 text-sm font-semibold text-slate-950 marker:hidden">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-slate-300 text-slate-500 group-open:hidden">
                  <CirclePlus className="size-4" />
                </span>
                <span className="hidden size-6 shrink-0 place-items-center rounded-full border border-slate-300 text-slate-500 group-open:grid">
                  <Minus className="size-3" />
                </span>
                {item.question}
              </summary>
              <p className="pt-3 pl-10 text-sm leading-6 text-slate-500">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mx-auto mt-14 flex max-w-xl flex-col items-center rounded-3xl bg-blue-50 px-6 py-8 text-center">
          <Mail className="size-6 text-blue-700" />
          <p className="mt-3 text-sm font-semibold text-slate-900">
            Still have a question?
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Our support team is ready to help you get started.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function DriverLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <DriverHero />
      <main>
        <DriverIntro />
        <WhyDrive />
        <HowItWorksSection />
        <JobTypes />
        <Testimonials />
        <DriverFaqs />
      </main>
      <SiteFooter />
    </div>
  );
}
