import { cn } from "@/lib/utils";

interface Props {
  score: number;
  size?: number;
  className?: string;
}

// Renders exactly what the API returns — the score is never computed here.
export const TrustRing = function ({ score, size = 64, className }: Props) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(score, 100) / 100);

  return (
    <div
      className={cn("flex flex-col items-center gap-1", className)}
      aria-label={`Trust score ${score} out of 100`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-brand-soft)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="text-ink absolute inset-0 flex items-center justify-center text-lg font-semibold">
          {score}
        </span>
      </div>
      <span className="text-muted-foreground text-xs">Trust Score</span>
    </div>
  );
};
