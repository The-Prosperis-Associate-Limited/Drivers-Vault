export type ConversationStatus = "WAITING" | "ACTIVE" | "RESOLVED";

export interface ChatSender {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: "DRIVER" | "CLIENT" | "ADMIN";
  profile_pic: string | null;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string | null;
  sender: ChatSender | null;
  is_system: boolean;
  is_from_ai: boolean;
  message: string;
  sent_at: string;
}

export interface ConversationParticipant {
  id: string;
  conversationId: string;
  userId: string;
  last_read_at: string;
}

export interface Conversation {
  id: string;
  initiatedById: string;
  status: ConversationStatus;
  last_message: string | null;
  last_updated: string;
  createdAt: string;
  messages: ChatMessage[];
  participants: ConversationParticipant[];
  initiatedBy?: ChatSender & { email: string };
}

export interface ConversationPayload {
  conversation: Conversation | null;
  unread: number;
}

export interface AdminConversationPayload {
  conversation: Conversation;
  unread: number;
}

export interface ChatInbox {
  data: Conversation[];
  total: number;
  page: number;
  totalPages: number;
}
