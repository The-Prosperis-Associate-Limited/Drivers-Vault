import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse, PaginatedResponse } from "@/types/response";
import type {
  Certification,
  Course,
  Enrollment,
  PathCourse,
  TrainingStats,
} from "@/types/training";

export const useTrainingStats = function () {
  const { data, isFetching } = useGetData<APIResponse<TrainingStats>>({
    url: API_ENDPOINTS.training.stats,
  });

  return { stats: data?.data, isFetching };
};

export const useCourses = function ({
  page,
  limit,
  search,
  category,
}: {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}) {
  const { data, isFetching } = useGetData<PaginatedResponse<Course>>({
    url: API_ENDPOINTS.training.courses({ page, limit, search, category }),
  });

  return {
    courses: data?.data ?? [],
    totalPages: data?.totalPages ?? 1,
    isFetching,
  };
};

export const useRequiredPath = function () {
  const { data, isFetching } = useGetData<APIResponse<PathCourse[]>>({
    url: API_ENDPOINTS.training.path,
  });

  return { path: data?.data ?? [], isFetching };
};

export const useCourse = function (slug: string) {
  const { data, isFetching } = useGetData<APIResponse<Course>>({
    url: API_ENDPOINTS.training.getCourse(slug),
    shouldFetch: !!slug,
  });

  return { course: data?.data, isFetching };
};

export const useCertifications = function () {
  const { data, isFetching } = useGetData<APIResponse<Certification[]>>({
    url: API_ENDPOINTS.training.certifications,
  });

  return { certifications: data?.data ?? [], isFetching };
};

export const useEnrollInCourse = function (slug: string) {
  const { mutate, isPending } = useSubmitData<
    Record<string, never>,
    APIResponse<Enrollment>
  >({
    url: API_ENDPOINTS.training.enroll(slug),
    method: "post",
    onSuccessMessage: "You're enrolled",
    additionalQueryKeys: [
      [API_ENDPOINTS.training.getCourse(slug)],
      [API_ENDPOINTS.training.path],
    ],
  });

  return { enroll: mutate, isPending };
};

/*
  Progress is recomputed on the server from the module rows, so replaying a
  module cannot push a driver past 100% or issue a second certificate. The trust
  score and certification lists are refetched because completing the last module
  moves both.
*/
/*
  The autosave path. Fires every few seconds while a module plays, so it must not
  toast and must not refetch the course — refetching would remount the player and
  throw the driver back to the start of the video.
*/
export const useSavePlaybackPosition = function (slug: string) {
  const { mutate } = useSubmitData<{
    moduleId: string;
    position_seconds: number;
    duration_seconds: number;
  }>({
    url: (data) => API_ENDPOINTS.training.moduleProgress(slug, data.moduleId),
    method: "put",
    silent: true,
    skipRefetch: true,
    getBody: (data) => ({
      position_seconds: data.position_seconds,
      duration_seconds: data.duration_seconds,
    }),
  });

  return { savePosition: mutate };
};

export const useRecordModuleProgress = function (slug: string) {
  const { mutate, isPending } = useSubmitData<
    {
      moduleId: string;
      completed: boolean;
      minutes_spent: number;
      position_seconds?: number;
      duration_seconds?: number;
    },
    APIResponse<{ progress: number; completed: boolean }>
  >({
    url: (data) => API_ENDPOINTS.training.moduleProgress(slug, data.moduleId),
    method: "put",
    getBody: (data) => ({
      completed: data.completed,
      minutes_spent: data.minutes_spent,
      position_seconds: data.position_seconds,
      duration_seconds: data.duration_seconds,
    }),
    onSuccessMessage: "Progress saved",
    additionalQueryKeys: [
      [API_ENDPOINTS.training.getCourse(slug)],
      [API_ENDPOINTS.training.stats],
      [API_ENDPOINTS.training.path],
      [API_ENDPOINTS.training.certifications],
      [API_ENDPOINTS.driverDashboard.stats],
      [API_ENDPOINTS.driverDashboard.trustScore],
    ],
  });

  return { recordProgress: mutate, isPending };
};
