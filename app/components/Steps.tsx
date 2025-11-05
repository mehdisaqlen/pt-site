"use client";

import styles from "@/styles/components/steps.module.scss";
import Container from "./Container";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import { GoCheckCircle } from "react-icons/go";
import Label from "./Label";
import Link from "next/link";

const STEPS = [
  {
    num: "01.",
    title: "Onboarding & review",
    desc: "Share your domains and traffic sources. We plug you into premium demand fast.",
    note: "Most partners are live in just 01 hour.",
  },
  {
    num: "02.",
    title: "Optimization & lift",
    desc: "We tune placements, floors, and viewability. You get live reporting, not screenshots.",
    note: "eCPM improvements comes in week one.",
  },
  {
    num: "03.",
    title: "Scale with confidence",
    desc: "We monitor IVT, policy, and fill daily so you focus on content — not ad ops.",
    note: "Stable payouts that keep climbing.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.sectionAlt}>
      <Container>
        <div className={styles.processShell}>
          {/* HEADER ROW WITH LINE */}

          <div className={styles.headerFlexRow}>
            <Label text="How it works" color="#1900ff" />
            <h2
              className={`${styles.processHeadline} ${tomatoGrotesk.className}`}
            >
              Turn traffic into revenue in weeks, not months
            </h2>
          </div>

          {/* INTRO TEXT */}
          {/* <p className={styles.processIntro}>
            PubThrive connects you to demand, fixes placement and viewability,
            and keeps you compliant — so you see real money this quarter, not
            “someday.”
          </p> */}

          {/* STEPS STRIP */}
          <div className={styles.stepsStripOuter}>
            <div className={styles.stepsStripInner}>
              {STEPS.map(({ num, title, desc, note }, idx) => (
                <div key={num} className={styles.stepCol}>
                  <div className={styles.stepNumber}>{num}</div>
                  <div
                    className={`${styles.stepTitle} ${tomatoGrotesk.className}`}
                  >
                    {title}
                  </div>
                  <div className={styles.stepDesc}>{desc}</div>
                  <div className={styles.stepNote}>
                    <span className={styles.noteIcon}>
                      <GoCheckCircle />
                    </span>
                    <span className={styles.noteText}>{note}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER BAR INLINE WITH STRIP */}
            <div className={styles.stepsFooterBar}>
              <div className={styles.footerLeft}>
                <div className={styles.footerCopy}>
                  Trusted by publishers who want
                  <span className={styles.emph}> real performance</span>
                </div>
              </div>

              <Link href="/contact" className={styles.footerCtaBtn}>
                <span>Start Monetization →</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
