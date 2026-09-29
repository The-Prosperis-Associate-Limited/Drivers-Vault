import type { DriverType } from "./driver";
import type { EngagementType } from "./booking";

export type HireRequestStatus =
  | "PENDING_REVIEW"
  | "INVOICED"
  | "PAYMENT_REVIEW"
  | "PAID"
  | "DECLINED"
  | "CANCELLED";

export type HireInvoiceStatus = "UNPAID" | "PAYMENT_REVIEW" | "PAID" | "VOID";

export type HirePackage = "PRIVATE" | "SUBSCRIPTION";

export type WorkSchedule =
  "WEEKDAYS" | "WEEKDAYS_AND_SATURDAY" | "FULL_WEEK" | "CUSTOM";

export type HireTransmission = "AUTOMATIC" | "MANUAL" | "BOTH";

export interface HireInvoice {
  id: string;
  reference: string;
  amount_minor: number;
  vat_percent: number;
  vat_minor: number;
  fee_minor: number;
  total_minor: number;
  currency: string;
  status: HireInvoiceStatus;
  note: string | null;
  proof_url: string | null;
  proof_note: string | null;
  proof_submitted_at: string | null;
  proof_rejected_reason: string | null;
  paid_at: string | null;
  createdAt: string;
}

export interface PaymentAccount {
  bank_name: string;
  account_name: string;
  account_number: string;
}

export interface HireRequestDriver {
  id: string;
  first_name: string | null;
  last_name: string | null;
  profile_pic: string | null;
  city: string | null;
  state_of_residence: string | null;
  driver_profile: {
    driver_type: DriverType | null;
    expected_monthly_rate: number | null;
    rate_currency: string;
    trust_score: number;
    years_of_experience: number | null;
  } | null;
}

export interface HireRequestClient {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  client_profile: {
    organisation_name: string | null;
    client_type: string;
  } | null;
}

// The verified contact details the client pays for.
export interface ComboPack {
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_no: string | null;
  whatsapp_number: string | null;
  city: string | null;
  state_of_residence: string | null;
}

export interface HireRequest {
  id: string;
  reference: string;
  clientId: string;
  driverId: string | null;
  engagement_type: EngagementType;
  starts_at: string;
  note: string | null;
  status: HireRequestStatus;
  package: HirePackage;
  duration_months: number | null;
  drivers_needed: number;
  driver_type: DriverType | null;
  schedule: WorkSchedule;
  resumption_time: string | null;
  closing_time: string | null;
  transmission: HireTransmission | null;
  insurance_cover: string | null;
  provides_accommodation: boolean;
  state: string | null;
  nearest_area: string | null;
  declined_reason: string | null;
  paid_at: string | null;
  createdAt: string;
  driver: HireRequestDriver | null;
  client?: HireRequestClient;
  invoice: HireInvoice | null;
  booking?: { id: string; reference: string; status: string } | null;
  combo_pack?: ComboPack | null;
  payment_account?: PaymentAccount | null;
}
