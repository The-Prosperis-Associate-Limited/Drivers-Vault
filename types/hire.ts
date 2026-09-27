import type { DriverType } from "./driver";
import type { EngagementType } from "./booking";

export type HireRequestStatus =
  "PENDING_REVIEW" | "INVOICED" | "PAID" | "DECLINED" | "CANCELLED";

export type HireInvoiceStatus = "UNPAID" | "PAID" | "VOID";

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
  paid_at: string | null;
  createdAt: string;
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
  driverId: string;
  engagement_type: EngagementType;
  starts_at: string;
  note: string | null;
  status: HireRequestStatus;
  declined_reason: string | null;
  paid_at: string | null;
  createdAt: string;
  driver: HireRequestDriver;
  client?: HireRequestClient;
  invoice: HireInvoice | null;
  booking?: { id: string; reference: string; status: string } | null;
  combo_pack?: ComboPack | null;
}
