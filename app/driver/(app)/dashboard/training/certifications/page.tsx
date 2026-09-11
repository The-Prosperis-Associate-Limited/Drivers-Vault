import { redirect } from "next/navigation";

// Certificates live in "Recently earned" on the training screen. The route
// exists because the server sends /dashboard/training/certifications as the
// action url when a certificate is issued.
export default function Certifications() {
  redirect("/driver/dashboard/training");
}
