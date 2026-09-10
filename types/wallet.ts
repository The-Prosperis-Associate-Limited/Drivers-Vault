export type WalletTransactionType =
  | "BOOKING_PAYMENT"
  | "PLATFORM_FEE"
  | "PAYOUT"
  | "PAYOUT_REVERSAL"
  | "ADJUSTMENT"
  | "FUNDING"
  | "BOOKING_CHARGE";

export type WalletTransactionStatus =
  "PENDING" | "AVAILABLE" | "PAID_OUT" | "REVERSED";

export interface Wallet {
  id: string;
  currency: string;
  available_minor: number;
  pending_minor: number;
  lifetime_minor: number;
  dva_account_number: string | null;
  dva_account_name: string | null;
  dva_bank_name: string | null;
}

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  amount_minor: number;
  currency: string;
  description: string | null;
  reference: string;
  createdAt: string;
  booking: {
    reference: string;
    title: string;
    driver: { first_name: string | null; last_name: string | null } | null;
  } | null;
}

export interface WalletSummary {
  total_paid_minor: number;
  monthly_commitment_minor: number;
  pending_cycle_minor: number;
  cycle_ends_at: string;
  currency: string;
}

export interface PaymentQuote {
  amount_minor: number;
  fee_minor: number;
  total_minor: number;
}
