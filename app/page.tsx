import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
  CircleDollarSign,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  WalletCards,
} from "lucide-react";

import { ClientSearchForm } from "@/components/landing/client-search-form";
import { ClientMobileNav } from "@/components/landing/client-mobile-nav";
import { SiteFooter } from "@/components/shared/site-footer";
import { TegatLogo } from "@/components/svg/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ClientHeader() {
  return (
    <header className="relative z-20 mx-auto w-full max-w-7xl px-2 pt-3 sm:px-6 sm:pt-5 lg:px-8">
      <div className="flex h-14 items-center justify-between rounded-full bg-white px-3 shadow-sm sm:h-16 sm:px-7">
        <Link href="/" aria-label="DriverVault home">
          <TegatLogo size={35} />
        </Link>
        <nav
          aria-label="Client landing page navigation"
          className="hidden items-center gap-8 text-[11px] font-semibold tracking-wide text-slate-700 md:flex"
        >
          <Link href="/" className="text-blue-700">FOR CLIENTS</Link>
          <Link href="/driver" className="transition-colors hover:text-blue-700">FOR DRIVERS</Link>
          <Link href="#how-it-works" className="transition-colors hover:text-blue-700">HOW IT WORKS</Link>
          <Link href="#faqs" className="transition-colors hover:text-blue-700">FAQS</Link>
        </nav>
        <ClientMobileNav />
        <Link
          href="/auth/signup"
          className="hidden rounded-xl bg-[#0a3fa8] px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#07368f] md:inline-flex"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}

function RatingBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white px-5 py-3 shadow-[0_10px_30px_rgba(7,32,84,.14)] ${className}`}>
      <p className="text-[9px] text-slate-500">Average rating</p>
      <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-900">
        4.8
        <span className="flex gap-0.5 text-amber-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-3 fill-current" />
          ))}
        </span>
      </div>
    </div>
  );
}

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
        <p className="mt-4 text-sm font-semibold text-slate-950 sm:mt-5 sm:text-base">Emmanuel Adewale</p>
        <p className="mt-1 text-xs text-slate-500">Corporate Driver</p>
      </div>
      <RatingBadge className="absolute -right-5 bottom-0 z-10 hidden sm:block" />
    </div>
  );
}

function ClientHero() {
  return (
    <section className="relative overflow-hidden bg-[#073fa7] lg:min-h-[620px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)",
          backgroundSize: "118px 118px",
        }}
      />
      <ClientHeader />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-16 lg:min-h-[530px] lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div className="relative max-w-2xl text-center text-white lg:text-left">
          <div className="absolute -top-12 left-56 hidden size-24 overflow-hidden rounded-full border-[8px] border-slate-900/65 bg-slate-900 shadow-xl xl:block">
            <Image src="/driver-hero.svg" alt="" width={638} height={691} className="h-full w-full object-cover object-top" />
          </div>
          <h1 className="text-[1.75rem] leading-[1.05] font-semibold tracking-[-0.045em] min-[390px]:text-3xl sm:text-5xl lg:text-6xl">
            Drivers, verified<br />before they reach you.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-blue-50/90 sm:mt-6 sm:text-lg sm:leading-7 lg:mx-0">
            Hire a verified professional driver for a single trip, a recurring schedule, or your whole business, without agencies or guesswork.
          </p>
          <Link
            href="/auth/signup"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 sm:mt-8 sm:rounded-xl sm:px-6 sm:py-4 sm:text-sm"
          >
            Hire a Driver <ArrowRight className="size-4" />
          </Link>
        </div>
        <DriverProfileCard />
      </div>
    </section>
  );
}

const FIND_DRIVER_BENEFITS = [
  "Browse verified profiles and experience",
  "Book one-off or recurring transport",
  "Get clear updates from request to arrival",
];

function FindDriverSection() {
  return (
    <section className="bg-[#f2f5fb] px-2 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-2xl bg-[#073fa7] sm:rounded-3xl lg:grid-cols-[1.1fr_.9fr]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
          }}
        />
        <div className="relative flex flex-col justify-center px-5 py-8 text-white sm:px-12 sm:py-12 lg:px-16 lg:py-16">
          <p className="w-fit rounded-full bg-[#052f7e] px-3 py-2 text-[9px] font-semibold tracking-wide sm:px-4 sm:text-[11px]">FOR CLIENTS</p>
          <h2 className="mt-5 text-[1.4rem] font-semibold tracking-[-0.035em] sm:mt-6 sm:text-4xl">Find the right driver</h2>
          <p className="mt-3 max-w-xl text-xs leading-5 text-blue-50/85 sm:mt-4 sm:text-base sm:leading-6">
            DriverVault vets every candidate against national identity, licence and police records, then scores them on reliability so you decide with confidence.
          </p>
          <ul className="mt-5 space-y-2.5 text-xs leading-5 text-blue-50/90 sm:mt-6 sm:space-y-3 sm:text-sm">
            {FIND_DRIVER_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-white" />{benefit}
              </li>
            ))}
          </ul>
          <Link href="/auth/signup" className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-semibold text-slate-900 transition-transform hover:-translate-y-0.5 sm:mt-8 sm:rounded-xl sm:px-6 sm:py-4 sm:text-sm">
            Start hiring <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative flex items-center border-t border-white/10 px-4 py-7 sm:px-7 sm:py-12 lg:border-t-0 lg:border-l lg:px-12">
          <div className="w-full"><ClientSearchForm /></div>
        </div>
      </div>
    </section>
  );
}

const CLIENT_BENEFITS = [
  { icon: ShieldCheck, title: "Verified professionals.", description: "Every driver passes identity, licence, insurance, and background checks." },
  { icon: WalletCards, title: "Transparent pricing", description: "Know the cost upfront, no hidden fees, ever." },
  { icon: MapPin, title: "Real-time updates", description: "Track progress and get arrival notifications from request to drop-off." },
];

function ClientDashboardPreview() {
  return (
    <div className="overflow-hidden rounded-[22px] bg-[#073fa7] p-3 pb-0 shadow-[0_24px_70px_rgba(7,63,167,.18)] sm:rounded-[30px] sm:p-6 sm:pb-0">
      <div className="flex min-h-[390px] overflow-hidden rounded-t-xl bg-white sm:min-h-[485px] sm:rounded-t-2xl">
        <aside className="hidden w-32 shrink-0 border-r border-slate-100 px-4 py-7 sm:block">
          <TegatLogo size={28} />
          <div className="mt-9 space-y-3 text-[9px] text-slate-400">
            <div className="flex items-center gap-2 rounded-md bg-blue-50 px-2 py-2 font-semibold text-blue-700"><LayoutDashboard className="size-3" /> Overview</div>
            <div className="flex items-center gap-2 px-2"><Users className="size-3" /> My Drivers</div>
            <div className="flex items-center gap-2 px-2"><BriefcaseBusiness className="size-3" /> Request</div>
          </div>
        </aside>
        <div className="min-w-0 flex-1 bg-slate-50 px-3 py-5 sm:px-7 sm:py-7">
          <div className="rounded-lg bg-white p-3 text-[9px] text-slate-400">Search here...</div>
          <p className="mt-7 text-xs font-semibold text-slate-900">Welcome back, yourcompany</p>
          <p className="mt-1 text-[9px] text-slate-500">Here’s what is happening across your account.</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[["Active drivers", "0"], ["Open requests", "1"]].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-[8px] uppercase text-slate-400">{label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
            <p className="text-[9px] font-semibold text-slate-800">Your hired drivers</p>
            <div className="mt-3 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="grid size-7 place-items-center rounded-full bg-emerald-700 text-[7px] font-semibold text-white">MA</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-semibold text-slate-800">Musa Abdulkarim</p>
                    <p className="text-[7px] text-slate-400">Executive Driver</p>
                  </div>
                  <span className="text-[7px] font-medium text-emerald-600">ACTIVE</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyClientsChoose() {
  return (
    <section className="px-2 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24">
        <div>
          <p className="w-fit rounded-full bg-slate-50 px-3 py-2 text-[9px] font-semibold tracking-wide text-slate-600 sm:px-4 sm:text-[11px]">WHY CLIENTS CHOOSE DRIVERSVAULT</p>
          <h2 className="mt-7 max-w-md text-[1.4rem] font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:mt-12 sm:text-4xl">Peace of mind on every trip.</h2>
          <div className="mt-7 space-y-7 sm:mt-10 sm:space-y-9">
            {CLIENT_BENEFITS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600 sm:size-12"><Icon className="size-4 sm:size-5" /></div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-950 sm:text-base">{title}</h3>
                  <p className="mt-1 max-w-md text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/auth/signup" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#073fa7] px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#06368f] sm:mt-10 sm:rounded-xl sm:px-6 sm:py-4 sm:text-sm">
            Sign up <ArrowRight className="size-4" />
          </Link>
        </div>
        <ClientDashboardPreview />
      </div>
    </section>
  );
}

const STEPS = [
  { number: "01", title: "Sign up", description: "Create your account in minutes and tell us who you are, where you go, and what you need." },
  { number: "02", title: "Find a driver", description: "Browse verified professionals matched to your route, schedule, and preferences." },
  { number: "03", title: "Make payment", description: "Pay securely from your wallet or by bank transfer, with no hidden fees, ever." },
];

function ClientHowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-8 bg-[#f7f8fa] px-2 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="w-fit rounded-full bg-white px-3 py-2 text-[9px] font-semibold tracking-wide text-slate-600 shadow-sm sm:px-4 sm:text-[11px]">HOW IT WORKS</p>
        <h2 className="mt-5 max-w-lg text-[1.4rem] font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">From Request to Arrival in three steps.</h2>
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <article key={step.number} className="flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:min-h-64 sm:p-8">
              <p className="text-2xl font-medium tracking-tight text-[#073fa7] sm:text-3xl">{step.number}</p>
              <div className="mt-auto pt-8 sm:pt-12">
                <h3 className="text-sm font-semibold text-slate-950 sm:text-base">{step.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const USE_CASES = [
  { icon: BriefcaseBusiness, title: "PERSONAL TRANSPORT", description: "Airport runs, family trips, events, and daily errands with a driver you can trust.", position: "lg:self-start" },
  { icon: Users, title: "BUSINESS TRAVEL", description: "Reliable transport for executives, teams, and visiting partners — on schedule, every time.", position: "lg:self-center" },
  { icon: CalendarClock, title: "RECURRING ROUTES", description: "School runs, staff shuttles, and scheduled deliveries handled by the same vetted professionals.", position: "lg:self-end" },
];

function UseCases() {
  return (
    <section className="bg-[#f2f5fb] px-2 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto overflow-hidden rounded-2xl bg-[#073fa7] px-5 py-9 text-white sm:rounded-3xl sm:px-12 sm:py-12 lg:min-h-[520px] lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
          }}
        />
        <div className="relative">
          <p className="w-fit rounded-full bg-[#052f7e] px-3 py-2 text-[9px] font-semibold tracking-wide sm:px-4 sm:text-[11px]">USE CASES</p>
          <h2 className="mt-5 max-w-lg text-[1.4rem] font-semibold leading-tight tracking-[-0.035em] sm:mt-6 sm:text-4xl">However you move, we have drivers for you.</h2>
          <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 lg:h-56 lg:grid-cols-3">
            {USE_CASES.map(({ icon: Icon, title, description, position }) => (
              <article key={title} className={position}>
                <div className="grid size-10 place-items-center rounded-full bg-white text-blue-700 sm:size-12"><Icon className="size-4 sm:size-5" /></div>
                <h3 className="mt-4 text-xs font-semibold tracking-wide sm:text-sm">{title}</h3>
                <p className="mt-2 max-w-sm text-xs leading-5 text-blue-50/80 sm:text-sm sm:leading-6">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  "Booked a driver for a week of meetings—punctual, professional, and completely stress-free.",
  "The driver was courteous, the price was clear, and every trip ran exactly on schedule.",
  "Knowing the driver is verified before they arrive changes everything for our family.",
];

function ClientTestimonials() {
  return (
    <section className="bg-[#f7f8fa] px-2 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-[1.4rem] font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">What client say about us</h2>
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure key={testimonial} className="rounded-2xl bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,.03)] sm:p-7">
              <div className="flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-xs leading-5 text-slate-700 sm:min-h-20 sm:text-sm sm:leading-6">“{testimonial}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-[#50734a] text-[10px] font-semibold text-white">ST</div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Sarah Tarleton</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">Kigali, Rwanda</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { question: "How do I book a driver?", answer: "Share your route, schedule, and requirements. DriverVault matches you with a verified professional who fits your needs." },
  { question: "What does it cost?", answer: "Pricing depends on the route, schedule, and type of service. You will see the full cost before confirming your request." },
  { question: "Can I book recurring trips?", answer: "Yes. You can request daily, weekly, or custom recurring transport for your family, team, or business." },
  { question: "What if my plans change?", answer: "Update your request as early as possible and our support team will help coordinate the change with your driver." },
  { question: "What support do I get on a job?", answer: "DriverVault support remains available from booking through completion to help with schedule, route, or service issues." },
];

function ClientFaqs() {
  return (
    <section id="faqs" className="scroll-mt-8 px-2 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-[1.25rem] font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">CLIENT QUESTIONS, ANSWERED</h2>
        <Accordion type="single" collapsible defaultValue="faq-0" className="mt-7 gap-2 sm:mt-10 sm:gap-3">
          {FAQS.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-2xl border-0 px-3 data-open:bg-[#f8f9fb] sm:px-7">
              <AccordionTrigger className="gap-3 py-4 text-xs font-semibold text-slate-950 hover:no-underline sm:gap-4 sm:py-5 sm:text-sm">
                <span className="flex items-center gap-3 sm:gap-4">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full border border-slate-300 text-[10px] text-slate-500">{index + 1}</span>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pr-5 pb-4 pl-8 text-xs leading-5 text-slate-500 sm:pr-8 sm:pb-5 sm:pl-9 sm:text-sm sm:leading-6">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#073fa7] px-3 py-14 text-center text-white sm:px-6 sm:py-20 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)",
          backgroundSize: "92px 92px",
        }}
      />
      <div className="relative mx-auto max-w-xl">
        <CircleDollarSign className="mx-auto size-6 text-blue-200 sm:size-8" />
        <h2 className="mt-4 text-[1.8rem] font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">Book a verified<br />driver today</h2>
        <p className="mx-auto mt-4 max-w-lg text-xs leading-5 text-blue-50/85 sm:text-sm sm:leading-6">Tell DriverVault what you need and get matched with a verified professional—usually within a day.</p>
        <Link href="/auth/signup" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-semibold text-slate-900 transition-transform hover:-translate-y-0.5 sm:mt-7 sm:rounded-xl sm:px-6 sm:py-4 sm:text-sm">
          Start hiring <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <ClientHero />
      <main>
        <FindDriverSection />
        <WhyClientsChoose />
        <ClientHowItWorks />
        <UseCases />
        <ClientTestimonials />
        <ClientFaqs />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
