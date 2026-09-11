"use client";

import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Pagination } from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Check, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Course } from "@/types/training";
import { categoryStyle } from "../_components/course-category";
import { useCourses } from "../_hooks/use-training";

const STATE = {
  COMPLETED: {
    label: "Completed",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    percent: "text-emerald-600",
    action: "Review course",
    variant: "outline" as const,
  },
  IN_PROGRESS: {
    label: "In progress",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    percent: "text-amber-600",
    action: "Continue",
    variant: "default" as const,
  },
  NOT_STARTED: {
    label: "Not started",
    badge: "border-gray-200 bg-gray-50 text-gray-600",
    percent: "text-muted-foreground",
    action: "Start course",
    variant: "default" as const,
  },
};

const stateFor = function (course: Course) {
  if (course.enrollment?.status === "COMPLETED") return STATE.COMPLETED;
  if (course.enrollment) return STATE.IN_PROGRESS;
  return STATE.NOT_STARTED;
};

export default function AllCourses() {
  const [page, setPage] = useState(1);

  const { courses, totalPages, isFetching } = useCourses({ page, limit: 12 });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="border-border border-b pb-5">
        <PageHeader
          title="All Courses"
          subtitle="Browse available courses to improve your skills and boost your profile."
        />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={12}
        isLoading={isFetching}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isFetching && !courses.length ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-64 rounded-xl" />
            ))
          ) : !courses.length ? (
            <div className="border-border rounded-xl border bg-white sm:col-span-2 lg:col-span-3">
              <EmptyState
                icon={GraduationCap}
                title="No courses published yet."
                description="New training modules will appear here as they're released."
              />
            </div>
          ) : (
            courses.map((course) => {
              const category = categoryStyle(course.category);
              const CategoryIcon = category.icon;
              const state = stateFor(course);

              const modules = course._count?.modules ?? 0;
              const done = Math.round(
                ((course.enrollment?.progress ?? 0) / 100) * modules,
              );

              return (
                <div
                  key={course.id}
                  className="border-border flex flex-col rounded-xl border bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        category.tile,
                      )}
                    >
                      <CategoryIcon className="h-5 w-5" />
                    </div>

                    <StatusBadge
                      label={state.label}
                      className={cn("shrink-0", state.badge)}
                    />
                  </div>

                  <AppText
                    type="caption"
                    className={cn(
                      "mt-4 block font-semibold tracking-wide uppercase",
                      category.text,
                    )}
                  >
                    {category.label}
                  </AppText>

                  <AppText type="h4" className="mt-1 text-base font-semibold">
                    {course.title}
                  </AppText>

                  <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5" />
                      {modules} lessons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {course.estimated_minutes} min
                    </span>
                  </div>

                  <div className="mt-auto space-y-2 pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <AppText
                        type="caption"
                        className="text-muted-foreground block"
                      >
                        {done}/{modules} complete
                      </AppText>
                      <AppText
                        type="caption"
                        className={cn("font-semibold", state.percent)}
                      >
                        {course.enrollment?.progress ?? 0}%
                      </AppText>
                    </div>

                    <Progress
                      value={course.enrollment?.progress ?? 0}
                      aria-label={`${course.title} progress`}
                    />

                    <Button
                      asChild
                      variant={state.variant}
                      className="mt-2 h-11 w-full rounded-lg"
                    >
                      <Link href={`/driver/dashboard/training/${course.slug}`}>
                        {state.action}
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Pagination>
    </div>
  );
}
