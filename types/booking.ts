import type { DriverType } from "./driver";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DECLINED"
  | "CANCELLED"
  | "DISPUTED";

export type EngagementType =
  "ONE_OFF" | "DAILY" | "WEEKLY" | "MONTHLY" | "CONTRACT";

export interface HireDriver {
  id: string;
  first_name: string | null;
  last_name: string | null;
  profile_pic: string | null;
  gender?: string | null;
  city?: string | null;
  state_of_residence?: string | null;
  driver_profile?: {
    driver_type: DriverType | null;
    expected_monthly_rate: number | null;
    rate_currency: string;
    trust_score: number;
  } | null;
}

export interface Hire {
  id: string;
  reference: string;
  title: string;
  description: string | null;
  driver_type: DriverType;
  engagement_type: EngagementType;
  pickup_address: string;
  dropoff_address: string | null;
  state: string;
  city: string | null;
  starts_at: string;
  ends_at: string | null;
  amount: number;
  currency: string;
  status: BookingStatus;
  accepted_at: string | null;
  driver: HireDriver | null;
}

export interface HireReview {
  id: string;
  rating: number;
  comment: string | null;
  criteria: Record<string, number> | null;
  createdAt: string;
}

export interface HireDetail extends Hire {
  my_review: HireReview | null;
  driver_details: {
    gender: string | null;
    city: string | null;
    state_of_residence: string | null;
    driver_profile: {
      driver_type: DriverType | null;
      years_of_experience: number | null;
      expected_monthly_rate: number | null;
      rate_currency: string;
      trust_score: number;
    } | null;
  } | null;
  driver_rating: number;
  driver_review_count: number;
}

export interface OverviewData {
  stats: {
    active_drivers: number;
    open_requests: number;
    request_list: number;
    monthly_spend_minor: number;
    spend_delta_percent: number | null;
  };
  hired_staff: Hire[];
  open_requests: {
    id: string;
    reference: string;
    title: string;
    driver_type: DriverType;
    createdAt: string;
    driver: { first_name: string | null; last_name: string | null } | null;
  }[];
  recent_payments: {
    id: string;
    amount_minor: number;
    currency: string;
    description: string | null;
    createdAt: string;
    booking: {
      reference: string;
      driver: { first_name: string | null; last_name: string | null } | null;
    } | null;
  }[];
  currency: string;
}
