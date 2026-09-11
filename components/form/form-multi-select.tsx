import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { AppMultiSelect } from "@/components/shared/app-multi-select";
import type { SelectOption } from "@/components/shared/app-select";

interface Props<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  containerClassName?: string;
}

export function FormMultiSelect<TFieldValues extends FieldValues>({
  control,
  name,
  errors,
  options,
  label,
  placeholder,
  disabled,
  containerClassName,
}: Props<TFieldValues>) {
  const errorMessage = get(errors, name)?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AppMultiSelect
          options={options}
          value={(field.value as string[]) ?? []}
          onValueChange={(val) => field.onChange(val)}
          label={label}
          placeholder={placeholder}
          error={errorMessage}
          disabled={disabled}
          containerClassName={containerClassName}
        />
      )}
    />
  );
}
