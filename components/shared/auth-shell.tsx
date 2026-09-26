import { Reveal } from "./reveal";
import { SiteFooter } from "./site-footer";
import { AppText } from "./app-text";

interface Props {
  children: React.ReactNode;
}

// The client auth screens are a single centred column over the site footer —
// no illustration panel and no back header, unlike the driver app.
export const AuthShell = function ({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="mx-auto w-full max-w-md flex-1 px-5 py-16 md:py-24">
        <Reveal y={16}>{children}</Reveal>
      </main>
      <SiteFooter />
    </div>
  );
};

interface HeadingProps {
  title: string;
  subtitle?: React.ReactNode;
}

export const AuthHeading = function ({ title, subtitle }: HeadingProps) {
  return (
    <div className="mb-7 space-y-1.5">
      <AppText type="h2" className="text-[26px] font-bold">
        {title}
      </AppText>
      {subtitle && (
        <AppText type="subtitle" className="text-muted-foreground text-sm">
          {subtitle}
        </AppText>
      )}
    </div>
  );
};
