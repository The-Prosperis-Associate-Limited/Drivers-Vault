"use client";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { OnboardingShell } from "@/components/shared/onboarding-shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOnboardingProfile } from "@/hooks/use-onboarding-profile";
import {
  DOCUMENT_LABELS,
  ONBOARDING_TIPS,
  getOnboardingProgress,
} from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DriverDocument, DocumentType } from "@/types/driver";
import { DocumentRow } from "../_components/document-row";
import { StepHeader } from "../_components/step-header";
import {
  useDeleteDocument,
  useGetDocuments,
  useUploadDocument,
} from "@/hooks/use-documents";

// The three the review screen refuses to submit without. Proof of address and
// the guarantor files are collected but do not block a first submission.
const REQUIRED_DOCUMENTS: DocumentType[] = [
  "NIN_SLIP",
  "PASSPORT_PHOTO",
  "DRIVERS_LICENCE",
];

const OPTIONAL_DOCUMENTS: DocumentType[] = [
  "PROOF_OF_ADDRESS",
  "GUARANTOR_PASSPORT",
  "GUARANTOR_NIN_SLIP",
];

export default function DocumentsStep() {
  const router = useRouter();
  const { profile } = useOnboardingProfile();
  const { documents, isFetching } = useGetDocuments();

  const [uploadingType, setUploadingType] = useState<DocumentType | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<DriverDocument | null>(
    null,
  );

  const { uploadDocument } = useUploadDocument({
    onSuccess: () => setUploadingType(null),
  });
  const { deleteDocument, isPending: isDeleting } = useDeleteDocument();

  const handleUpload = (type: DocumentType, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    setUploadingType(type);
    uploadDocument(formData);
  };

  const documentFor = (type: DocumentType) =>
    documents.find((document) => document.type === type);

  const hasRequired = REQUIRED_DOCUMENTS.every((type) => !!documentFor(type));

  const firstName = profile?.user.first_name ?? "there";

  return (
    <OnboardingShell
      title={`Welcome ${firstName} 👋`}
      subtitle="Let's get your account fully set up. A few quick steps stand between you and your first job."
      tips={ONBOARDING_TIPS.DOCUMENTS}
    >
      <StepHeader
        title="Upload Documents"
        description="Clear photos of all four corners, nothing cropped or blurry."
        progress={getOnboardingProgress("DOCUMENTS")}
      />

      {isFetching && !documents.length ? (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-3">
          {[...REQUIRED_DOCUMENTS, ...OPTIONAL_DOCUMENTS].map((type) => {
            const document = documentFor(type);

            return (
              <DocumentRow
                key={type}
                type={type}
                label={DOCUMENT_LABELS[type]}
                status={document?.status}
                fileName={document?.file_name}
                rejectionReason={document?.rejection_reason}
                isUploading={uploadingType === type}
                onUpload={(file) => handleUpload(type, file)}
                onRemove={
                  document ? () => setPendingRemoval(document) : undefined
                }
              />
            );
          })}
        </div>
      )}

      <Button
        disabled={!hasRequired}
        onClick={() => router.push("/driver/onboarding/review")}
        className="mt-6 h-12 w-full rounded-lg text-sm"
      >
        Continue
      </Button>

      <ConfirmDialog
        isOpen={!!pendingRemoval}
        onOpenChange={(open) => !open && setPendingRemoval(null)}
        icon={Trash2}
        iconClassName="text-destructive"
        title={`Remove ${pendingRemoval ? (DOCUMENT_LABELS[pendingRemoval.type] ?? "this document") : "this document"}?`}
        description="The file is deleted from your application. You can upload a replacement afterwards."
        confirmLabel="Remove"
        confirmVariant="destructive"
        isLoading={isDeleting}
        onConfirm={() => {
          if (pendingRemoval) deleteDocument({ id: pendingRemoval.id });
          setPendingRemoval(null);
        }}
      />
    </OnboardingShell>
  );
}
