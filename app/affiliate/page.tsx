import styles from "@/styles/pages/affiliate.module.scss";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Container from "../components/Container";
import Image from "next/image";
import Pulse from "../components/Pulse";
import CTA from "../components/CTA";
import Label from "../components/Label";
import Buttons from "../components/Buttons";
import Payout from "../components/Payout";
import AffiliateCalculator from "../components/AffiliateCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description:
    "Earn recurring commissions by referring publishers to PubThrive’s all-in-one monetization platform. Simple, transparent, and fast payouts.",
  alternates: { canonical: "/affiliate" },
  openGraph: {
    title: "PubThrive Affiliate Program",
    description:
      "Refer publishers to PubThrive and earn ongoing commissions. Join our partner network today.",
    url: "https://pubthrive.com/affiliate",
    type: "website",
    siteName: "PubThrive",
    images: ["/og.jpg"], // replace with your real OG image path
  },
  twitter: {
    card: "summary_large_image",
    title: "PubThrive Affiliate Program",
    description:
      "Refer publishers to PubThrive and earn ongoing commissions. Join our partner network today.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};
/* BENEFITS DATA */
const BENEFITS = [
  {
    title: "Earn up to 50% recurring",
    desc: "Get paid a share of PubThrive’s revenue from every publisher you refer — month after month. Top partners earn up to 50%.",
    badge: "High-paying program",
  },
  {
    title: "No dev work required",
    desc: "You don’t have to integrate anything yourself. Just introduce the publisher — we handle onboarding, optimization, and compliance.",
    badge: "Low friction",
  },
  {
    title: "Fast, visible results",
    desc: "We lift eCPM, viewability, and fill quickly — so your referrals see real money fast, which means you start earning faster.",
    badge: "Proven outcomes",
  },
  {
    title: "Transparent reporting",
    desc: "You’ll know who’s live, what they’re earning, and what your share is. No mystery screenshots or ‘trust us’ emails.",
    badge: "Full visibility",
  },
];

export default function AffiliatePage() {
  // ... keep rest of component

  return (
    <main className={styles.page}>
      {/* ============ HERO SECTION ============ */}
      <section className={styles.heroSection}>
        <Container>
          <div className={styles.heroGrid}>
            {/* LEFT SIDE CONTENT */}
            <div className={styles.heroLeft}>
              <div className={styles.kickerRow}>
                <Pulse size={10} />

                <span className={styles.kickerText}>Grow with PubThrive</span>
              </div>

              <h1
                className={`${styles.heroHeadline} ${tomatoGrotesk.className}`}
              >
                Earn up to 50% from every publisher you refer
              </h1>

              <p className={styles.heroSub}>
                Bring quality publishers. We handle the monetization. You get a
                serious recurring cut.
              </p>

              <Buttons
                primaryText="Join an Affiliate Program →"
                primaryHref="/affiliate/apply"
                showSecondary={false}
              />
            </div>

            {/* Right side image */}
            <div className={styles.imageWrap}>
              <Image
                src="/images/affiliate-hero.png"
                alt="Affiliates"
                width={680}
                height={520}
                priority
                className={styles.image}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ============ BENEFITS SECTION ============ */}
      <section className={styles.benefitsSection}>
        <Container>
          <div className={styles.benefitsInner}>
            <div className={styles.benefitsHeader}>
              <div className={styles.labelGroup}>
                <Label text="How it works" color="#1900ff" />
              </div>

              <h2
                className={`${styles.benefitsHeadline} ${tomatoGrotesk.className}`}
              >
                A high-trust revenue partnership —
                <br />
                not a one-time bounty grab
              </h2>

              <p className={styles.benefitsSub}>
                We don’t do “get paid once and disappear.” You keep getting paid
                as long as the publisher earns with us. That means we’re equally
                motivated to grow their revenue and keep them live.
              </p>
            </div>

            <div className={styles.benefitsGridWrapper}>
              <div className={styles.benefitsGrid}>
                {BENEFITS.map(({ title, desc, badge }, i) => (
                  <div key={i} className={styles.benefitCol}>
                    <div className={styles.benefitBadge}>{badge}</div>
                    <div className={styles.benefitTitle}>{title}</div>
                    <div className={styles.benefitDesc}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <AffiliateCalculator />
      {/* ============ Payout SECTION ============ */}

      <Payout />
      {/* ============ FINAL CTA SECTION ============ */}
      <section className={styles.finalCTASection}>
        <CTA
          headline="Grow publisher revenue. Earn a serious cut."
          leftLabel="Join the affiliate program"
          rightLabel="Get partnership details"
          leftHref="/affiliate/apply"
          rightHref="/contact"
        />
      </section>
    </main>
  );
}
