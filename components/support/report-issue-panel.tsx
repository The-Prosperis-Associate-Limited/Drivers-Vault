"use client";

import { AppInput } from "@/components/shared/app-input";
import { AppText } from "@/components/shared/app-text";
import { AppTextArea } from "@/components/shared/app-textarea";
import { Button } from "@/components/ui/button";
import { useCreateTicket } from "@/hooks/use-tickets";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { TicketCategory, TicketPriority } from "@/types/ticket";

interface Props {
  onDone: () => void;
}

const ISSUE_TYPES: { label: string; category: TicketCategory }[] = [
  { label: "App bug", category: "BUG_REPORT" },
  { label: "Payment problem", category: "PAYMENT" },
  { label: "Verification issue", category: "VERIFICATION" },
  { label: "Job / booking", category: "BOOKING" },
  { label: "Safety concern", category: "ACCOUNT" },
  { label: "Other", category: "OTHER" },
];

const URGENCY: {
  value: TicketPriority;
  label: string;
  caption: string;
  dot: string;
}[] = [
  {
    value: "LOW",
    label: "Low",
    caption: "Minor annoyance",
    dot: "bg-emerald-500",
  },
  {
    value: "MEDIUM",
    label: "Medium",
    caption: "Affects my work",
    dot: "bg-amber-500",
  },
  {
    value: "URGENT",
    label: "Urgent",
    caption: "Blocking me now",
    dot: "bg-red-500",
  },
];

const MAX_DESCRIPTION = 1000;

export const ReportIssuePanel = function ({ onDone }: Props) {
  const [issue, setIssue] = useState<(typeof ISSUE_TYPES)[number] | null>(null);
  const [priority, setPriority] = useState<TicketPriority>("MEDIUM");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");

  const { createTicket, isPending } = useCreateTicket({
    onSuccessMessage: "Report submitted, we'll be in touch",
    onSuccess: onDone,
  });

  const canSubmit = !!issue && description.trim().length >= 10;

  const submit = () => {
    if (!issue) return;

    createTicket({
      subject: reference ? `${issue.label} — ${reference}` : issue.label,
      description: description.trim(),
      category: issue.category,
      priority,
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-5 py-5">
        <div className="space-y-2">
          <AppText type="label">
            What went wrong? <span className="text-destructive">*</span>
          </AppText>

          <div className="flex flex-wrap gap-2">
            {ISSUE_TYPES.map((type) => (
              <button
                key={type.label}
                type="button"
                onClick={() => setIssue(type)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  issue?.label === type.label
                    ? "border-brand bg-brand-soft text-brand"
                    : "border-border text-foreground hover:border-brand/40",
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <AppText type="label">How urgent is it?</AppText>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {URGENCY.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setPriority(level.value)}
                className={cn(
                  "cursor-pointer rounded-xl border px-4 py-3 text-left transition-colors",
                  priority === level.value
                    ? "border-brand bg-brand-soft/40"
                    : "border-border hover:border-brand/40",
                )}
              >
                <span className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", level.dot)} />
                  <AppText type="label">{level.label}</AppText>
                </span>
                <AppText
                  type="caption"
                  className="text-muted-foreground mt-0.5 block"
                >
                  {level.caption}
                </AppText>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-3">
            <AppText type="label">Booking / trip reference</AppText>
            <AppText type="caption" className="text-muted-foreground">
              Optional
            </AppText>
          </div>

          <AppInput
            placeholder="E.g BKG-4821"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-3">
            <AppText type="label">
              Describe the problem <span className="text-destructive">*</span>
            </AppText>
            <AppText type="caption" className="text-muted-foreground">
              {description.length}/{MAX_DESCRIPTION}
            </AppText>
          </div>

          <AppTextArea
            placeholder="Write your inquiry in detail..."
            rows={6}
            maxLength={MAX_DESCRIPTION}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </div>

      <div className="border-border space-y-2 border-t p-5">
        <Button
          onClick={submit}
          disabled={!canSubmit}
          isLoading={isPending}
          className="h-12 w-full rounded-lg"
        >
          Submit report
        </Button>

        {!canSubmit && (
          <AppText
            type="caption"
            className="text-muted-foreground block text-center"
          >
            Select an issue type and add at least 10 characters.
          </AppText>
        )}
      </div>
    </div>
  );
};
