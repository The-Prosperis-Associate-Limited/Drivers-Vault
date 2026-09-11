"use client";

import { AppText } from "@/components/shared/app-text";
import { BackLink } from "@/components/shared/back-link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useGetProfile } from "@/hooks/use-get-profile";
import { cn } from "@/lib/utils";
import {
  Award,
  ChevronDown,
  CircleCheck,
  Circle,
  FileText,
  Video,
} from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { CourseCertificate } from "./_components/course-certificate";
import { ModulePlayer } from "./_components/module-player";
import {
  useCertifications,
  useCourse,
  useEnrollInCourse,
  useRecordModuleProgress,
  useSavePlaybackPosition,
} from "../_hooks/use-training";

function CoursePlayer() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const slug = params.slug;

  const { profile } = useGetProfile();
  const { course, isFetching } = useCourse(slug);
  const { certifications } = useCertifications();
  const { enroll, isPending: isEnrolling } = useEnrollInCourse(slug);
  const { recordProgress, isPending: isSaving } = useRecordModuleProgress(slug);
  const { savePosition } = useSavePlaybackPosition(slug);

  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [lessonsOpen, setLessonsOpen] = useState(true);
  const [view, setView] = useState<"lesson" | "certificate">(
    searchParams.get("view") === "certificate" ? "certificate" : "lesson",
  );

  if (isFetching && !course) {
    return (
      <div className="mx-auto max-w-6xl space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!course) return null;

  const enrollment = course.enrollment;
  const modules = course.modules ?? [];

  const completedModuleIds = new Set(
    enrollment?.module_progress
      ?.filter((progress) => progress.completed_at)
      .map((progress) => progress.moduleId) ?? [],
  );

  const activeModule =
    modules.find((module) => module.id === activeModuleId) ?? modules[0];

  const activeProgress = enrollment?.module_progress?.find(
    (progress) => progress.moduleId === activeModule?.id,
  );

  const isActiveCompleted =
    !!activeModule && completedModuleIds.has(activeModule.id);

  /*
    Resume where the driver stopped, unless they already finished the module —
    dropping someone back at 94% of something they have completed is worse than
    starting it over.
  */
  const resumeAt = isActiveCompleted
    ? 0
    : (activeProgress?.last_position_seconds ?? 0);

  const certification = certifications.find(
    (entry) => entry.course.slug === slug,
  );

  const driverName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    "Tegat driver";

  const totalMinutes = modules.reduce(
    (total, module) => total + module.duration_minutes,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <BackLink href="/driver/dashboard/training/courses" label="Back" />

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <div className="border-border order-2 overflow-hidden rounded-xl border bg-white lg:order-1">
          <div className="space-y-3 p-5">
            <AppText type="h4" className="text-base font-semibold">
              {course.title}
            </AppText>

            <Progress
              value={enrollment?.progress ?? 0}
              aria-label="Course progress"
            />
          </div>

          <button
            type="button"
            onClick={() => setLessonsOpen((open) => !open)}
            className="border-border flex w-full cursor-pointer items-start justify-between gap-3 border-t px-5 py-4 text-left"
          >
            <div className="space-y-0.5">
              <AppText type="h4" className="text-base font-semibold">
                Lessons
              </AppText>
              <AppText type="caption" className="text-muted-foreground block">
                {totalMinutes} min · {modules.length} lessons
              </AppText>
            </div>

            <ChevronDown
              className={cn(
                "text-muted-foreground mt-1 h-4 w-4 shrink-0 transition-transform",
                lessonsOpen && "rotate-180",
              )}
            />
          </button>

          {lessonsOpen && (
            <div className="divide-border divide-y">
              {modules.map((module) => {
                const isCompleted = completedModuleIds.has(module.id);
                const isActive =
                  view === "lesson" && activeModule?.id === module.id;

                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => {
                      setActiveModuleId(module.id);
                      setView("lesson");
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50",
                      isActive && "bg-brand-soft/50",
                    )}
                  >
                    {isCompleted ? (
                      <CircleCheck className="fill-brand h-5 w-5 shrink-0 text-white" />
                    ) : (
                      <Circle className="text-muted-foreground/40 h-5 w-5 shrink-0" />
                    )}

                    {module.video_url ? (
                      <Video className="text-muted-foreground h-4 w-4 shrink-0" />
                    ) : (
                      <FileText className="text-muted-foreground h-4 w-4 shrink-0" />
                    )}

                    <AppText type="caption" className="text-foreground">
                      {module.title}
                    </AppText>
                  </button>
                );
              })}
            </div>
          )}

          <div className="border-border border-t">
            <div className="flex items-center gap-3 px-5 py-4">
              <Award className="text-brand h-5 w-5 shrink-0" />
              <AppText type="h4" className="text-base font-semibold">
                Certificate
              </AppText>
            </div>

            <button
              type="button"
              onClick={() => setView("certificate")}
              className={cn(
                "border-border flex w-full cursor-pointer items-center gap-3 border-t px-5 py-3.5 text-left transition-colors hover:bg-gray-50",
                view === "certificate" && "bg-brand-soft/50",
              )}
            >
              <Award className="text-brand h-5 w-5 shrink-0" />
              <AppText type="caption" className="text-foreground">
                Claim Certificate
              </AppText>
            </button>
          </div>
        </div>

        <div className="border-border order-1 overflow-hidden rounded-xl border bg-white lg:order-2">
          <div className="border-border border-b px-5 py-5">
            <AppText type="h4" className="text-base font-semibold">
              {view === "certificate"
                ? "Certificate"
                : (activeModule?.title ?? course.title)}
            </AppText>
          </div>

          {view === "certificate" ? (
            <CourseCertificate
              courseTitle={course.title}
              driverName={driverName}
              certification={certification}
              onContinue={() => setView("lesson")}
            />
          ) : !enrollment ? (
            <div className="space-y-4 p-6 text-center">
              <AppText type="caption" className="text-muted-foreground block">
                {course.summary}
              </AppText>
              <Button
                isLoading={isEnrolling}
                onClick={() => enroll({})}
                className="h-11 rounded-lg px-6"
              >
                Start this course
              </Button>
            </div>
          ) : (
            activeModule && (
              <div className="space-y-4 p-4 md:p-5">
                <ModulePlayer
                  module={activeModule}
                  poster={course.cover_image}
                  startAt={resumeAt}
                  isCompleted={isActiveCompleted}
                  onSavePosition={(position, duration) =>
                    savePosition({
                      moduleId: activeModule.id,
                      position_seconds: position,
                      duration_seconds: duration,
                    })
                  }
                  onComplete={(position, duration) =>
                    recordProgress({
                      moduleId: activeModule.id,
                      completed: true,
                      minutes_spent: activeModule.duration_minutes,
                      position_seconds: position,
                      duration_seconds: duration,
                    })
                  }
                />

                {/* Watching to the end ticks the module off on its own; this is
                    the way through a reading, and the escape hatch for a video
                    that will not play. */}
                <Button
                  isLoading={isSaving}
                  disabled={isActiveCompleted}
                  onClick={() =>
                    recordProgress({
                      moduleId: activeModule.id,
                      completed: true,
                      minutes_spent: activeModule.duration_minutes,
                    })
                  }
                  className="h-11 rounded-lg px-6"
                >
                  {isActiveCompleted ? "Completed" : "Mark as complete"}
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function CourseDetail() {
  return (
    <Suspense fallback={null}>
      <CoursePlayer />
    </Suspense>
  );
}
