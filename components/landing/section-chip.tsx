import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  children: React.ReactNode;
  icon?: LucideIcon;
  // light sits on white sections, dark on the deep-blue panels.
  variant?: "light" | "dark";
  className?: string;
}

export const SectionChip = function ({
  children,
  icon: Icon,
  variant = "light",
  className,
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase",
        variant === "light"
          ? "text-ink bg-slate-100"
          : "bg-[#0a2377] text-white",
        className,
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
};
