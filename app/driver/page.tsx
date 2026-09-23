import type { Metadata } from "next";

import { DriverLandingPage } from "@/components/landing/driver/driver-landing-page";

export const metadata: Metadata = {
  title: "Drive with DriverVault",
  description:
    "Choose suitable driving jobs, set your availability, and earn with verified clients on DriverVault.",
};

export default function DriverPage() {
  return <DriverLandingPage />;
}
