import { CirclePlus, Mail, Minus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  audience: "client" | "driver";
  title: string;
  items: readonly FaqItem[];
  supportPrompt?: {
    title: string;
    description: string;
  };
};

export function FaqSection({
  audience,
  title,
  items,
  supportPrompt,
}: FaqSectionProps) {
  const isClient = audience === "client";

  return (
    <section
      id="faqs"
      className={cn(
        "scroll-mt-28 sm:scroll-mt-32 sm:px-6 lg:px-8 lg:py-28",
        isClient ? "px-2 py-12 sm:py-20" : "px-4 py-20",
      )}
    >
      <div className="mx-auto max-w-4xl">
        <h2
          className={cn(
            "text-center font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl",
            isClient ? "text-[1.25rem]" : "text-2xl",
          )}
        >
          {title}
        </h2>
        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className={cn(
            isClient ? "mt-7 gap-2 sm:mt-10 sm:gap-3" : "mt-10 gap-3",
          )}
        >
          {items.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`faq-${index}`}
              className={cn(
                "rounded-2xl border-0 data-open:bg-[#f8f9fb]",
                isClient ? "px-3 sm:px-7" : "px-5 sm:px-7",
              )}
            >
              <AccordionTrigger
                className={cn(
                  "font-semibold text-slate-950 hover:no-underline",
                  isClient
                    ? "gap-3 py-4 text-xs sm:gap-4 sm:py-5 sm:text-sm"
                    : "gap-4 py-4 text-sm [&_[data-slot=accordion-trigger-icon]]:hidden",
                )}
              >
                <span className="flex items-center gap-3 sm:gap-4">
                  {isClient ? (
                    <span className="grid size-5 shrink-0 place-items-center rounded-full border border-slate-300 text-[10px] text-slate-500">
                      {index + 1}
                    </span>
                  ) : (
                    <span className="grid size-6 shrink-0 place-items-center rounded-full border border-slate-300 text-slate-500">
                      <CirclePlus className="size-4 group-aria-expanded/accordion-trigger:hidden" />
                      <Minus className="hidden size-3 group-aria-expanded/accordion-trigger:block" />
                    </span>
                  )}
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "text-slate-500",
                  isClient
                    ? "pr-5 pb-4 pl-8 text-xs leading-5 sm:pr-8 sm:pb-5 sm:pl-9 sm:text-sm sm:leading-6"
                    : "pr-5 pb-4 pl-10 text-sm leading-6 sm:pr-8 sm:pb-5",
                )}
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {supportPrompt ? (
          <div className="mx-auto mt-14 flex max-w-xl flex-col items-center rounded-3xl bg-blue-50 px-6 py-8 text-center">
            <Mail className="size-6 text-blue-700" />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {supportPrompt.title}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {supportPrompt.description}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
