import styles from "@/styles/pages/about.module.scss";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import { GeistMono } from "geist/font/mono";
import Container from "../components/Container";
import CTA from "../components/CTA";
import Pulse from "../components/Pulse";
import ServicesMarquee from "../components/about/Servies-Marquee";
import Solutions from "../components/Solutions";
import Partners from "../components/Partners";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about PubThrive — our mission, vision, and the people powering publisher growth through smarter monetization and transparent technology.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | PubThrive",
    description:
      "Discover PubThrive’s story, mission, and commitment to empowering publishers with data-driven ad-tech innovation.",
    url: "https://pubthrive.com/about",
    type: "website",
    siteName: "PubThrive",
    images: ["/og.jpg"], // replace with your actual OG image
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | PubThrive",
    description:
      "Get to know the team and values driving PubThrive’s mission to simplify and scale publisher monetization worldwide.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function About() {
  return (
    <main className={styles.page}>
      {/* ================= TEAM SECTION ================= */}
      <section className={styles.teamSection}>
        <Container>
          <section className={styles.hero}>
            <header className={styles.teamHeader}>
              <div className={styles.kickerRow}>
                <center>
                  <Pulse size={8} />
                </center>
                <span className={`${styles.kickerText} ${GeistMono.className}`}>
                  Our Company
                </span>
              </div>

              <h1
                className={`${styles.teamTitleMain} ${tomatoGrotesk.className}`}
              >
                Built for Publishers
              </h1>

              {/* Supporting line */}
              <p className={styles.teamSub}>
                Smarter monetization. Real results. Zero noise.
              </p>
            </header>
          </section>
        </Container>
      </section>

      <Partners />

      {/* ================= CONTACT / CTA SECTION ================= */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaShell}>
            <div className={styles.ctaCopy}>
              <h2
                className={`${styles.ctaHeadline} ${tomatoGrotesk.className}`}
              >
                Our Mission
              </h2>

              <div className={`${styles.ctaSub} `}>
                <p>
                  At PubThrive, we help publishers grow with clarity and
                  confidence. We believe every publisher deserves fair access to
                  the tools, insights, and partnerships that drive real success.
                </p>
                <p>
                  Our goal is to make monetization simple and transparent. We
                  build systems that remove confusion, show the true value of
                  data, and connect publishers directly with trusted demand
                  partners.
                </p>
                <p>
                  We’re here to create an honest and open ad ecosystem where
                  publishers earn what they deserve, advertisers reach real
                  audiences, and the web stays independent.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <ServicesMarquee />
      </section>

      <Solutions />

      <CTA
        headline="Unlock premium Google Ad Exchange demand and earn more"
        leftLabel="Start Onboarding"
        rightLabel="Talk to Our Team"
        leftHref="/contact"
        rightHref="/team"
      />
    </main>
  );
}
