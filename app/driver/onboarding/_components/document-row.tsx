"use client";

import { AppText } from "@/components/shared/app-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileText, Trash2, Upload } from "lucide-react";
import { useRef } from "react";
import type { DocumentStatus, DocumentType } from "@/types/driver";

interface Props {
  type: DocumentType;
  label: string;
  status?: DocumentStatus;
  fileName?: string | null;
  rejectionReason?: string | null;
  isUploading?: boolean;
  onUpload: (file: File) => void;
  onRemove?: () => void;
}

const statusTones: Record<DocumentStatus, string> = {
  PENDING: "text-amber-600",
  APPROVED: "text-emerald-600",
  REJECTED: "text-destructive",
};

export const DocumentRow = function ({
  label,
  status,
  fileName,
  rejectionReason,
  isUploading,
  onUpload,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isUploaded = !!status;

  return (
    <div
      className={cn(
        "rounded-xl bg-gray-50 p-4",
        status === "REJECTED" && "bg-red-50",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="bg-brand-soft flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <FileText className="text-brand h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <AppText type="label" className="block truncate">
            {label}
          </AppText>
          <AppText
            type="caption"
            className="text-muted-foreground block truncate"
          >
            {fileName ?? "JPG, PNG or PDF · up to 5 MB"}
          </AppText>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg,application/pdf"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
            event.target.value = "";
          }}
        />

        {isUploaded ? (
          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              isLoading={isUploading}
              onClick={() => inputRef.current?.click()}
              aria-label={`Replace ${label}`}
            >
              <Upload className="text-brand h-4 w-4" />
            </Button>
            {onRemove && status !== "APPROVED" && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                aria-label={`Remove ${label}`}
              >
                <Trash2 className="text-destructive h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <Button
            type="button"
            isLoading={isUploading}
            onClick={() => inputRef.current?.click()}
            className="h-9 shrink-0 rounded-lg px-4"
          >
            Upload
          </Button>
        )}
      </div>

      {status && (
        <AppText
          type="caption"
          className={cn("mt-2 block capitalize", statusTones[status])}
        >
          {status.toLowerCase()}
          {status === "REJECTED" && rejectionReason
            ? ` — ${rejectionReason}`
            : ""}
        </AppText>
      )}
    </div>
  );
};
