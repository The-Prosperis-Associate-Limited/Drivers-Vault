import { cn } from "@/lib/utils";

interface Props {
  label: string;
  className?: string;
}

export const StatusBadge = function ({ label, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
        className,
      )}
    >
      {label}
    </span>
  );
};
