import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";

// Static marketing copy from the design. Only Driver is searchable today; every
// card lands on the marketplace, which shows what the platform actually has.
const ROLES = [
  { title: "Driver", blurb: "Vetted, trained professional drivers" },
  { title: "Executive Assistant", blurb: "Discreet, organised support staff" },
  { title: "Accountant", blurb: "Verified finance professionals" },
  { title: "Front-End Developer", blurb: "Screened engineering talent" },
  { title: "QA Tester", blurb: "Detail-driven quality specialists" },
  { title: "Sales / Marketing", blurb: "Growth and revenue professionals" },
  { title: "HR Manager", blurb: "People operations leaders" },
  { title: "Auditor", blurb: "Independent assurance experts" },
  { title: "Project Manager", blurb: "Delivery and coordination leads" },
];

export const RolesSection = function () {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <SectionEyebrow index="02" label="Browse by role" />
      <h2 className="text-ink mt-4 text-2xl font-semibold md:text-3xl">
        One marketplace, many vetted roles
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((role) => (
          <Link
            key={role.title}
            href="/marketplace"
            className="group border-border hover:border-brand/40 flex items-center justify-between rounded-xl border bg-white p-5 transition-colors"
          >
            <div>
              <p className="text-ink text-sm font-semibold">{role.title}</p>
              <p className="text-muted-foreground mt-1 text-sm">{role.blurb}</p>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-brand h-4 w-4 shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
};
