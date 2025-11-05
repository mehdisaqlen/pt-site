"use client";

import { GeistMono } from "geist/font/mono";
import Container from "../Container";
import styles from "@/styles/components/service-marquee.module.scss";

const SERVICES: string[] = [
  "Header bidding setup",
  "GAM MCM onboarding",
  "Ad policy & compliance review",
  "Ads.txt & app-ads.txt fixes",
  "IVT monitoring & mitigation",
  "Revenue share modeling",
  "Outstream video integration",
  "Native ads placement",
  "Lazy loading & CLS control",
  "Core Web Vitals consulting",
  "Prebid.js wrapper tuning",
  "CMP & GDPR/CCPA consent",
  "Floor price optimization",
  "Ad refresh rules",
  "Ad density audits",
  "Viewability improvements",
  "Direct deals & PG setup",
  "Private marketplace (PMP)",
  "Bid landscape analysis",
  "Open Bidding configuration",
  "Exchange partner integrations",
  "Creative QA & brand safety",
  "AMP monetization",
  "SPA/Next.js ad routing",
  "Sellers.json & SupplyChain",
  "Geo split testing",
  "Revenue anomaly alerts",
  "Waterfall to header bidding",
  "Native recommendations units",
  "In-article video players",
  "SEO + monetization balance",
  "Adblock recovery options",
  "App & CTV monetization",
  "Audience segmentation",
  "First-party data strategy",
  "Traffic quality checks",
  "Invalid traffic appeals",
  "Monthly revenue reporting",
  "Partner payout reconciliation",
  "Slot mapping & naming",
  "Creative size mapping",
  "Time-to-first-ad optimization",
  "Uplift experiments",
  "Server-side bidding (S2S)",
  "HB analytics dashboard",
  "Publisher training & docs",
  "Programmatic guaranteed",
  "Creative latency audits",
  "Custom events & tracking",
];

type RowSpec = { id: string; reverse?: boolean; speed?: number };

const ROWS: RowSpec[] = [
  { id: "r1", reverse: false, speed: 250 },
  { id: "r2", reverse: true, speed: 250 },
  { id: "r3", reverse: false, speed: 250 },
];

function Row({ reverse = false, speed = 30 }: RowSpec) {
  // Duplicate to create an endless loop
  const list = [...SERVICES, ...SERVICES];

  return (
    <div
      className={`${styles.row} ${reverse ? styles.reverse : ""}`}
      style={{ ["--speed" as any]: `${speed}s` }}
    >
      <div className={styles.fadeLeft} aria-hidden="true" />
      <ul className={styles.track} aria-label="PubThrive services">
        {list.map((label, i) => (
          <li key={`${label}-${i}`} className={styles.item}>
            <span className={`${styles.chip} `}>{label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.fadeRight} aria-hidden="true" />
    </div>
  );
}

export default function ServicesMarquee() {
  return (
    <section className={styles.servicesMarquee}>
      <Container>
        <div className={styles.container}>
          <div className={styles.rows}>
            {ROWS.map((r) => (
              <Row key={r.id} {...r} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
