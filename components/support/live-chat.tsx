"use client";

import { useEffect, useRef, useState } from "react";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useLiveChat } from "@/hooks/use-live-chat";
import { useGetProfile } from "@/hooks/use-get-profile";
import { cn, formatTime } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import type { ChatMessage } from "@/types/chat";

interface Props {
  firstName?: string | null;
  greeting: string;
  quickReplies: string[];
}

const bubbleFor = function (message: ChatMessage, selfId: string | undefined) {
  if (message.is_system) return "system";
  if (message.senderId === "self" || message.senderId === selfId) return "own";
  return "support";
};

// The real support conversation — REST writes, socket echoes, one open
// thread per user. Shared by the client and driver support sheets.
export const LiveChat = function ({
  firstName,
  greeting,
  quickReplies,
}: Props) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const { profile } = useGetProfile();
  const { messages, isFetching, isSending, resolved, sendMessage } =
    useLiveChat(true);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    sendMessage(value);
    setDraft("");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5">
        <AppText
          type="caption"
          className="text-muted-foreground block text-center tracking-wide uppercase"
        >
          Support
        </AppText>

        <div className="max-w-[85%] rounded-xl bg-gray-100 px-4 py-3">
          <AppText type="caption" className="text-foreground block">
            Hi {firstName ?? "there"} 👋 {greeting}
          </AppText>
        </div>

        {isFetching && !messages.length ? (
          <Skeleton className="h-16 w-3/4 rounded-xl" />
        ) : (
          messages.map((message) => {
            const kind = bubbleFor(message, profile?.id);

            if (kind === "system") {
              return (
                <AppText
                  key={message.id}
                  type="caption"
                  className="text-muted-foreground block text-center text-xs"
                >
                  {message.message}
                </AppText>
              );
            }

            const own = kind === "own";

            return (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] rounded-xl px-4 py-3",
                  own ? "bg-brand ml-auto" : "bg-gray-100",
                )}
              >
                {!own && message.sender && (
                  <AppText
                    type="caption"
                    className="text-brand block text-xs font-semibold"
                  >
                    {message.sender.first_name ?? "Support"}
                  </AppText>
                )}
                <AppText
                  type="caption"
                  className={cn(
                    "block",
                    own ? "text-white" : "text-foreground",
                  )}
                >
                  {message.message}
                </AppText>
                <AppText
                  type="caption"
                  className={cn(
                    "mt-1 block",
                    own ? "text-white/70" : "text-muted-foreground",
                  )}
                >
                  {formatTime(message.sent_at)}
                </AppText>
              </div>
            );
          })
        )}

        {resolved && (
          <AppText
            type="caption"
            className="text-muted-foreground block text-center text-xs"
          >
            This conversation is resolved — send a message to start a new one.
          </AppText>
        )}

        <div ref={bottomRef} />
      </div>

      {!messages.length && !isFetching && (
        <div className="flex flex-wrap gap-2 px-5 pb-3">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => send(reply)}
              className="bg-brand-soft text-brand hover:bg-brand-soft/70 cursor-pointer rounded-full px-3.5 py-2 text-xs font-medium transition-colors"
            >
              {reply}
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
          isLoading={isSending}
          onClick={() => send(draft)}
          className="h-11 w-11 shrink-0 rounded-full"
        >
          <SendHorizonal className="h-4.5 w-4.5" />
        </Button>
      </div>
    </div>
  );
};
