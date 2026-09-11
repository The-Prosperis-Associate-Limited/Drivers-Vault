import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { AppSelect, type SelectOption } from "@/components/shared/app-select";

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

export function FormSelect<TFieldValues extends FieldValues>({
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
        <AppSelect
          options={options}
          value={field.value ?? null}
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
