import { SiteFooter } from "@/components/shared/site-footer";
import { MarketplaceHeader } from "./_components/marketplace-header";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MarketplaceHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
