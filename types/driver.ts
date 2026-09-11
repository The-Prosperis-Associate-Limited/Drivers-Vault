import type { User } from "./auth";

export type DriverVerificationStatus =
  "UNSUBMITTED" | "PENDING" | "APPROVED" | "REJECTED";

export type OnboardingStep =
  | "PERSONAL_INFORMATION"
  | "EXPERIENCE"
  | "ACADEMIC_QUALIFICATION"
  | "WORK_EXPERIENCE"
  | "GUARANTORS"
  | "ADDITIONAL_INFORMATION"
  | "DOCUMENTS"
  | "REVIEW";

export type DriverType =
  | "CORPORATE_DRIVER"
  | "PRIVATE_DRIVER"
  | "LOGISTICS_DRIVER"
  | "RIDE_HAILING_DRIVER"
  | "HEAVY_DUTY_DRIVER";

export type VehicleClass =
  "SALOON" | "SUV" | "BUS" | "TRUCK" | "TRAILER" | "MOTORCYCLE";

export type AcademicLevel =
  "NONE" | "PRIMARY" | "SECONDARY" | "OND" | "HND" | "BSC" | "MSC" | "PHD";

export type DocumentType =
  | "NIN_SLIP"
  | "PASSPORT_PHOTO"
  | "DRIVERS_LICENCE"
  | "PROOF_OF_ADDRESS"
  | "GUARANTOR_PASSPORT"
  | "GUARANTOR_NIN_SLIP";

export type DocumentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface WorkExperience {
  id: string;
  employer: string;
  job_title: string;
  started_at: string;
  ended_at: string | null;
  is_current: boolean;
}

export interface Guarantor {
  id: string;
  full_name: string;
  relationship: string;
  phone_no: string;
  address: string;
  nin: string;
  passport_url: string | null;
  nin_slip_url: string | null;
}

export interface DriverDocument {
  id: string;
  type: DocumentType;
  url: string;
  file_name: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  status: DocumentStatus;
  rejection_reason: string | null;
  createdAt: string;
}

export interface AvailabilitySlot {
  day_range: string;
  start: string;
  end: string;
}

export interface DriverProfile {
  id: string;
  userId: string;
  state_of_origin: string | null;
  years_of_experience: number | null;
  driver_type: DriverType | null;
  vehicle_classes: VehicleClass[];
  license_number: string | null;
  license_expires_at: string | null;
  academic_level: AcademicLevel | null;
  institution: string | null;
  course_of_study: string | null;
  languages: string[];
  language_count: number | null;
  religion: string | null;
  expected_monthly_rate: number | null;
  rate_currency: string;
  availability: AvailabilitySlot[] | null;
  verification_status: DriverVerificationStatus;
  is_discoverable: boolean;
  trust_score: number;
  onboarding_step: OnboardingStep;
  onboarding_completed_at: string | null;
  work_experiences: WorkExperience[];
  guarantors: Guarantor[];
  user: Pick<
    User,
    | "id"
    | "first_name"
    | "last_name"
    | "email"
    | "phone_no"
    | "profile_pic"
    | "gender"
    | "date_of_birth"
    | "marital_status"
    | "country"
    | "state_of_residence"
    | "city"
    | "address"
  >;
}

export interface RejectedDocument {
  id: string;
  type: DocumentType;
  label: string;
  reason: string | null;
}

export interface VerificationStatus {
  status: DriverVerificationStatus;
  onboarding_step: OnboardingStep;
  onboarding_completed_at: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  attempts: number;
  rejected_documents: RejectedDocument[];
}

export interface DocumentsResponse {
  documents: DriverDocument[];
  missing: { type: DocumentType; label: string }[];
}

export type TrustScoreComponent =
  "verification" | "training" | "completions" | "reviews";

export interface TrustScoreActivity {
  id: string;
  type: string;
  title: string;
  description: string | null;
  createdAt: string;
}

// The server sends points and the raw counts behind them. The sentences under
// each bar are composed here — the weights and the numbers stay server-side.
export interface TrustScoreBreakdown {
  total: number;
  percentile: number | null;
  verification: number;
  training: number;
  completions: number;
  reviews: number;
  max: Record<TrustScoreComponent, number>;
  facts: {
    verification_status: DriverVerificationStatus;
    certifications_earned: number;
    required_courses: number;
    required_courses_completed: number;
    bookings_completed: number;
    bookings_engaged: number;
    review_average: number;
    review_count: number;
  };
  recent_activity: TrustScoreActivity[];
}

/*
================= NOTE: the client-surface shapes — what the marketplace search
and the public driver profile return. Contact details never appear here.
*/

export interface DriverPublicUser {
  id: string;
  first_name: string | null;
  last_name: string | null;
  profile_pic: string | null;
  country: string | null;
  state_of_residence: string | null;
  city: string | null;
  bio?: string | null;
}

export interface DriverSearchResult {
  id: string;
  userId: string;
  driver_type: DriverType | null;
  vehicle_classes: VehicleClass[];
  languages: string[];
  years_of_experience: number | null;
  trust_score: number;
  expected_monthly_rate: number | null;
  rate_currency: string;
  rating: number;
  review_count: number;
  certification_titles: string[];
  user: DriverPublicUser;
}

export interface DriverCertification {
  id: string;
  title: string;
  issued_at: string;
  expires_at: string | null;
}

export interface PublicDriverProfile extends DriverSearchResult {
  availability: AvailabilitySlot[] | null;
  completed_jobs: number;
  response_time_minutes: number | null;
  on_time_rate: number | null;
  certifications: DriverCertification[];
  work_experiences: WorkExperience[];
}

export interface DriverReview {
  id: string;
  rating: number;
  comment: string | null;
  tags: string[];
  createdAt: string;
  author: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    profile_pic: string | null;
  };
}
