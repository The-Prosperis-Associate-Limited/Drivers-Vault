import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function RatingBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white px-5 py-3 shadow-[0_10px_30px_rgba(7,32,84,.14)]",
        className,
      )}
    >
      <p className="text-[9px] text-slate-500">Average rating</p>
      <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-900">
        4.8
        <span className="flex gap-0.5 text-amber-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-3 fill-current" />
          ))}
        </span>
      </div>
    </div>
  );
}
