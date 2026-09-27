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
      greeting="Welcome to Drivers Vault support. Send a message and one of our agents will reply here shortly."
      quickReplies={QUICK_REPLIES}
    />
  );
};
