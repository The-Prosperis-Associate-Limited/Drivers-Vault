import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProvider } from "./_components/provider";

export const metadata: Metadata = {
  title: {
    default: "Drivers Vault",
    template: "%s | Drivers Vault",
  },
  description:
    "Hire drivers you can actually trust. Drivers Vault vets every candidate against national identity, licence and police records, then scores them on reliability.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f6bf6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased")}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
