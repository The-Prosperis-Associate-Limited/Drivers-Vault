import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  className?: string;
}

// The mark is square and ships as a single colour version, so there is no
// light/dark variant to pick between — it sits on white everywhere it appears.
export const TegatLogo = function ({ size = 44, className }: Props) {
  return (
    <Image
      src="/logo.svg"
      alt="Drivers Vault"
      width={size}
      height={size}
      priority
      className={cn("shrink-0", className)}
    />
  );
};
