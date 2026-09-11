"use client";

import { useDropzone, type Accept } from "react-dropzone";
import { UploadCloud, X, FileText } from "lucide-react";
import { AppText } from "@/components/shared/app-text";
import { cn } from "@/lib/utils";

export interface DropzoneProps {
  value?: File | File[] | null;
  onChange?: (value: File | File[] | null) => void;
  accept?: Accept;
  multiple?: boolean;
  maxSize?: number; // bytes
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  containerClassName?: string;
}

export function AppDropzone({
  value,
  onChange,
  accept,
  multiple = false,
  maxSize,
  label,
  hint,
  error,
  disabled,
  containerClassName,
}: DropzoneProps) {
  const files = value ? (Array.isArray(value) ? value : [value]) : [];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    maxSize,
    disabled,
    onDrop: (accepted) => {
      if (!onChange) return;
      if (!accepted.length) return;
      onChange(multiple ? accepted : accepted[0]);
    },
  });

  const removeFile = (index: number) => {
    if (!onChange) return;
    if (multiple) {
      const next = files.filter((_, i) => i !== index);
      onChange(next.length ? next : null);
    } else {
      onChange(null);
    }
  };

  return (
    <div className={cn("w-full space-y-1.5", containerClassName)}>
      {label && (
        <AppText type="subtitle" className="text-sm font-medium text-gray-700">
          {label}
        </AppText>
      )}

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 transition-colors",
          isDragActive
            ? "border-brand bg-brand/5"
            : "hover:border-brand hover:bg-brand/5 border-gray-200 bg-gray-50",
          error && "border-red-400 bg-red-50",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud
          className={cn(
            "h-8 w-8",
            isDragActive ? "text-brand" : "text-gray-400",
          )}
        />
        <div className="text-center">
          <AppText type="body" className="text-sm font-medium text-gray-700">
            {isDragActive
              ? "Drop your file here"
              : "Drag & drop or click to upload"}
          </AppText>
          {hint && (
            <AppText type="caption" className="mt-0.5 text-xs text-gray-400">
              {hint}
            </AppText>
          )}
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <FileText className="h-4 w-4 shrink-0 text-gray-400" />
                <AppText
                  type="caption"
                  className="truncate text-xs text-gray-600"
                >
                  {file.name}
                </AppText>
                <AppText
                  type="caption"
                  className="shrink-0 text-xs text-gray-400"
                >
                  ({(file.size / 1024).toFixed(1)} KB)
                </AppText>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="ml-2 shrink-0 text-gray-400 transition-colors hover:text-red-500"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Error */}
      {error && (
        <AppText type="caption" className="text-xs text-red-500">
          {error}
        </AppText>
      )}
    </div>
  );
}
