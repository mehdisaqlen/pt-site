"use client";

import styles from "@/styles/components/stats.module.scss";
import Container from "./Container";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Label from "./Label";

// you can edit these numbers/texts only here
const STATS = [
  {
    value: "500+",
    note: "active publisher relationships",
  },
  {
    value: "1.5 billion",
    note: "monthly ad impressions monetized",
  },
  {
    value: "90%",
    note: "viewability rate",
  },
  {
    value: "25+ Geos",
    note: "global demand + fill coverage",
  },
];

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.wrapper}>
          {/* LEFT BLOCK: label + headline */}
          <div className={styles.headerBlock}>
            <Label text="By the numbers" color="#1900ff" />

            <h2 className={`${styles.headline} ${tomatoGrotesk.className}`}>
              Publishers trust PubThrive
              <br />
              to turn inventory into revenue
            </h2>
          </div>

          {/* RIGHT BLOCK: stats grid */}
          <div className={styles.statsGrid}>
            {STATS.map(({ value, note }, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statValue}>{value}</div>
                <div className={styles.statNote}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
