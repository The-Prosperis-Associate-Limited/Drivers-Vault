import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import Link from "next/link";
import { AppText } from "./app-text";
import { AppTooltip } from "./app-tooltip";

interface Props {
  label: string;
  value: React.ReactNode;
  hint?: string;
  caption?: string;
  captionTone?: "positive" | "muted" | "warning";
  href?: string;
  className?: string;
}

const captionTones = {
  positive: "text-emerald-600",
  muted: "text-muted-foreground",
  warning: "text-amber-600",
} as const;

export const StatCard = function ({
  label,
  value,
  hint,
  caption,
  captionTone = "positive",
  href,
  className,
}: Props) {
  const body = (
    <>
      <span className="flex items-center gap-1.5">
        <AppText type="label" className="text-foreground uppercase">
          {label}
        </AppText>
        {hint && (
          <AppTooltip content={hint}>
            <Info className="text-muted-foreground h-3.5 w-3.5" />
          </AppTooltip>
        )}
      </span>
      <AppText
        type="h2"
        className="mt-2 text-2xl font-semibold md:text-[28px]"
        as="p"
      >
        {value}
      </AppText>
      {caption && (
        <AppText
          type="caption"
          className={cn("mt-2 block", captionTones[captionTone])}
        >
          {caption}
        </AppText>
      )}
    </>
  );

  const classes = cn(
    "border-border rounded-xl border bg-white p-4 md:p-5",
    href && "hover:border-brand/40 block transition-colors",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }

  return <div className={classes}>{body}</div>;
};
