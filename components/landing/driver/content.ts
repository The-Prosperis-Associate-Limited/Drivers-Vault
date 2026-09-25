import { CalendarDays, ShieldCheck, WalletCards } from "lucide-react";

import type { LandingBenefit } from "../shared/benefits-section";
import type { FaqItem } from "../shared/faq-section";
import type { LandingStep } from "../shared/how-it-works-section";
import type { LandingTestimonial } from "../shared/testimonials-section";

export const DRIVER_BENEFITS = [
  "Choose opportunities that suit you",
  "See job and pay details upfront",
  "Get support throughout each job",
] as const;

export const WORK_BENEFITS = [
  {
    icon: WalletCards,
    title: "Clear earnings.",
    description: "See what a job pays before you accept, no hidden deductions.",
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
] satisfies readonly LandingBenefit[];

export const DRIVER_STEPS = [
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
] satisfies readonly LandingStep[];

export const JOB_TYPES = [
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
] as const;

export const DRIVER_TESTIMONIALS = [
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
] satisfies readonly LandingTestimonial[];

export const DRIVER_FAQS = [
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
] satisfies readonly FaqItem[];
