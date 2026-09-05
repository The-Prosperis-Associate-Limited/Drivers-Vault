import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  className?: string;
  starClassName?: string;
}

export const StarRating = function ({
  rating,
  className,
  starClassName,
}: Props) {
  const filled = Math.round(rating);

  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`${rating.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden
          className={cn(
            "h-4 w-4",
            index < filled
              ? "fill-amber-500 text-amber-500"
              : "fill-transparent text-gray-300",
            starClassName,
          )}
        />
      ))}
    </span>
  );
};
