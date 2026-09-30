"use client";

import { LiveChat } from "./live-chat";

interface Props {
  firstName?: string | null;
}

const QUICK_REPLIES = [
  "I can't find a suitable driver",
  "A driver declined my request",
  "A question about payment",
  "How is trust score calculated?",
];

export const LiveChatPanel = function ({ firstName }: Props) {
  return (
    <LiveChat
      firstName={firstName}
      greeting="Welcome to Haya Drivers support. Send a message and one of our agents will reply here shortly."
      quickReplies={QUICK_REPLIES}
    />
  );
};
