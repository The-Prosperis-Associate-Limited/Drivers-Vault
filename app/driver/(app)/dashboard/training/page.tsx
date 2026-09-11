"use client";

import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { Award, Clock, Download, GraduationCap } from "lucide-react";
import Link from "next/link";
import { PathRow } from "./_components/path-row";
import {
  useCertifications,
  useRequiredPath,
  useTrainingStats,
} from "./_hooks/use-training";

export default function Training() {
  const { stats, isFetching } = useTrainingStats();
  const { path, isFetching: isFetchingPath } = useRequiredPath();
  const { certifications, isFetching: isFetchingCertifications } =
    useCertifications();

  const completion = stats?.completion_percent ?? 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="border-border border-b pb-5">
        <PageHeader
          title="Training & skills"
          subtitle="Complete required modules to strengthen your profile and increase your trust score."
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
        {isFetching && !stats ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))
        ) : (
          <>
            <div className="border-border rounded-xl border bg-white p-4 md:p-5">
              <AppText type="label" className="text-foreground uppercase">
                Completion
              </AppText>
              <AppText
                type="h2"
                className="mt-2 text-2xl font-semibold md:text-[28px]"
                as="p"
              >
                {completion}%
              </AppText>
              <Progress
                value={completion}
                aria-label="Training completion"
                className="mt-3"
              />
            </div>

            <StatCard
              label="Modules passed"
              value={`${stats?.required_courses_completed ?? 0} / ${stats?.required_courses ?? 0}`}
              caption="All modules are required to certify"
              captionTone="muted"
            />
            <StatCard
              label="Certificates"
              value={stats?.certifications_earned ?? 0}
              caption="Verified on your profile"
              captionTone="muted"
            />
          </>
        )}
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <AppText type="h4" className="text-base font-semibold">
            Recently earned
          </AppText>
          <AppText type="caption" className="text-muted-foreground block">
            Credentials earned from completed assessments.
          </AppText>
        </div>

        <div className="border-border rounded-xl border bg-white p-3 md:p-4">
          {isFetchingCertifications && !certifications.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
            </div>
          ) : !certifications.length ? (
            <EmptyState
              icon={Award}
              title="No certificate has been awarded yet."
              description="To earn a certificate, watch the courses and complete every module."
            />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {certifications.map((certification) => (
                <div
                  key={certification.id}
                  className="border-border flex items-center gap-3 rounded-xl border p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                    <Award className="h-5 w-5 text-amber-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <AppText
                      type="label"
                      className="text-brand block truncate font-semibold"
                    >
                      {certification.course.title}
                    </AppText>
                    <AppText
                      type="caption"
                      className="text-brand/80 block font-medium"
                    >
                      Certified {formatDate(certification.issued_at)}
                    </AppText>
                  </div>

                  {certification.document_url ? (
                    <a
                      href={certification.document_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Download ${certification.course.title} certificate`}
                      className="text-foreground hover:text-brand shrink-0 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                  ) : (
                    <Link
                      href={`/driver/dashboard/training/${certification.course.slug}?view=certificate`}
                      aria-label={`View ${certification.course.title} certificate`}
                      className="text-foreground hover:text-brand shrink-0 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-border overflow-hidden rounded-xl border bg-white">
        <div className="border-border flex flex-col gap-2 border-b px-4 py-4 sm:flex-row sm:items-start sm:justify-between md:px-5">
          <div className="space-y-1">
            <AppText type="h4" className="text-base font-semibold">
              Required learning path
            </AppText>
            <AppText type="caption" className="text-muted-foreground block">
              Finish each assessment to unlock your driver certification.
            </AppText>
          </div>

          <Link
            href="/driver/dashboard/training/courses"
            className="text-brand shrink-0 text-sm font-semibold underline underline-offset-2"
          >
            All courses
          </Link>
        </div>

        <div className="divide-border divide-y">
          {isFetchingPath && !path.length ? (
            <div className="space-y-3 p-4">
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ) : !path.length ? (
            <EmptyState
              icon={GraduationCap}
              title="No required courses yet."
              description="Modules that count towards your certification will appear here as they're published."
              action={
                <Button asChild className="h-11 rounded-lg px-6">
                  <Link href="/driver/dashboard/training/courses">
                    Browse courses
                  </Link>
                </Button>
              }
            />
          ) : (
            path.map((course) => <PathRow key={course.id} course={course} />)
          )}
        </div>
      </div>

      {!!stats?.minutes_invested && (
        <AppText
          type="caption"
          className="text-muted-foreground flex items-center gap-1.5"
        >
          <Clock className="h-3.5 w-3.5" />
          {(stats.minutes_invested / 60).toFixed(1)} hours invested since
          joining · +{stats.trust_score_boost} trust score from training
        </AppText>
      )}
    </div>
  );
}
