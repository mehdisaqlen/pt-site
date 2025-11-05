import styles from "@/styles/pages/privacy.module.scss";
import Container from "@/app/components/Container";
import Label from "@/app/components/Label";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read PubThrive’s Terms and Conditions outlining the rules, obligations, and legal agreements governing the use of our website and services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms and Conditions | PubThrive",
    description:
      "Understand PubThrive’s Terms and Conditions — user responsibilities, service usage policies, and legal guidelines for publishers and partners.",
    url: "https://pubthrive.com/terms",
    type: "article",
    siteName: "PubThrive",
    images: ["/og.jpg"], // replace with your actual OG image
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | PubThrive",
    description:
      "Review PubThrive’s Terms and Conditions for information on service use, partner agreements, and compliance policies.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};
export default function TermsPage() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.copy}>
            <Label text="Legal" color="#1900ff" />
            <h1 className={styles.h1}>Terms and Conditions </h1>
            <p className={styles.sub}>
              By accessing or using PubThrive’s website and services, you agree
              to the following terms and conditions. Please read them carefully
              before using our platform.
            </p>
          </div>
        </Container>
      </section>
      <section className={styles.content}>
        <Container>
          <main>
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>
                These Terms and Conditions (“Terms”) govern your use of the
                website <a href="https://pubthrive.com">pubthrive.com</a> and
                all related services operated by PubThrive LLC (“PubThrive”,
                “we”, “us”, or “our”). By using our website or engaging with our
                services, you acknowledge that you have read, understood, and
                agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2>2. Services Provided</h2>
              <p>
                PubThrive provides digital advertising, publisher monetization,
                affiliate, and analytics solutions. We reserve the right to
                modify, suspend, or discontinue any part of our services at any
                time without prior notice.
              </p>
            </section>

            <section>
              <h2>3. Eligibility</h2>
              <p>
                To use our services, you must be at least 18 years old and
                legally capable of entering into binding contracts. If you
                represent a company or organization, you confirm that you have
                the authority to agree to these Terms on its behalf.
              </p>
            </section>

            <section>
              <h2>4. Account and Publisher Obligations</h2>
              <ul>
                <li>
                  Maintain accurate and up-to-date information during
                  registration or onboarding.
                </li>
                <li>
                  Comply with all applicable laws and advertising policies,
                  including Google Ad Manager and SSP network rules.
                </li>
                <li>
                  Do not engage in fraudulent activities such as invalid traffic
                  (IVT), click manipulation, or policy circumvention.
                </li>
                <li>
                  Keep login credentials confidential and report any
                  unauthorized access immediately.
                </li>
              </ul>
            </section>

            <section>
              <h2>5. Intellectual Property</h2>
              <p>
                All content, trademarks, and materials on this website —
                including the PubThrive logo, brand name, text, graphics, and
                code — are the property of PubThrive LLC or its licensors. You
                may not reproduce, modify, or distribute them without written
                permission.
              </p>
            </section>

            <section>
              <h2>6. Payments and Revenue Share</h2>
              <p>
                Publishers and partners will receive payments as outlined in
                their individual agreements or dashboards. Payments are subject
                to traffic validation, compliance checks, and applicable
                deductions. PubThrive reserves the right to withhold or adjust
                payments in cases of policy violations or fraudulent activity.
              </p>
            </section>

            <section>
              <h2>7. Prohibited Uses</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use our services for illegal or deceptive purposes.</li>
                <li>
                  Interfere with network operations, APIs, or security
                  mechanisms.
                </li>
                <li>
                  Collect or misuse data from other publishers or users without
                  consent.
                </li>
              </ul>
            </section>

            <section>
              <h2>8. Limitation of Liability</h2>
              <p>
                PubThrive is not liable for any indirect, incidental, or
                consequential damages resulting from your use of our website or
                services. All services are provided “as is” without any
                warranties of any kind, express or implied.
              </p>
            </section>

            <section>
              <h2>9. Termination</h2>
              <p>
                We may suspend or terminate your access to our services at any
                time, with or without notice, if you breach these Terms or
                engage in any activity deemed harmful to our network or
                partners.
              </p>
            </section>

            <section>
              <h2>10. Third-Party Links and Services</h2>
              <p>
                Our site may contain links to third-party platforms or services.
                PubThrive is not responsible for the content or privacy
                practices of those external websites. We recommend reviewing
                their respective policies before engaging.
              </p>
            </section>

            <section>
              <h2>11. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless PubThrive LLC, its
                affiliates, and employees from any claims, damages, or expenses
                arising out of your use of our website, breach of these Terms,
                or violation of any law or rights of a third party.
              </p>
            </section>

            <section>
              <h2>12. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the
                laws of the State of Michigan, United States. Any disputes shall
                be resolved in the courts located in Michigan.
              </p>
            </section>

            <section>
              <h2>13. Changes to Terms</h2>
              <p>
                We may revise these Terms periodically. Any updates will be
                posted on this page with the revised “Last Updated” date. Your
                continued use of our website after changes indicates acceptance
                of the revised Terms.
              </p>
              <p>
                <em>Last Updated: November 2025</em>
              </p>
            </section>

            <section>
              <h2 id="contact">12. Contact Us</h2>
              <address>
                <strong>PubThrive LLC</strong>
                405 W. Greenlawn Ave, Lansing, MI 48910, USA
                <br />
                Email:{" "}
                <a href="mailto:contact@pubthrive.com">contact@pubthrive.com</a>
                <br />
                Website:{" "}
                <a href="https://pubthrive.com" rel="noopener">
                  www.pubthrive.com
                </a>
              </address>
            </section>
          </main>
        </Container>
      </section>
    </main>
  );
}
