"use client";

import { LiveChat } from "@/components/support/live-chat";

interface Props {
  firstName?: string | null;
}

const QUICK_REPLIES = [
  "My verification is stuck",
  "Update my payout details",
  "A client cancelled my job",
  "How is trust score calculated?",
];

export const LiveChatPanel = function ({ firstName }: Props) {
  return (
    <LiveChat
      firstName={firstName}
      greeting="Welcome to Haya Drivers support. Ask me anything - I'll answer right away and bring in a human agent whenever you need one."
      quickReplies={QUICK_REPLIES}
    />
  );
};
