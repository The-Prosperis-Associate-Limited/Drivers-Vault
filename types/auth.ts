export type UserRole = "DRIVER" | "CLIENT" | "ADMIN";

export type AccountStatus = "ACTIVE" | "SUSPENDED" | "DEACTIVATED";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";

export type ClientType = "INDIVIDUAL" | "ORGANISATION";

export type ClientDriverCategory =
  "CONTRACT" | "PRIVATE" | "CORPORATE" | "EXECUTIVE" | "SPY" | "EXPATRIATE";

export type DriversNeededRange =
  "ONE" | "TWO_TO_FIVE" | "SIX_TO_FIFTEEN" | "SIXTEEN_PLUS";

export type AssignmentType = "PERMANENT" | "TEMPORARY";

export type HiringTimeline =
  "IMMEDIATELY" | "WITHIN_TWO_WEEKS" | "THIS_MONTH" | "EXPLORING";

export type BudgetRange =
  "RANGE_150_200K" | "RANGE_201_250K" | "RANGE_251_300K" | "RANGE_301K_PLUS";

export interface ClientProfile {
  id: string;
  client_type: ClientType;
  organisation_name: string | null;
  organisation_size: number | null;
  industry: string | null;
  hiring_categories: ClientDriverCategory[];
  drivers_needed: DriversNeededRange | null;
  assignment_type: AssignmentType | null;
  primary_location: string | null;
  hiring_timeline: HiringTimeline | null;
  budget_range: BudgetRange | null;
  onboarding_completed_at: string | null;
}

export interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_no: string | null;
  whatsapp_number: string | null;
  profile_pic: string | null;
  bio: string | null;
  role: UserRole;
  gender: Gender | null;
  date_of_birth: string | null;
  marital_status: MaritalStatus | null;
  country: string | null;
  state_of_residence: string | null;
  city: string | null;
  address: string | null;
  has_validated_email: boolean;
  account_status: AccountStatus;
  client_profile?: ClientProfile | null;
  admin_profile?: import("./admin").AdminProfile | null;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  user: User;
  token: AuthTokens;
}
