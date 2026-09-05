import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "default" | "lg";

interface AppAvatarProps {
  src?: string;
  fallback: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
}

export function AppAvatar({
  src,
  fallback,
  alt,
  size = "default",
  className,
}: AppAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      {src && <AvatarImage src={src} alt={alt ?? fallback} />}
      <AvatarFallback>{initials(fallback)}</AvatarFallback>
    </Avatar>
  );
}

// ─── Avatar Group ────────────────────────────────────────────────────────────

interface AvatarGroupItem {
  src?: string;
  fallback: string;
  alt?: string;
}

interface AppAvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export function AppAvatarGroup({
  avatars,
  max = 4,
  size = "default",
  className,
}: AppAvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((avatar, index) => (
        <Avatar
          key={index}
          size={size}
          className={cn("ring-background ring-2", index !== 0 && "-ml-2")}
        >
          {avatar.src && (
            <AvatarImage src={avatar.src} alt={avatar.alt ?? avatar.fallback} />
          )}
          <AvatarFallback>{initials(avatar.fallback)}</AvatarFallback>
        </Avatar>
      ))}

      {overflow > 0 && (
        <Avatar size={size} className="ring-background -ml-2 ring-2">
          <AvatarFallback>+{overflow}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
