import type { DriverType } from "@/types/driver";

export type StaffingRequestStatus = "OPEN" | "CLOSED";
export type RequestEngagementType = "MONTHLY" | "CONTRACT";

export interface StaffingRequest {
  id: string;
  reference: string;
  title: string;
  description: string | null;
  driver_type: DriverType;
  engagement_type: RequestEngagementType;
  country: string;
  state: string;
  city: string | null;
  budget: number;
  currency: string;
  status: StaffingRequestStatus;
  closed_at: string | null;
  createdAt: string;
}

export interface StaffingRequestListItem extends StaffingRequest {
  applicants: number;
  shortlisted: number;
}

export interface RequestApplicant {
  id: string;
  status: "APPLIED" | "SHORTLISTED";
  message: string | null;
  createdAt: string;
  driver: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    profile_pic: string | null;
    city: string | null;
    state_of_residence: string | null;
    driver_profile: {
      driver_type: DriverType | null;
      trust_score: number;
      expected_monthly_rate: number | null;
      years_of_experience: number | null;
    } | null;
  };
}
