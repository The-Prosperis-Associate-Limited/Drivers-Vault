import { cn } from "@/lib/utils";
import Image from "next/image";
import { AppText } from "./app-text";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon?: LucideIcon;
  illustration?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = function ({
  icon: Icon,
  illustration,
  title,
  description,
  action,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-14 text-center",
        className,
      )}
    >
      {illustration ? (
        <Image
          src={illustration}
          alt=""
          width={150}
          height={150}
          className="mb-5 h-auto w-[120px] md:w-[150px]"
          loading="eager"
        />
      ) : (
        Icon && (
          <div className="bg-brand-soft mb-5 flex h-20 w-20 items-center justify-center rounded-full">
            <Icon className="text-brand h-9 w-9" />
          </div>
        )
      )}

      <AppText type="h4" className="max-w-xs text-lg font-semibold">
        {title}
      </AppText>
      {description && (
        <AppText
          type="caption"
          className="text-muted-foreground mt-2 block max-w-xs"
        >
          {description}
        </AppText>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
