import { CircleCheck } from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";

const CHECKS = [
  {
    title: "NIMC identity check",
    blurb: "Every applicant's identity is verified before they appear.",
  },
  {
    title: "FRSC licence check",
    blurb: "Drivers are validated against official licence records.",
  },
  {
    title: "Police record check",
    blurb: "Background screening keeps the marketplace safe.",
  },
];

export const TrustSection = function () {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionEyebrow index="04" label="Why trust us" />
          <h2 className="text-ink mt-4 max-w-md text-2xl font-semibold md:text-3xl">
            Verification you can see, privacy you can rely on.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
            You always see a candidate's verification status and trust score —
            but never their raw NIN, licence numbers or guarantor documents.
            Sensitive data stays sealed.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {CHECKS.map((check) => (
            <div
              key={check.title}
              className="border-brand/30 bg-brand-soft/40 flex items-start gap-3 rounded-xl border p-5"
            >
              <CircleCheck className="text-brand mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-ink text-sm font-semibold">{check.title}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {check.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
