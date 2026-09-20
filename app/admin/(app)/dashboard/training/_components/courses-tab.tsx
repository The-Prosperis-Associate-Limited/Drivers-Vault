"use client";

import { AppText } from "@/components/shared/app-text";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { statusBadgeClass, statusLabel } from "@/lib/admin";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { formatDate } from "@/lib/utils";
import { Clock3, Layers, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { PaginatedResponse } from "@/types/response";
import type { AdminCourse } from "@/types/admin";
import { CreateCourseDialog } from "./create-course-dialog";

export const CoursesTab = function () {
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [removing, setRemoving] = useState<AdminCourse | null>(null);

  const coursesUrl = API_ENDPOINTS.adminTraining.courses({ page, limit: 9 });

  const { data, isFetching } = useGetData<PaginatedResponse<AdminCourse>>({
    url: coursesUrl,
  });

  const courses = data?.data ?? [];

  const refetchKeys = [[coursesUrl], [API_ENDPOINTS.adminTraining.stats]];

  const { mutate: togglePublish, isPending: isToggling } = useSubmitData<{
    course: AdminCourse;
  }>({
    url: ({ course }) =>
      course.status === "PUBLISHED"
        ? API_ENDPOINTS.adminTraining.unpublishCourse(course.id)
        : API_ENDPOINTS.adminTraining.publishCourse(course.id),
    getBody: () => ({}),
    method: "patch",
    onSuccessMessage: "Course updated",
    additionalQueryKeys: refetchKeys,
  });

  const { mutate: removeCourse, isPending: isRemoving } = useSubmitData<{
    id: string;
  }>({
    url: ({ id }) => API_ENDPOINTS.adminTraining.course(id),
    method: "delete",
    onSuccessMessage: "Course removed",
    additionalQueryKeys: refetchKeys,
    onSuccess: () => setRemoving(null),
  });

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          Add New Course
        </Button>
      </div>

      <Pagination
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
        total={data?.total}
        isLoading={isFetching}
      >
        {!courses.length ? (
          <EmptyState
            title="No courses yet"
            description="Create the first course drivers will train with."
          />
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border-border flex flex-col rounded-xl border bg-white p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <AppText type="caption" className="font-semibold">
                    {course.title}
                  </AppText>
                  <StatusBadge
                    label={statusLabel(course.status)}
                    className={statusBadgeClass(course.status)}
                  />
                </div>

                <AppText
                  type="caption"
                  className="text-muted-foreground mt-1 line-clamp-2 block"
                >
                  {course.summary ?? "No summary yet."}
                </AppText>

                <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {course.estimated_minutes} min
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5" />
                    {course._count?.modules ?? 0} modules
                  </span>
                  <span>Added {formatDate(course.createdAt)}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {course.category && (
                    <StatusBadge
                      label={statusLabel(course.category)}
                      className="border-indigo-200 bg-indigo-50 text-indigo-700"
                    />
                  )}
                  {course.is_required && (
                    <StatusBadge
                      label="Required"
                      className="border-brand/30 bg-brand-soft text-brand"
                    />
                  )}
                </div>

                <div className="border-border mt-4 flex gap-2 border-t pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isToggling}
                    onClick={() => togglePublish({ course })}
                    className="flex-1"
                  >
                    {course.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRemoving(course)}
                    className="text-destructive border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Pagination>

      <CreateCourseDialog
        isOpen={createOpen}
        onOpenChange={setCreateOpen}
        coursesUrl={coursesUrl}
      />

      <ConfirmDialog
        isOpen={!!removing}
        onOpenChange={(open) => !open && setRemoving(null)}
        title={`Remove ${removing?.title ?? "this course"}?`}
        description="Every driver's progress and enrollment in it is deleted with it. This cannot be undone."
        confirmLabel="Remove Course"
        confirmVariant="destructive"
        icon={Trash2}
        iconClassName="text-destructive"
        isLoading={isRemoving}
        onConfirm={() => removing && removeCourse({ id: removing.id })}
      />
    </>
  );
};
