import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CircleCheck, Clock, Lock, Play } from "lucide-react";
import Link from "next/link";
import type { PathCourse } from "@/types/training";

interface Props {
  course: PathCourse;
}

const formatDuration = function (minutes: number) {
  if (minutes < 60) return `${minutes}mins`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
};

export const PathRow = function ({ course }: Props) {
  const enrollment = course.enrollment;
  const isCompleted = enrollment?.status === "COMPLETED";
  const inProgress = !!enrollment && !isCompleted;

  const Icon = isCompleted ? CircleCheck : course.locked ? Lock : Play;

  return (
    <div className="p-4 md:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            isCompleted
              ? "text-emerald-600"
              : course.locked
                ? "bg-brand-soft text-brand"
                : "bg-brand-soft text-brand",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <AppText type="h4" className="text-base font-semibold">
            {course.title}
          </AppText>
          {course.summary && (
            <AppText type="caption" className="text-muted-foreground block">
              {course.summary}
            </AppText>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
          {isCompleted ? (
            <AppText
              type="caption"
              className="font-semibold tracking-wide text-emerald-600 uppercase"
            >
              Completed
            </AppText>
          ) : course.locked ? (
            <Button
              disabled
              className="h-9 rounded-lg px-5 text-xs disabled:opacity-100"
            >
              Locked
            </Button>
          ) : (
            <Button asChild className="h-9 rounded-lg px-5 text-xs">
              <Link href={`/driver/dashboard/training/${course.slug}`}>
                {inProgress ? "Resume" : "Start"}
              </Link>
            </Button>
          )}

          <AppText
            type="caption"
            className="text-muted-foreground flex items-center gap-1.5"
          >
            <Clock className="h-3.5 w-3.5" />
            {formatDuration(course.estimated_minutes)}
          </AppText>
        </div>
      </div>

      {inProgress && (
        <Progress
          value={enrollment.progress}
          aria-label={`${course.title} progress`}
          className="mt-4"
        />
      )}
    </div>
  );
};
