import { redirect } from "next/navigation";

// Earnings moved into Settings. The route stays because the server still sends
// /dashboard/earnings as the action url on payout notifications.
export default function Earnings() {
  redirect("/driver/dashboard/settings?tab=earnings");
}
