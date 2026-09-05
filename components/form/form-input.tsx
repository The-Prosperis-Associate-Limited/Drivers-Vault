import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { AppInput } from "@/components/shared/app-input";
import type React from "react";
import { LucideIcon } from "lucide-react";

interface Props<TFieldValues extends FieldValues> extends Omit<
  React.ComponentProps<"input">,
  "name" | "value" | "onChange" | "onBlur"
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  label?: string;
  containerClassName?: string;
  icon?: LucideIcon;
  suffix?: string;
}

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  errors,
  label,
  containerClassName,
  icon,
  suffix,
  ...props
}: Props<TFieldValues>) {
  const errorMessage = get(errors, name)?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AppInput
          {...props}
          {...field}
          label={label}
          error={errorMessage}
          containerClassName={containerClassName}
          // value={field.value ?? ""}
          icon={icon}
          suffix={suffix}
          // handle checkbox specifically
          checked={props.type === "checkbox" ? !!field.value : undefined}
          value={props.type === "checkbox" ? undefined : (field.value ?? "")}
        />
      )}
    />
  );
}
