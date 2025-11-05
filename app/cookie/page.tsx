import styles from "@/styles/pages/privacy.module.scss";
import Container from "@/app/components/Container";
import Label from "@/app/components/Label";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how PubThrive uses cookies and similar technologies to improve your experience, analyze performance, and deliver relevant advertising.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: "Cookie Policy | PubThrive",
    description:
      "Understand PubThrive’s cookie practices, including analytics, preferences, and advertising cookies we use to enhance publisher experiences.",
    url: "https://pubthrive.com/cookie-policy",
    type: "article",
    siteName: "PubThrive",
    images: ["/og.jpg"], // update with your real OG image
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | PubThrive",
    description:
      "Read how PubThrive uses cookies to provide a better, more personalized experience across our platform.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};
export default function CookiePage() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.copy}>
            <Label text="Legal" color="#1900ff" />
            <h1 className={styles.h1}>Cookie Policy</h1>
            <p className={styles.sub}>
              This Cookie Policy explains how PubThrive LLC uses cookies and
              similar technologies to enhance your browsing experience, analyze
              traffic, and personalize content on our website
            </p>
          </div>
        </Container>
      </section>
      <section className={styles.content}>
        <Container>
          <main>
            <section>
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you
                visit a website. They help the site remember your preferences,
                improve performance, and analyze how visitors interact with the
                site.
              </p>
            </section>

            <section>
              <h2>2. How We Use Cookies</h2>
              <p>PubThrive uses cookies to:</p>
              <ul>
                <li>
                  Enable essential website functionality and user sessions
                </li>
                <li>
                  Remember user preferences such as form entries or language
                  settings
                </li>
                <li>
                  Analyze site performance and traffic through analytics tools
                </li>
                <li>Provide personalized content and advertising</li>
              </ul>
            </section>

            <section>
              <h2>3. Types of Cookies We Use</h2>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> Required for website
                  operation (e.g., login sessions, form submissions).
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand
                  visitor behavior and improve site speed and design.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Store your preferences to
                  provide a more personalized experience.
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> Used by our ad partners
                  to display relevant ads and track performance.
                </li>
              </ul>
            </section>

            <section>
              <h2>4. Third-Party Cookies</h2>
              <p>
                We may use third-party services such as Google Analytics, Google
                Ad Manager, or SSP partners that set cookies to collect data for
                analytics and ad personalization. These third parties have their
                own privacy and cookie policies, which we encourage you to
                review.
              </p>
            </section>

            <section>
              <h2>5. Managing Cookie Preferences</h2>
              <p>
                You can manage or delete cookies directly through your browser
                settings. You may also block specific types of cookies through
                our on-site cookie banner when you first visit our website.
              </p>
              <p>
                Disabling certain cookies may affect site functionality or the
                personalization of content.
              </p>
            </section>

            <section>
              <h2>6. Consent</h2>
              <p>
                By continuing to use our website, you consent to the placement
                and use of cookies as described in this policy. You can withdraw
                consent at any time by adjusting your browser settings or cookie
                preferences.
              </p>
            </section>

            <section>
              <h2>7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in technology or legal requirements. The latest version
                will always be available on this page.
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
