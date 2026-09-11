"use client";

import { AppInput } from "@/components/shared/app-input";
import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { FAQ_SECTIONS } from "./faq-content";

interface Props {
  onStartChat: () => void;
}

export const FaqPanel = function ({ onStartChat }: Props) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(
    FAQ_SECTIONS[0].questions[0].question,
  );

  const sections = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return FAQ_SECTIONS;

    return FAQ_SECTIONS.map((section) => ({
      ...section,
      questions: section.questions.filter(
        (entry) =>
          entry.question.toLowerCase().includes(term) ||
          entry.answer.toLowerCase().includes(term),
      ),
    })).filter((section) => section.questions.length);
  }, [search]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-border border-b px-5 py-4">
        <AppInput
          type="search"
          placeholder="Search here...."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-11"
        />
      </div>

      <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {!sections.length ? (
          <AppText type="caption" className="text-muted-foreground block">
            Nothing matches &ldquo;{search}&rdquo;. Start a chat and we&rsquo;ll
            answer it directly.
          </AppText>
        ) : (
          sections.map((section) => {
            const Icon = section.icon;

            return (
              <div key={section.title} className="space-y-2">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Icon className="text-brand h-4 w-4 shrink-0" />
                  <AppText
                    type="caption"
                    className="font-semibold tracking-wide uppercase"
                  >
                    {section.title}
                  </AppText>
                </div>

                <div className="border-border divide-border divide-y overflow-hidden rounded-xl border">
                  {section.questions.map((entry) => {
                    const isOpen = open === entry.question;

                    return (
                      <div key={entry.question}>
                        <button
                          type="button"
                          onClick={() =>
                            setOpen(isOpen ? null : entry.question)
                          }
                          aria-expanded={isOpen}
                          className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left"
                        >
                          <AppText type="label">{entry.question}</AppText>
                          <ChevronDown
                            className={cn(
                              "text-muted-foreground h-4 w-4 shrink-0 transition-transform",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>

                        {isOpen && (
                          <AppText
                            type="caption"
                            className="text-muted-foreground block px-4 pb-4"
                          >
                            {entry.answer}
                          </AppText>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="border-border border-t p-5">
        <div className="bg-brand flex items-center justify-between gap-4 rounded-xl p-4">
          <div className="min-w-0">
            <AppText type="label" className="block text-white">
              Still need help?
            </AppText>
            <AppText type="caption" className="block text-white/80">
              Our team is one message away.
            </AppText>
          </div>

          <Button
            onClick={onStartChat}
            variant="ghost"
            className="text-brand h-10 shrink-0 rounded-full bg-white px-5 hover:bg-white/90"
          >
            Start chat
          </Button>
        </div>
      </div>
    </div>
  );
};
