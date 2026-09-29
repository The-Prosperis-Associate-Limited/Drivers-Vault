import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms that govern your use of Drivers Vault - for clients hiring drivers and for drivers offering their services.",
  alternates: { canonical: "/terms" },
};

export default function TermsOfService() {
  return (
    <LegalShell title="Terms of service" updated="29 September 2026">
      <section>
        <p>
          These terms govern your use of Drivers Vault (the "platform", "we",
          "us"), a service that connects clients with vetted, professional
          drivers in Nigeria. By creating an account or using the platform you
          agree to these terms. If you do not agree, do not use the platform.
        </p>
      </section>

      <section>
        <h2>1. What Drivers Vault does</h2>
        <p>
          Drivers Vault verifies the identity, driving licence and guarantor of
          every driver on the platform before they can be hired, and brokers
          engagements between clients and drivers. We facilitate introductions,
          invoicing and payment administration. Unless expressly stated
          otherwise, drivers are not our employees; the working relationship for
          an engagement is between the client and the driver.
        </p>
      </section>

      <section>
        <h2>2. Accounts and eligibility</h2>
        <ul>
          <li>You must be at least 18 years old to use the platform.</li>
          <li>
            You must provide accurate, current and complete information when you
            register and keep it up to date.
          </li>
          <li>
            You are responsible for everything done under your account and for
            keeping your sign-in credentials confidential.
          </li>
          <li>
            One person or organisation may not hold multiple accounts for the
            purpose of evading a suspension or restriction.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. For clients</h2>
        <ul>
          <li>
            A hire request (whether for a named driver or a request that our
            team matches) is an invitation for us to review and issue an
            invoice. It is not binding until you pay and we confirm payment.
          </li>
          <li>
            Invoices are payable by bank transfer to the organisation account
            shown on your request. The amount on the invoice includes the
            driver's salary, VAT and our platform fee.
          </li>
          <li>
            After transferring, you must upload proof of payment. An engagement
            starts only after our team confirms that the money arrived. We may
            reject unclear or mismatched proof and ask you to re-upload.
          </li>
          <li>
            A driver's personal contact details are released to you only after
            your payment is confirmed. You may use them solely for the
            engagement you paid for.
          </li>
          <li>
            You agree to treat drivers lawfully and respectfully, to provide the
            working conditions described in your request, and not to ask a
            driver to do anything unlawful or unsafe.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. For drivers</h2>
        <ul>
          <li>
            You must complete verification truthfully. Submitting forged or
            altered documents, or another person's identity, leads to permanent
            removal and may be reported to the authorities.
          </li>
          <li>
            Your guarantor must be a working professional who has genuinely
            agreed to stand for you. We may contact them to confirm.
          </li>
          <li>
            Salaries for engagements brokered through the platform are settled
            through us. Amounts credited to your in-app earnings balance reflect
            what you are owed and are paid out per our payout process.
          </li>
          <li>
            You agree to show up for engagements you accept, to drive safely and
            lawfully, and to hold a valid licence for the vehicle class you are
            engaged to drive at all times.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Payments, fees and refunds</h2>
        <ul>
          <li>
            All prices are stated in Nigerian naira unless shown otherwise. VAT
            is applied at the prevailing statutory rate.
          </li>
          <li>
            Our platform fee is shown on every invoice before you pay. Fees are
            non-refundable once a payment has been confirmed and the driver's
            details released, except where required by law or where we fail to
            deliver the service paid for.
          </li>
          <li>
            If a confirmed engagement cannot be fulfilled (for example, the
            assigned driver becomes unavailable before starting), we will offer
            a replacement driver or a refund of the amount paid.
          </li>
          <li>
            Payment confirmation is a manual review of your bank transfer. We
            are not responsible for delays caused by your bank or by transfers
            made without the reference we ask you to include.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Prohibited conduct</h2>
        <ul>
          <li>
            Circumventing the platform: using it to find a driver or client and
            then engaging them off-platform to avoid fees.
          </li>
          <li>Submitting false information, documents or proof of payment.</li>
          <li>
            Harassment, discrimination or abuse of any user or of our staff.
          </li>
          <li>
            Scraping, probing or interfering with the platform's operation or
            security.
          </li>
        </ul>
        <p>
          We may suspend or terminate accounts that breach these terms, withhold
          pending payouts connected to fraud, and pursue any other remedy
          available to us.
        </p>
      </section>

      <section>
        <h2>7. Reviews and content</h2>
        <p>
          Reviews must reflect a genuine experience. We may remove content that
          is unlawful, deceptive or abusive. By posting content you grant us a
          non-exclusive licence to display it on the platform.
        </p>
      </section>

      <section>
        <h2>8. Disclaimers and liability</h2>
        <p>
          We verify drivers with reasonable care, but verification is not a
          guarantee of future conduct. To the fullest extent permitted by law,
          the platform is provided "as is", and our total liability to you for
          any claim arising out of the platform is limited to the fees you paid
          us for the engagement giving rise to the claim. Nothing in these terms
          excludes liability that cannot be excluded by law.
        </p>
      </section>

      <section>
        <h2>9. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Material changes will be
          announced on the platform or by email before they take effect.
          Continuing to use the platform after a change takes effect means you
          accept the updated terms.
        </p>
      </section>

      <section>
        <h2>10. Governing law and contact</h2>
        <p>
          These terms are governed by the laws of the Federal Republic of
          Nigeria, and the courts of Nigeria have jurisdiction over disputes
          arising from them. Questions about these terms:{" "}
          <a
            href="mailto:support@hayadrivers.com"
            className="text-brand underline underline-offset-2"
          >
            support@hayadrivers.com
          </a>
          . See also our{" "}
          <Link
            href="/privacy"
            className="text-brand underline underline-offset-2"
          >
            privacy policy
          </Link>
          .
        </p>
      </section>
    </LegalShell>
  );
}
