import { cn } from "@/lib/utils";

type GridPatternProps = {
  className?: string;
  color?: string;
  size?: number;
};

export function GridPattern({
  className,
  color = "rgba(255,255,255,.055)",
  size = 92,
}: GridPatternProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
