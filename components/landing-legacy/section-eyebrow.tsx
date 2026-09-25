import { cn } from "@/lib/utils";

interface Props {
  index: string;
  label: string;
  className?: string;
}

export const SectionEyebrow = function ({ index, label, className }: Props) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-brand text-xs font-semibold tracking-[0.35em]">
        {index}
      </span>
      <span className="bg-border h-px w-8" />
      <span className="text-muted-foreground text-xs font-medium tracking-[0.25em] uppercase">
        {label}
      </span>
    </div>
  );
};
