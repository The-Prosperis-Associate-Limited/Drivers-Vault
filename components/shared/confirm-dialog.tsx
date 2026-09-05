"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  /** Optional icon displayed above the title, e.g. Trash2 for delete confirmations */
  icon?: LucideIcon;
  /** Tailwind class(es) applied to the icon, e.g. "text-destructive" */
  iconClassName?: string;
  /** Variant applied to the confirm button */
  confirmVariant?: "default" | "destructive" | "outline" | "ghost";
}

export const ConfirmDialog = function ({
  isOpen,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  icon: Icon,
  iconClassName,
  confirmVariant = "default",
}: Props) {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="items-center text-center sm:text-center">
          {Icon && (
            <div className="bg-muted mb-2 flex h-14 w-14 items-center justify-center rounded-full">
              <Icon className={cn("h-7 w-7", iconClassName)} />
            </div>
          )}
          <DialogTitle className="text-lg">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-muted-foreground text-sm">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="mt-2 flex-row justify-center gap-3 sm:justify-center">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
