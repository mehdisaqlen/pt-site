import styles from "@/styles/pages/privacy.module.scss";

import Container from "@/app/components/Container";
import Label from "@/app/components/Label";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how PubThrive collects, uses, and protects your personal information. We value your privacy and maintain full transparency in all our data practices.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | PubThrive",
    description:
      "Understand PubThrive’s privacy practices, data usage, and user rights under global compliance standards.",
    url: "https://pubthrive.com/privacy-policy",
    type: "article",
    siteName: "PubThrive",
    images: ["/og.jpg"], // replace with your actual OG image
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | PubThrive",
    description:
      "Review PubThrive’s privacy commitments and how we handle user data with care and compliance.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.copy}>
            <Label text="Legal" color="#1900ff" />
            <h1 className={styles.h1}>Privacy Policy </h1>
            <p className={styles.sub}>
              Your trust means everything to us. At PubThrive, we’re committed
              to protecting your personal information and ensuring transparency
              in how we use data.
            </p>
          </div>
        </Container>
      </section>
      <section className={styles.content}>
        <Container>
          <main id="content">
            <section aria-labelledby="intro">
              <h2 id="intro">1. Introduction</h2>
              <p>
                Welcome to PubThrive LLC (“PubThrive”, “we”, “us”, or “our”).
                This Privacy Policy explains how we collect, use, share, and
                protect your information when you visit our website{" "}
                <a href="https://pubthrive.com" rel="noopener">
                  pubthrive.com
                </a>
                , interact with our services, or partner with us.
              </p>
              <p>
                By using our website or services, you agree to this Privacy
                Policy. If you do not agree, please discontinue use immediately.
              </p>
            </section>

            <section aria-labelledby="info-we-collect">
              <h2 id="info-we-collect">2. Information We Collect</h2>

              <h3>2.a Information You Provide</h3>
              <p>
                We may collect personal details such as your name, email
                address, company name, website URL, and contact number when you:
              </p>
              <ul>
                <li>
                  Fill out forms (e.g., contact, affiliate, or partnership
                  forms)
                </li>
                <li>Subscribe to our newsletter</li>
                <li>Communicate with us via email or chat</li>
              </ul>

              <h3>2.b Automatically Collected Data</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul>
                <li>IP address, browser type, and operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring URLs and device identifiers</li>
                <li>
                  Cookies and analytics data (see “Cookies” section below)
                </li>
              </ul>

              <h3>2.c Publisher and Partner Data</h3>
              <p>
                If you’re a publisher or advertiser using our platform, we may
                collect additional business-related data such as domain
                ownership, payment details, and ad performance metrics for
                compliance and reporting purposes.
              </p>
            </section>

            <section aria-labelledby="how-we-use">
              <h2 id="how-we-use">3. How We Use Your Information</h2>
              <ul>
                <li>Operate and improve our website and services</li>
                <li>
                  Communicate with you regarding inquiries or partnerships
                </li>
                <li>Process affiliate or publisher applications</li>
                <li>Provide personalized recommendations and support</li>
                <li>Analyze site traffic and measure campaign performance</li>
                <li>Ensure compliance with applicable laws and ad policies</li>
              </ul>
              <p>
                <strong>We do not sell</strong> your personal data to third
                parties.
              </p>
            </section>

            <section aria-labelledby="cookies">
              <h2 id="cookies">4. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies (such as pixels and
                local storage) to:
              </p>
              <ul>
                <li>Remember your preferences and login sessions</li>
                <li>Analyze how visitors use our site</li>
                <li>Improve website speed and user experience</li>
              </ul>
              <p>
                You can control cookie preferences through your browser
                settings. Disabling cookies may affect certain features of our
                website.
              </p>
            </section>

            <section aria-labelledby="sharing">
              <h2 id="sharing">5. Data Sharing and Disclosure</h2>
              <p>We may share your data only with:</p>
              <ul>
                <li>
                  <strong>Service providers</strong> who assist us in analytics,
                  email delivery, or hosting
                </li>
                <li>
                  <strong>Advertising partners</strong> for performance tracking
                  (aggregated or anonymized data)
                </li>
                <li>
                  <strong>Regulatory authorities</strong> when required by law
                  or to protect our rights
                </li>
              </ul>
              <p>
                We never share sensitive or personally identifiable data for
                unrelated commercial use.
              </p>
            </section>

            <section aria-labelledby="retention">
              <h2 id="retention">6. Data Retention</h2>
              <p>
                We retain your information only for as long as necessary to
                fulfill the purposes described in this policy, comply with legal
                obligations, or resolve disputes.
              </p>
            </section>

            <section aria-labelledby="security">
              <h2 id="security">7. Data Security</h2>
              <p>
                We implement industry-standard security measures including
                encryption, firewalls, and secure access controls to protect
                your data. However, no method of transmission or storage is 100%
                secure, so we cannot guarantee absolute protection.
              </p>
            </section>

            <section aria-labelledby="rights">
              <h2 id="rights">8. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access, correct, or delete your personal information</li>
                <li>Withdraw consent for data processing</li>
                <li>Object to certain uses of your data</li>
              </ul>
              <p>
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@pubthrive.com">privacy@pubthrive.com</a>
                .
              </p>
            </section>

            <section aria-labelledby="children">
              <h2 id="children">9. Children’s Privacy</h2>
              <p>
                Our website and services are not directed to individuals under
                16 years of age. We do not knowingly collect personal data from
                children.
              </p>
            </section>

            <section aria-labelledby="transfers">
              <h2 id="transfers">10. International Data Transfers</h2>
              <p>
                As a U.S.-registered company with operations in multiple
                regions, we may transfer data internationally. We ensure that
                such transfers comply with applicable data protection laws.
              </p>
            </section>

            <section aria-labelledby="updates">
              <h2 id="updates">11. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. The updated
                version will be posted on this page with a revised “Last
                Updated” date.
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
