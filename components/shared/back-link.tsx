import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
  label?: string;
  className?: string;
}

export const BackLink = function ({
  href,
  label = "Take a step back",
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground hover:text-brand inline-flex items-center gap-3 text-sm font-semibold transition-colors",
        className,
      )}
    >
      <ArrowLeft className="h-4.5 w-4.5" />
      {label}
    </Link>
  );
};
