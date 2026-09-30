import Link from "next/link";
import { SiteFooter } from "@/components/shared/site-footer";
import { TegatLogo } from "@/components/svg/logo";

interface Props {
  title: string;
  updated: string;
  children: React.ReactNode;
}

export function LegalShell({ title, updated, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-border border-b">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <TegatLogo size={26} />
            <span className="font-serif text-lg font-semibold">
              Haya Drivers
            </span>
          </Link>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 md:px-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Last updated: {updated}
        </p>

        <article className="prose-legal mt-8 space-y-8 text-[15px] leading-7 text-slate-700 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-900 [&_li]:mt-2 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
