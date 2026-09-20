"use client";

import { AppAvatar } from "@/components/shared/app-avatar";
import { AppSimpleSelect } from "@/components/shared/app-simple-select";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { Progress } from "@/components/ui/progress";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetData } from "@/hooks/use-get-data";
import { personName, statusBadgeClass, statusLabel } from "@/lib/admin";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import type { PaginatedResponse } from "@/types/response";
import type { EnrollmentProgressRow } from "@/types/admin";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Statuses" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ABANDONED", label: "Abandoned" },
];

export const ProgressTab = function () {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isFetching } = useGetData<
    PaginatedResponse<EnrollmentProgressRow>
  >({
    url: API_ENDPOINTS.adminTraining.progress({
      page,
      limit: 10,
      status: status === "ALL" ? undefined : status,
      search: debouncedSearch || undefined,
    }),
  });

  const rows = data?.data ?? [];

  return (
    <>
      <div className="flex justify-end">
        <AppSimpleSelect
          options={STATUS_OPTIONS}
          value={status}
          onValueChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          containerClassName="w-[150px]"
        />
      </div>

      <Pagination
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
        total={data?.total}
        isLoading={isFetching}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        searchPlaceholder="Search drivers or courses..."
      >
        {!rows.length ? (
          <EmptyState
            title="No enrollments yet"
            description="Driver course progress shows up here as they train."
          />
        ) : (
          <>
            <div className="mt-4 hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-border border-b text-left text-xs tracking-wide uppercase">
                    <th className="py-3 pr-4 font-medium">Driver</th>
                    <th className="py-3 pr-4 font-medium">Course</th>
                    <th className="py-3 pr-4 font-medium">Progress</th>
                    <th className="py-3 pr-4 font-medium">Started</th>
                    <th className="py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-3">
                          <AppAvatar
                            src={row.user.profile_pic ?? undefined}
                            fallback={personName(row.user)}
                            className="h-9 w-9"
                          />
                          <span className="font-medium">
                            {personName(row.user)}
                          </span>
                        </span>
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {row.course.title}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-2">
                          <Progress
                            value={row.progress}
                            className="w-28 shrink-0"
                          />
                          <span className="text-muted-foreground text-xs">
                            {row.progress}%
                          </span>
                        </span>
                      </td>
                      <td className="text-muted-foreground py-3 pr-4">
                        {formatDate(row.started_at)}
                      </td>
                      <td className="py-3">
                        <StatusBadge
                          label={statusLabel(row.status)}
                          className={statusBadgeClass(row.status)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3 md:hidden">
              {rows.map((row) => (
                <div
                  key={row.id}
                  className="border-border rounded-xl border p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">
                      {personName(row.user)}
                    </span>
                    <StatusBadge
                      label={statusLabel(row.status)}
                      className={statusBadgeClass(row.status)}
                    />
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {row.course.title} · started {formatDate(row.started_at)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={row.progress} className="flex-1" />
                    <span className="text-muted-foreground text-xs">
                      {row.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Pagination>
    </>
  );
};
