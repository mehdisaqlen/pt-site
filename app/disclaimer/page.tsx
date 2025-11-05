import styles from "@/styles/pages/privacy.module.scss";
import Container from "@/app/components/Container";
import Label from "@/app/components/Label";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read PubThrive’s official disclaimer outlining the limitations of liability, accuracy of information, and external links policy.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Disclaimer | PubThrive",
    description:
      "PubThrive’s disclaimer explains content accuracy, external references, and limitation of liability regarding our website and services.",
    url: "https://pubthrive.com/disclaimer",
    type: "article",
    siteName: "PubThrive",
    images: ["/og.jpg"], // update with your actual OG image path
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer | PubThrive",
    description:
      "Understand PubThrive’s disclaimer regarding website content, third-party links, and information accuracy.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};
export default function Disclaimer() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.copy}>
            <Label text="Legal" color="#1900ff" />
            <h1 className={styles.h1}>Disclaimer</h1>
            <p className={styles.sub}>
              This Disclaimer outlines the limitations of liability and
              responsibility for the use of PubThrive’s website, content, and
              related services
            </p>
          </div>
        </Container>
      </section>
      <section className={styles.content}>
        <Container>
          <main>
            <section>
              <h2>1. General Information</h2>
              <p>
                The information provided on{" "}
                <a href="https://pubthrive.com">pubthrive.com</a> (“Website”) is
                for general informational and business purposes only. While we
                strive to keep all content accurate and up to date, PubThrive
                LLC (“PubThrive”, “we”, “us”, or “our”) makes no representations
                or warranties regarding the completeness, reliability, or
                accuracy of any information on the site.
              </p>
            </section>

            <section>
              <h2>2. No Professional or Legal Advice</h2>
              <p>
                The content on our website does not constitute financial, legal,
                or business advice. Visitors should seek independent
                professional counsel before making any decisions based on
                information or materials obtained from PubThrive.
              </p>
            </section>

            <section>
              <h2>3. Earnings and Performance Disclaimer</h2>
              <p>
                All examples, statistics, and performance figures mentioned on
                our website are provided for illustrative purposes only. They do
                not guarantee or imply similar results for any publisher,
                advertiser, or affiliate. Actual revenue and performance
                outcomes depend on multiple factors including website quality,
                traffic sources, ad placement, partner performance, and market
                conditions.
              </p>
              <p>
                PubThrive makes no guarantees regarding income, impressions, or
                revenue growth.
              </p>
            </section>

            <section>
              <h2>4. External Links</h2>
              <p>
                Our website may contain links to external websites or services
                operated by third parties. PubThrive is not responsible for the
                content, accuracy, or privacy practices of any external sites
                linked from our platform. Inclusion of a link does not imply
                endorsement or affiliation.
              </p>
            </section>

            <section>
              <h2>5. Technical and Service Availability</h2>
              <p>
                PubThrive strives to maintain consistent website uptime and
                reliable service; however, we do not guarantee uninterrupted
                access. We are not liable for temporary unavailability due to
                maintenance, technical issues, or network interruptions beyond
                our control.
              </p>
            </section>

            <section>
              <h2>6. Limitation of Liability</h2>
              <p>
                In no event shall PubThrive LLC, its affiliates, employees, or
                partners be liable for any indirect, incidental, consequential,
                or special damages arising from the use of our website, data, or
                services. This includes but is not limited to loss of revenue,
                profits, data, or goodwill, even if advised of the possibility
                of such damages.
              </p>
            </section>

            <section>
              <h2>7. Affiliate and Partner Relationships</h2>
              <p>
                Some of the links or references on our website may relate to our
                advertising or business partners. PubThrive may receive
                compensation or commission through these relationships. However,
                all partnerships are selected based on relevance and service
                quality, not solely financial benefit.
              </p>
            </section>

            <section>
              <h2>8. Changes to This Disclaimer</h2>
              <p>
                PubThrive reserves the right to modify or update this Disclaimer
                at any time. The latest version will always be available on this
                page with the updated effective date below.
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
