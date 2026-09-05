import { cn } from "@/lib/utils";

interface Props {
  label: string;
  blurb?: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}

export const OptionCard = function ({
  label,
  blurb,
  selected,
  onSelect,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "rounded-lg border px-5 py-4 text-left transition-colors",
        selected
          ? "border-brand bg-white"
          : "bg-brand-soft/40 hover:border-brand/40 border-transparent",
        className,
      )}
    >
      <span
        className={cn(
          "block text-sm font-semibold",
          selected ? "text-brand" : "text-ink",
        )}
      >
        {label}
      </span>
      {blurb && (
        <span className="text-muted-foreground mt-1 block text-xs">
          {blurb}
        </span>
      )}
    </button>
  );
};
