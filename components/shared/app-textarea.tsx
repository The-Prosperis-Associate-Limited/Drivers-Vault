import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const AppTextArea = function ({
  label,
  error,
  containerClassName,
  id,
  className,
  ...props
}: Props) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && <Label htmlFor={textareaId}>{label}</Label>}
      <Textarea
        id={textareaId}
        aria-invalid={!!error}
        className={cn("px-3 py-2", className)}
        {...props}
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
};
