import { Bus, Clock, ShieldCheck, Wallet, type LucideIcon } from "lucide-react";

interface FaqSection {
  title: string;
  icon: LucideIcon;
  questions: { question: string; answer: string }[];
}

/*
  Static copy, not a CMS. These answers describe how this app and the server
  behave, so they belong beside the code that behaves that way — if verification
  or payouts change, this file changes in the same commit.
*/
export const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "Verification & onboarding",
    icon: ShieldCheck,
    questions: [
      {
        question: "Why is my profile still private?",
        answer:
          "Your profile stays private and unsearchable until identity, licence and criminal-record checks are complete. Once every check passes you become visible to clients in your state.",
      },
      {
        question: "My proof of address was rejected",
        answer:
          "Open the verification centre from your dashboard. The reviewer's reason is shown against each document — fix only those and resubmit. The rest of your application stands, you do not start again.",
      },
      {
        question: "How long does verification take?",
        answer:
          "Usually 24 to 48 hours. We email you as soon as a decision is made, and the dashboard updates at the same time.",
      },
    ],
  },
  {
    title: "Jobs & bookings",
    icon: Bus,
    questions: [
      {
        question: "How do I get my first job?",
        answer:
          "Finish verification, then complete the required learning path. Clients search verified drivers by trust score, so certifications and a complete profile are what put you in front of them.",
      },
      {
        question: "A client cancelled my booking",
        answer:
          "A cancellation by the client does not count against your reliability. If you were already on the way, report it here and support will look at the trip.",
      },
    ],
  },
  {
    title: "Payments & payouts",
    icon: Wallet,
    questions: [
      {
        question: "When do I get paid?",
        answer:
          "Payment for a completed booking lands in your wallet as pending, then clears to available. You can withdraw anything showing as available from Settings, under Earnings.",
      },
      {
        question: "How do I change my payout account?",
        answer:
          "Settings, then Earnings, then Payout accounts. We confirm the account name with your bank rather than asking you to type it, so a mistyped number cannot pay a stranger.",
      },
    ],
  },
  {
    title: "Trust score & ratings",
    icon: Clock,
    questions: [
      {
        question: "How is my trust score calculated?",
        answer:
          "Four things: clearing verification, completing required training, completing bookings, and your average client rating. Open Trust score from your dashboard to see exactly what each one is worth right now.",
      },
    ],
  },
];
