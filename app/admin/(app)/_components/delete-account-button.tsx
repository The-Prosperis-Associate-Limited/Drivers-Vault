"use client";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  userId: string;
  name: string;
  backHref: string;
}

// Deletion is super-admin only on the server; anyone else gets the 403 toast.
export const DeleteAccountButton = function ({
  userId,
  name,
  backHref,
}: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { mutate, isPending } = useSubmitData({
    url: API_ENDPOINTS.adminUsers.remove(userId),
    method: "delete",
    onSuccessMessage: "Account deleted",
    onSuccess: () => router.push(backHref),
  });

  return (
    <>
      <Button
        variant="outline"
        className="text-destructive border-destructive/40 h-10 shrink-0 rounded-lg px-4 text-sm"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
        Delete account
      </Button>

      <ConfirmDialog
        isOpen={open}
        onOpenChange={setOpen}
        icon={Trash2}
        iconClassName="text-destructive"
        title={`Delete ${name}'s account?`}
        description="This permanently removes the account, its profile, documents, bookings and wallet history. It cannot be undone - suspending is the reversible option."
        confirmLabel="Delete permanently"
        confirmVariant="destructive"
        isLoading={isPending}
        onConfirm={() => mutate({})}
      />
    </>
  );
};
