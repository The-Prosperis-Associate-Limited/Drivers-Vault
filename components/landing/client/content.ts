import {
  BriefcaseBusiness,
  CalendarClock,
  MapPin,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";

import type { LandingBenefit } from "../shared/benefits-section";
import type { FaqItem } from "../shared/faq-section";
import type { LandingStep } from "../shared/how-it-works-section";
import type { LandingTestimonial } from "../shared/testimonials-section";

export const FIND_DRIVER_BENEFITS = [
  "Browse verified profiles and experience",
  "Book one-off or recurring transport",
  "Get clear updates from request to arrival",
] as const;

export const CLIENT_BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Verified professionals.",
    description:
      "Every driver passes identity, licence, insurance, and background checks.",
  },
  {
    icon: WalletCards,
    title: "Transparent pricing",
    description: "Know the cost upfront, no hidden fees, ever.",
  },
  {
    icon: MapPin,
    title: "Real-time updates",
    description:
      "Track progress and get arrival notifications from request to drop-off.",
  },
] satisfies readonly LandingBenefit[];

export const CLIENT_STEPS = [
  {
    number: "01",
    title: "Sign up",
    description:
      "Create your account in minutes and tell us who you are, where you go, and what you need.",
  },
  {
    number: "02",
    title: "Find a driver",
    description:
      "Browse verified professionals matched to your route, schedule, and preferences.",
  },
  {
    number: "03",
    title: "Make payment",
    description:
      "Pay securely from your wallet or by bank transfer, with no hidden fees, ever.",
  },
] satisfies readonly LandingStep[];

export const CLIENT_USE_CASES = [
  {
    icon: BriefcaseBusiness,
    title: "PERSONAL TRANSPORT",
    description:
      "Airport runs, family trips, events, and daily errands with a driver you can trust.",
    position: "lg:self-start",
  },
  {
    icon: Users,
    title: "BUSINESS TRAVEL",
    description:
      "Reliable transport for executives, teams, and visiting partners — on schedule, every time.",
    position: "lg:self-center",
  },
  {
    icon: CalendarClock,
    title: "RECURRING ROUTES",
    description:
      "School runs, staff shuttles, and scheduled deliveries handled by the same vetted professionals.",
    position: "lg:self-end",
  },
] as const;

export const CLIENT_TESTIMONIALS = [
  {
    quote:
      "Booked a driver for a week of meetings—punctual, professional, and completely stress-free.",
    name: "Sarah Tarleton",
    location: "Kigali, Rwanda",
  },
  {
    quote:
      "The driver was courteous, the price was clear, and every trip ran exactly on schedule.",
    name: "Sarah Tarleton",
    location: "Kigali, Rwanda",
  },
  {
    quote:
      "Knowing the driver is verified before they arrive changes everything for our family.",
    name: "Sarah Tarleton",
    location: "Kigali, Rwanda",
  },
] satisfies readonly LandingTestimonial[];

export const CLIENT_FAQS = [
  {
    question: "How do I book a driver?",
    answer:
      "Share your route, schedule, and requirements. DriverVault matches you with a verified professional who fits your needs.",
  },
  {
    question: "What does it cost?",
    answer:
      "Pricing depends on the route, schedule, and type of service. You will see the full cost before confirming your request.",
  },
  {
    question: "Can I book recurring trips?",
    answer:
      "Yes. You can request daily, weekly, or custom recurring transport for your family, team, or business.",
  },
  {
    question: "What if my plans change?",
    answer:
      "Update your request as early as possible and our support team will help coordinate the change with your driver.",
  },
  {
    question: "What support do I get on a job?",
    answer:
      "DriverVault support remains available from booking through completion to help with schedule, route, or service issues.",
  },
] satisfies readonly FaqItem[];
