export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TicketCategory =
  | "ACCOUNT"
  | "VERIFICATION"
  | "BOOKING"
  | "PAYMENT"
  | "TRAINING"
  | "BUG_REPORT"
  | "OTHER";

export interface TicketComment {
  id: string;
  message: string;
  is_internal: boolean;
  createdAt: string;
  author: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    role: string;
  };
}

export interface Ticket {
  id: string;
  reference: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  comments?: TicketComment[];
}
