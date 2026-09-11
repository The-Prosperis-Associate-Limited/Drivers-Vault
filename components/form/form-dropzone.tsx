import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  get,
} from "react-hook-form";
import { AppDropzone, type DropzoneProps } from "../shared/app-dropzone";

interface FormDropzoneProps<TFieldValues extends FieldValues> extends Omit<
  DropzoneProps,
  "value" | "onChange" | "error"
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
}

export function FormDropzone<TFieldValues extends FieldValues>({
  control,
  name,
  errors,
  ...rest
}: FormDropzoneProps<TFieldValues>) {
  const errorMessage = get(errors, name)?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AppDropzone
          {...rest}
          value={field.value ?? null}
          onChange={field.onChange}
          error={errorMessage}
        />
      )}
    />
  );
}
