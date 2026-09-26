"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/shared/reveal";

interface Props {
  heading: string;
  items: { question: string; answer: string }[];
}

export const FaqSection = function ({ heading, items }: Props) {
  return (
    <section id="faqs" className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-ink text-center text-2xl font-bold tracking-wide uppercase md:text-3xl">
            {heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion
            type="single"
            collapsible
            defaultValue={items[0]?.question}
            className="mt-10"
          >
            {items.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-ink py-5 text-left text-base font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};
