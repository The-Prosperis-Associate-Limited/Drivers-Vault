"use client";

import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCommentOnTicket,
  useCreateTicket,
  useTicket,
  useTickets,
} from "@/hooks/use-tickets";
import { cn, formatTime } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import type { TicketCategory } from "@/types/ticket";

interface Props {
  firstName?: string | null;
}

/*
  There is no socket chat yet, so a conversation is a support ticket and each
  message is a comment on it. Support replies land in the same thread, which is
  what the driver sees. When a realtime channel exists this panel swaps its
  transport and keeps its shape.
*/
const QUICK_REPLIES: { label: string; category: TicketCategory }[] = [
  { label: "My verification is stuck", category: "VERIFICATION" },
  { label: "Update my payout details", category: "PAYMENT" },
  { label: "A client cancelled my job", category: "BOOKING" },
  { label: "How is trust score calculated?", category: "ACCOUNT" },
];

export const LiveChatPanel = function ({ firstName }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const { tickets, isFetching: isFetchingTickets } = useTickets();

  // Reopen the most recent open conversation rather than starting a new ticket
  // every time the sheet is opened.
  const openTicket =
    tickets.find((ticket) => ["OPEN", "IN_PROGRESS"].includes(ticket.status)) ??
    null;

  const ticketId = activeId ?? openTicket?.id ?? null;

  const { ticket, isFetching } = useTicket(ticketId);
  const { sendMessage, isPending: isSending } = useCommentOnTicket(ticketId);
  const { createTicket, isPending: isStarting } = useCreateTicket({
    onSuccessMessage: "We've got your message",
    onSuccess: (created) => setActiveId(created.id),
  });

  const send = (text: string, category: TicketCategory = "ACCOUNT") => {
    const message = text.trim();

    if (!message) return;

    if (ticketId) {
      sendMessage({ message });
    } else {
      createTicket({
        subject: message.slice(0, 60),
        description: message,
        category,
      });
    }

    setDraft("");
  };

  const messages = ticket?.comments ?? [];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5">
        <AppText
          type="caption"
          className="text-muted-foreground block text-center tracking-wide uppercase"
        >
          Today
        </AppText>

        <div className="max-w-[85%] rounded-xl bg-gray-100 px-4 py-3">
          <AppText type="caption" className="text-foreground block">
            Hi {firstName ?? "there"} 👋 I&rsquo;m Ada from Tegat Support. How
            can I help with your driver account today?
          </AppText>
        </div>

        {(isFetchingTickets || isFetching) && !messages.length ? (
          <Skeleton className="h-16 w-3/4 rounded-xl" />
        ) : (
          <>
            {!!ticket && (
              <div className="bg-brand ml-auto max-w-[85%] rounded-xl px-4 py-3">
                <AppText type="caption" className="block text-white">
                  {ticket.description}
                </AppText>
                <AppText type="caption" className="mt-1 block text-white/70">
                  {formatTime(ticket.createdAt)}
                </AppText>
              </div>
            )}

            {messages.map((comment) => {
              const fromSupport = comment.author.role === "ADMIN";

              return (
                <div
                  key={comment.id}
                  className={cn(
                    "max-w-[85%] rounded-xl px-4 py-3",
                    fromSupport ? "bg-gray-100" : "bg-brand ml-auto",
                  )}
                >
                  <AppText
                    type="caption"
                    className={cn(
                      "block",
                      fromSupport ? "text-foreground" : "text-white",
                    )}
                  >
                    {comment.message}
                  </AppText>
                  <AppText
                    type="caption"
                    className={cn(
                      "mt-1 block",
                      fromSupport ? "text-muted-foreground" : "text-white/70",
                    )}
                  >
                    {formatTime(comment.createdAt)}
                  </AppText>
                </div>
              );
            })}
          </>
        )}
      </div>

      {!ticketId && (
        <div className="flex flex-wrap gap-2 px-5 pb-3">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply.label}
              type="button"
              onClick={() => send(reply.label, reply.category)}
              className="bg-brand-soft text-brand hover:bg-brand-soft/70 cursor-pointer rounded-full px-3.5 py-2 text-xs font-medium transition-colors"
            >
              {reply.label}
            </button>
          ))}
        </div>
      )}

      <div className="border-border flex items-end gap-2 border-t p-4">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send(draft);
            }
          }}
          placeholder="Type your message..."
          rows={1}
          className="max-h-32 min-h-11 flex-1 resize-none rounded-full bg-gray-50 px-4 py-3"
        />

        <Button
          size="icon"
          aria-label="Send message"
          disabled={!draft.trim()}
          isLoading={isSending || isStarting}
          onClick={() => send(draft)}
          className="h-11 w-11 shrink-0 rounded-full"
        >
          <SendHorizonal className="h-4.5 w-4.5" />
        </Button>
      </div>
    </div>
  );
};
