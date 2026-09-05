export type NotificationStatus = "UNREAD" | "READ";

export interface AppNotification {
  id: string;
  type: string;
  title: string | null;
  message: string;
  status: NotificationStatus;
  actionUrl: string | null;
  actionLabel: string | null;
  metadata: Record<string, unknown> | null;
  readAt: string | null;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string | null;
  createdAt: string;
}

export interface NotificationPreferences {
  job_requests: boolean;
  sms_alerts: boolean;
  client_messages: boolean;
  verification_updates: boolean;
  training_reminders: boolean;
  product_news: boolean;
}
