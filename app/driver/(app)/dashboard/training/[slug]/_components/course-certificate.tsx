import { AppText } from "@/components/shared/app-text";
import { CertificateSeal } from "@/components/svg/certificate-seal";
import { TegatLogo } from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Download, Lock } from "lucide-react";
import type { Certification } from "@/types/training";

interface Props {
  courseTitle: string;
  driverName: string;
  certification?: Certification;
  onContinue: () => void;
}

/*
  Follows the reference template in ~/Downloads/Driversvault/Pick a template,
  rebuilt with Drivers Vault's mark and a drawn seal — the template's own logo, seal and
  founder signature belong to another product. Every value on it comes from the
  server; nothing here is decorative text pretending to be data.
*/
export const CourseCertificate = function ({
  courseTitle,
  driverName,
  certification,
  onContinue,
}: Props) {
  const sheet = (
    <div className="aspect-[1.45] w-full bg-white px-6 py-8 text-center sm:px-10 md:px-16 md:py-12">
      <div className="flex items-start justify-between gap-4">
        <span className="text-muted-foreground text-[10px] sm:text-xs">
          {certification ? formatDate(certification.issued_at) : "—"}
        </span>

        <TegatLogo size={44} />

        <span className="text-muted-foreground max-w-[30%] truncate text-[10px] sm:text-xs">
          {certification?.reference ?? "—"}
        </span>
      </div>

      <h2 className="font-certificate-serif mx-auto mt-6 max-w-sm text-2xl leading-tight tracking-wide text-slate-500 uppercase sm:text-3xl md:mt-8 md:text-[40px]">
        Certificate of completion
      </h2>

      <p className="font-certificate-script mx-auto mt-8 max-w-2xl border-b border-slate-300 pb-2 text-3xl leading-[1.4] text-slate-900 sm:text-5xl md:mt-12 md:text-6xl">
        {driverName}
      </p>

      <p className="text-muted-foreground mx-auto mt-6 max-w-lg text-[11px] leading-relaxed sm:text-sm">
        is hereby awarded this certificate of achievement for the successful
        completion of the{" "}
        <span className="text-foreground font-semibold">
          &ldquo;{courseTitle}&rdquo;
        </span>{" "}
        certification
        {certification ? ` on ${formatDate(certification.issued_at)}` : ""}.
      </p>

      <div className="mt-10 flex items-end justify-between gap-4 md:mt-16">
        <div className="text-left">
          <div className="w-24 border-b border-slate-400 pb-1 sm:w-32" />
          <AppText
            type="caption"
            className="text-foreground mt-2 block text-[10px] font-bold tracking-wide uppercase sm:text-xs"
          >
            Tegat
          </AppText>
          <AppText
            type="caption"
            className="text-muted-foreground block text-[9px] sm:text-[10px]"
          >
            Driver Certification
          </AppText>
        </div>

        <div className="text-center">
          <AppText
            type="caption"
            className="block max-w-[10rem] border-b border-red-300 pb-1 text-[10px] font-bold text-red-600 sm:max-w-xs sm:text-xs"
          >
            {courseTitle}
          </AppText>
          <AppText
            type="caption"
            className="text-foreground mt-1 block text-[8px] font-bold tracking-wide uppercase sm:text-[10px]"
          >
            Course name
          </AppText>
        </div>

        <CertificateSeal size={64} className="shrink-0 sm:h-auto sm:w-24" />
      </div>

      {certification?.expires_at && (
        <AppText
          type="caption"
          className="text-muted-foreground mt-6 block text-[10px]"
        >
          Valid until {formatDate(certification.expires_at)}
        </AppText>
      )}
    </div>
  );

  if (!certification) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        <div
          aria-hidden
          className="pointer-events-none opacity-40 blur-[4px] select-none"
        >
          {sheet}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80">
            <Lock className="text-brand h-6 w-6" />
          </div>

          <AppText type="h4" className="max-w-xs text-lg font-semibold">
            Complete every module to unlock your certificate.
          </AppText>

          <Button onClick={onContinue} className="h-11 rounded-lg px-8">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div
        data-print-certificate
        className="border-border overflow-hidden rounded-xl border"
      >
        {sheet}
      </div>

      <div className="flex justify-end print:hidden">
        {certification.document_url ? (
          <Button asChild className="h-11 rounded-lg px-6">
            <a
              href={certification.document_url}
              target="_blank"
              rel="noreferrer"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </Button>
        ) : (
          // No stored PDF yet, so the browser's own print-to-PDF is the download.
          <Button
            onClick={() => window.print()}
            className="h-11 rounded-lg px-6"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        )}
      </div>
    </div>
  );
};
