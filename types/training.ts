export type EnrollmentStatus = "IN_PROGRESS" | "COMPLETED" | "ABANDONED";

export interface CourseModule {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  content: string | null;
  position: number;
  duration_minutes: number;
}

export interface ModuleProgress {
  id: string;
  moduleId: string;
  completed_at: string | null;
  minutes_spent: number;
  // Furthest point reached, in seconds — what the player resumes from.
  last_position_seconds: number;
  duration_seconds: number | null;
}

export interface Enrollment {
  id: string;
  status: EnrollmentStatus;
  progress: number;
  minutes_spent: number;
  started_at: string;
  completed_at: string | null;
  module_progress?: ModuleProgress[];
  course?: Course;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  cover_image: string | null;
  category: string | null;
  is_required: boolean;
  position: number;
  trust_score_reward: number;
  certificate_validity_months: number | null;
  estimated_minutes: number;
  modules?: CourseModule[];
  enrollment?: Enrollment | null;
  _count?: { modules: number };
}

// A required course the driver has not reached yet. Locking is presentational;
// the server refuses progress on a course they have not unlocked either.
export interface PathCourse extends Course {
  locked: boolean;
}

export interface Certification {
  id: string;
  reference: string;
  issued_at: string;
  expires_at: string | null;
  document_url: string | null;
  course: { id: string; title: string; slug: string };
}

export interface TrainingStats {
  certifications_earned: number;
  modules_in_progress: number;
  trust_score_boost: number;
  minutes_invested: number;
  required_courses: number;
  required_courses_completed: number;
  completion_percent: number;
}
