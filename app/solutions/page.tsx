import styles from "@/styles/pages/solutions-page.module.scss";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Container from "../components/Container";
import CTA from "../components/CTA";
import Image from "next/image";
import { BiCode, BiPlay, BiCheckShield, BiGlobe } from "react-icons/bi";
import Buttons from "../components/Buttons";
import { CiCircleCheck } from "react-icons/ci";
import Pulse from "../components/Pulse";
import Label from "../components/Label";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Discover PubThrive’s end-to-end monetization solutions for publishers—display, video, native, and header bidding. Boost revenue with data-driven optimization.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Smarter Ad Solutions for Scalable Growth",
    description:
      "Explore PubThrive’s complete suite of monetization tools—ad optimization, demand partnerships, and yield management for every publisher size.",
    url: "https://pubthrive.com/solutions",
    type: "website",
    siteName: "PubThrive",
    images: ["/og.jpg"], // replace with your real OG image
  },
  twitter: {
    card: "summary_large_image",
    title: "PubThrive Solutions",
    description:
      "Comprehensive monetization solutions—display, native, and video ads optimized for maximum yield.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};
export default function SolutionsPage() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <section className={styles.heroSection}>
        <Container>
          <div className={styles.heroGrid}>
            {/* LEFT COPY */}
            <div className={styles.heroLeft}>
              <div className={styles.heroEyebrowRow}>
                <Pulse size={10} />
                <span className={styles.heroEyebrow}>
                  Built for publishers to thrive
                </span>
              </div>

              <h1
                className={`${styles.heroHeadline} ${tomatoGrotesk.className}`}
              >
                Smarter Ad Solutions for Scalable Growth
              </h1>

              <p className={styles.heroSub}>
                Access premium Google demand through PubThrive’s advanced
                ad-tech solutions.
              </p>

              <Buttons
                primaryText="Monetize your Website"
                primaryHref="/onboarding"
                showSecondary={false}
              />
            </div>

            <div className={styles.imageWrap}>
              <Image
                src="/images/sol-hero.png"
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
      {/* ================= HEADER BIDDING ================= */}
      <section className={styles.sectionAltBg} id="header-bidding">
        <Container>
          <div className={styles.solutionRow}>
            {/* LEFT COPY */}
            <div className={styles.solutionCopy}>
              <div className={styles.labelRow}>
                <Label text="Header Bidding Wrapper" color="#1900ff" />
              </div>

              <h2
                className={`${styles.solutionHeadline} ${tomatoGrotesk.className}`}
              >
                Your wrapper, but smarter
              </h2>

              <p className={styles.solutionLead}>
                We run a lightweight, tuned Prebid wrapper built to compete
                impressions fast, raise floor pressure, and avoid layout junk.
                It’s not “copy/paste a script and hope.” It’s actively managed
                auction logic designed for real publishers — not generic
                template traffic.
              </p>

              <div className={styles.metaNote}>
                <span className={styles.metaIcon}>
                  <CiCircleCheck size={15} />
                </span>
                <span>
                  We tune floors and bidder lineup daily — you don’t wait for
                  “next sprint.”
                </span>
              </div>
            </div>

            {/* RIGHT DETAILS CARD LIST */}
            <div className={styles.detailBlock}>
              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiCode className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>
                    Custom header bidding setup
                  </div>
                  <div className={styles.detailDesc}>
                    Clean integration, fast auctions, no bloated bidder list
                    slowing LCP.
                  </div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiGlobe className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>
                    Tier-one demand sources
                  </div>
                  <div className={styles.detailDesc}>
                    AdX, Open Bidding, and vetted SSPs compete at once instead
                    of one network “taking first look.”
                  </div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiCheckShield className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>
                    Policy-safe configuration
                  </div>
                  <div className={styles.detailDesc}>
                    We keep placements inside policy so you don’t get clipped by
                    platform enforcement.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* ================= VIDEO MONETIZATION ================= */}
      <section className={`${styles.sectionDefaultBg}`} id="video-ads">
        <Container>
          <div className={`${styles.solutionRow} ${styles.solutionRowReverse}`}>
            {/* RIGHT COPY */}
            <div className={styles.solutionCopy}>
              <div className={styles.labelRow}>
                <Label text="Video Ads" color="#1900ff" />
              </div>

              <h2
                className={`${styles.solutionHeadline} ${tomatoGrotesk.className}`}
              >
                High-impact video —
                <br />
                without wrecking UX
              </h2>

              <p className={styles.solutionLead}>
                We unlock video revenue even if you’re not a “video publisher.”
                Clean in-content units and respectful out-stream placements give
                you strong viewability and serious CPM — without blasting users
                with auto-play garbage that tanks session time.
              </p>

              <div className={styles.metaNote}>
                <span className={styles.metaIcon}>
                  <CiCircleCheck size={15} />
                </span>
                <span>
                  We place video where it actually gets seen, not where it
                  annoys.
                </span>
              </div>
            </div>

            {/* LEFT DETAILS */}
            <div className={styles.detailBlock}>
              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiPlay className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>
                    In-stream & in-article
                  </div>
                  <div className={styles.detailDesc}>
                    Native-style units inside content for high viewability.
                  </div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiPlay className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>Out-stream inventory</div>
                  <div className={styles.detailDesc}>
                    Incremental revenue even on pages with no video player at
                    all.
                  </div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiCheckShield className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>Brand-safe delivery</div>
                  <div className={styles.detailDesc}>
                    Demand partners who care about brand safety = better rates
                    and fewer headaches.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* ================= PREMIUM DEMAND / GOOGLE ADX ================= */}
      <section className={styles.sectionAltBg} id="demand">
        <Container>
          <div className={styles.solutionRow}>
            {/* LEFT COPY */}
            <div className={styles.solutionCopy}>
              <div className={styles.labelRow}>
                <Label text="Premium Google AdX Demand" color="#1900ff" />
              </div>

              <h2
                className={`${styles.solutionHeadline} ${tomatoGrotesk.className}`}
              >
                You get the good buyers —
                <br />
                not leftovers
              </h2>

              <p className={styles.solutionLead}>
                We connect you directly into premium demand: Google AdX, Open
                Bidding, and high-quality SSPs. We prioritize partners that pay
                well and clear fast. That means stronger fill and higher eCPM in
                markets where “regular” header bidding usually falls off.
              </p>

              <div className={styles.metaNote}>
                <span className={styles.metaIcon}>
                  <Pulse size={10} />
                </span>
                <span>
                  We route impressions toward the most valuable buyers in
                  real-time.
                </span>
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div className={styles.detailBlock}>
              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiGlobe className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>
                    Global, premium demand
                  </div>
                  <div className={styles.detailDesc}>
                    We bring curated buyers — not “fill from whoever will take
                    it.”
                  </div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiCode className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>
                    Smarter impression routing
                  </div>
                  <div className={styles.detailDesc}>
                    We don’t just show an ad. We try to show the right ad for
                    the most money.
                  </div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiCheckShield className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>
                    MCM / policy coverage
                  </div>
                  <div className={styles.detailDesc}>
                    We protect long-term access, not short-term spikes that get
                    you flagged later.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* ================= IVT / COMPLIANCE ================= */}
      <section className={styles.sectionDefaultBg} id="ivt">
        <Container>
          <div className={`${styles.solutionRow} ${styles.solutionRowReverse}`}>
            {/* RIGHT COPY */}
            <div className={styles.solutionCopy}>
              <div className={styles.labelRow}>
                <Label text="IVT Reduction & Compliance" color="#1900ff" />
              </div>

              <h2
                className={`${styles.solutionHeadline} ${tomatoGrotesk.className}`}
              >
                Protect the money
              </h2>

              <p className={styles.solutionLead}>
                Revenue doesn’t matter if you lose access to demand. We monitor
                invalid traffic, keep placements policy-safe, and flag bad
                patterns before platforms do. It’s reputation insurance,
                automated.
              </p>

              <div className={styles.metaNote}>
                <span className={styles.metaIcon}>
                  <CiCircleCheck size={15} />
                </span>
                <span>
                  If you’ve ever had a demand source cut you off with no warning
                  — this is why we exist.
                </span>
              </div>
            </div>

            {/* LEFT DETAILS */}
            <div className={styles.detailBlock}>
              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiCheckShield className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>IVT & anomaly watch</div>
                  <div className={styles.detailDesc}>
                    We look for risky traffic and fraud-like patterns in near
                    real-time.
                  </div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiCheckShield className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>
                    Policy-first placement
                  </div>
                  <div className={styles.detailDesc}>
                    We keep formats, density, and viewability inside acceptable
                    ranges for top buyers.
                  </div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrap}>
                  <BiGlobe className={styles.detailIcon} />
                </div>
                <div>
                  <div className={styles.detailTitle}>
                    Long-term account health
                  </div>
                  <div className={styles.detailDesc}>
                    We want stable payouts, not “insane CPM today / banned
                    tomorrow.”
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* ================= CTA ================= */}
      <CTA
        headline="Unlock premium Google Ad Exchange demand and earn more"
        leftLabel="Monetize your Website"
        rightLabel="Talk to our Team"
        leftHref="/contact"
        rightHref="/team"
      />
    </main>
  );
}
