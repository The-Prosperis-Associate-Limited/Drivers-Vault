import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { AppTextArea } from "@/components/shared/app-textarea";
import type React from "react";

interface Props<TFieldValues extends FieldValues> extends Omit<
  React.ComponentProps<"textarea">,
  "name" | "value" | "onChange" | "onBlur"
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  label?: string;
  containerClassName?: string;
}

export function FormTextarea<TFieldValues extends FieldValues>({
  control,
  name,
  errors,
  label,
  containerClassName,
  ...props
}: Props<TFieldValues>) {
  const errorMessage = get(errors, name)?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AppTextArea
          {...props}
          {...field}
          label={label}
          error={errorMessage}
          containerClassName={containerClassName}
          value={field.value ?? ""}
        />
      )}
    />
  );
}
