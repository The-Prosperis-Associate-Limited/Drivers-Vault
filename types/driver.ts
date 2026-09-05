export type DriverType =
  | "CORPORATE_DRIVER"
  | "PRIVATE_DRIVER"
  | "LOGISTICS_DRIVER"
  | "RIDE_HAILING_DRIVER"
  | "HEAVY_DUTY_DRIVER";

export type VehicleClass =
  "SALOON" | "SUV" | "BUS" | "TRUCK" | "TRAILER" | "MOTORCYCLE";

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

export interface AvailabilitySlot {
  day_range: string;
  start: string;
  end: string;
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
  work_experiences: {
    id: string;
    employer: string;
    job_title: string;
    started_at: string;
    ended_at: string | null;
    is_current: boolean;
  }[];
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
