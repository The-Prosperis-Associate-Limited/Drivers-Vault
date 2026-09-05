"use client";

import { useGetProfile } from "@/hooks/use-get-profile";
import { MobileNav } from "./_components/navbar/mobile-nav";
import { Sidebar } from "./_components/navbar/sidebar";
import { TopNav } from "./_components/navbar/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = useGetProfile();

  const user = profile && {
    // An organisation is addressed by its company name everywhere on this surface.
    display_name:
      profile.client_profile?.organisation_name || profile.first_name,
    profile_pic: profile.profile_pic,
    state_of_residence: profile.state_of_residence,
    country: profile.country,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar user={user ?? undefined} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav mobileTrigger={<MobileNav user={user ?? undefined} />} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
