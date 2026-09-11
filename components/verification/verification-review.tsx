"use client";

import { AppText } from "@/components/shared/app-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ACADEMIC_LEVEL_OPTIONS,
  DOCUMENT_LABELS,
  DRIVER_TYPE_OPTIONS,
  formatDate,
} from "@/lib/utils";
import { CheckCircle2, CircleAlert, Pencil } from "lucide-react";
import Link from "next/link";
import type { DriverDocument, DriverProfile } from "@/types/driver";

const REQUIRED_DOCUMENTS = [
  "NIN_SLIP",
  "PASSPORT_PHOTO",
  "DRIVERS_LICENCE",
] as const;

export const getVerificationReadiness = function (
  profile: DriverProfile | undefined,
  documents: DriverDocument[],
) {
  const user = profile?.user;

  const hasPersonal = !!(
    user?.phone_no &&
    user?.date_of_birth &&
    user?.country
  );
  const hasExperience = !!(profile?.driver_type && profile?.license_number);
  const hasDocuments = REQUIRED_DOCUMENTS.every((type) =>
    documents.some((document) => document.type === type),
  );

  return {
    hasPersonal,
    hasExperience,
    hasDocuments,
    canSubmit: hasPersonal && hasExperience && hasDocuments,
  };
};

const labelFor = (
  options: { value: string; label: string }[],
  value?: string | null,
) => options.find((option) => option.value === value)?.label ?? value ?? "—";

interface RowProps {
  label: string;
  value?: React.ReactNode;
}

const Row = function ({ label, value }: RowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <AppText type="caption" className="text-muted-foreground shrink-0">
        {label}
      </AppText>
      <AppText
        type="caption"
        className="text-foreground text-right font-medium"
      >
        {value || "—"}
      </AppText>
    </div>
  );
};

interface SectionProps {
  value: string;
  title: string;
  editHref: string;
  complete: boolean;
  children: React.ReactNode;
}

const Section = function ({
  value,
  title,
  editHref,
  complete,
  children,
}: SectionProps) {
  return (
    <AccordionItem
      value={value}
      className="border-border mb-3 rounded-xl border px-4"
    >
      <AccordionTrigger className="hover:no-underline">
        <span className="flex items-center gap-2 text-left text-sm font-semibold">
          {complete ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <CircleAlert className="text-destructive h-4 w-4 shrink-0" />
          )}
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="divide-border divide-y">{children}</div>

        {/* Editing an earlier step never sends the driver back to the start —
            onboarding_step only moves forward on the server. */}
        <Link
          href={editHref}
          className="text-brand mt-3 inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit this section
        </Link>
      </AccordionContent>
    </AccordionItem>
  );
};

interface Props {
  profile: DriverProfile | undefined;
  documents: DriverDocument[];
}

export const VerificationReview = function ({ profile, documents }: Props) {
  const user = profile?.user;
  const { hasPersonal, hasExperience, hasDocuments } = getVerificationReadiness(
    profile,
    documents,
  );

  return (
    <Accordion type="single" collapsible defaultValue="personal">
      <Section
        value="personal"
        title="Personal information"
        editHref="/onboarding/personal-information"
        complete={hasPersonal}
      >
        <Row label="Phone Number" value={user?.phone_no} />
        <Row
          label="Marital Status"
          value={user?.marital_status?.toLowerCase()}
        />
        <Row
          label="Date of birth"
          value={user?.date_of_birth ? formatDate(user.date_of_birth) : null}
        />
        <Row label="Where do you reside" value={user?.state_of_residence} />
        <Row label="State of origin" value={profile?.state_of_origin} />
      </Section>

      <Section
        value="experience"
        title="Years of Experience"
        editHref="/onboarding/experience"
        complete={hasExperience}
      >
        <Row
          label="Years of Experience"
          value={
            profile?.years_of_experience != null
              ? `${profile.years_of_experience} yrs`
              : null
          }
        />
        <Row
          label="Driver type"
          value={labelFor(DRIVER_TYPE_OPTIONS, profile?.driver_type)}
        />
        <Row
          label="What can you Drive"
          value={profile?.vehicle_classes.join(", ")}
        />
        <Row label="Licence number" value={profile?.license_number} />
        <Row
          label="Licence expiry"
          value={
            profile?.license_expires_at
              ? formatDate(profile.license_expires_at)
              : null
          }
        />
      </Section>

      <Section
        value="academic"
        title="Academic Qualification"
        editHref="/onboarding/academic-qualification"
        complete={!!profile?.academic_level}
      >
        <Row
          label="Academic Level"
          value={labelFor(ACADEMIC_LEVEL_OPTIONS, profile?.academic_level)}
        />
        <Row label="Institution" value={profile?.institution} />
        <Row label="Course of study" value={profile?.course_of_study} />
      </Section>

      <Section
        value="work"
        title="Your Work Experience"
        editHref="/onboarding/work-experience"
        complete={!!profile?.work_experiences.length}
      >
        {profile?.work_experiences.length ? (
          profile.work_experiences.map((entry) => (
            <Row
              key={entry.id}
              label={entry.employer}
              value={`${entry.job_title} · ${formatDate(entry.started_at)} – ${
                entry.is_current || !entry.ended_at
                  ? "Present"
                  : formatDate(entry.ended_at)
              }`}
            />
          ))
        ) : (
          <Row label="No roles added" />
        )}
      </Section>

      <Section
        value="guarantors"
        title="Your Guarantor Information"
        editHref="/onboarding/guarantors"
        complete={!!profile?.guarantors.length}
      >
        {profile?.guarantors.length ? (
          profile.guarantors.map((guarantor) => (
            <Row
              key={guarantor.id}
              label={guarantor.full_name}
              value={`${guarantor.relationship.toLowerCase().replace(/_/g, " ")} · ${guarantor.phone_no}`}
            />
          ))
        ) : (
          <Row label="No guarantors added" />
        )}
      </Section>

      <Section
        value="additional"
        title="Additional Information (Optional)"
        editHref="/onboarding/additional-information"
        complete
      >
        <Row label="Languages" value={profile?.languages.join(", ")} />
        <Row label="Religion" value={profile?.religion} />
      </Section>

      <Section
        value="documents"
        title="Uploaded Documents"
        editHref="/onboarding/documents"
        complete={
          hasDocuments && !documents.some((d) => d.status === "REJECTED")
        }
      >
        {documents.length ? (
          documents.map((document) => (
            <Row
              key={document.id}
              label={DOCUMENT_LABELS[document.type] ?? document.type}
              value={
                document.status === "REJECTED" ? (
                  // The reviewer wrote this for the driver — render it verbatim.
                  <span className="text-destructive">
                    {document.rejection_reason ?? "Rejected"}
                  </span>
                ) : (
                  (document.file_name ?? "Uploaded")
                )
              }
            />
          ))
        ) : (
          <Row label="No documents uploaded" />
        )}
      </Section>
    </Accordion>
  );
};
