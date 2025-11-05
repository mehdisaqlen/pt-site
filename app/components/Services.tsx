"use client";

import styles from "@/styles/components/services.module.scss";
import { Zap, TrendingUp, BarChart3, Globe2 } from "lucide-react";
import Container from "./Container";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Label from "./Label";

const features = [
  {
    icon: <Zap />,
    title: "Power That Pays",
    text: "PubThrive lifts your eCPM, boosts viewability, and gives you clear insights—so every impression counts.",
  },
  {
    icon: <TrendingUp />,
    title: "The PubThrive Edge",
    text: "Higher returns, stronger visibility, and transparent results built for publishers worldwide.",
  },
  {
    icon: <BarChart3 />,
    title: "Grow With Confidence",
    text: "From better fill to clearer reporting, PubThrive helps your ads perform at their best.",
  },
  {
    icon: <Globe2 />,
    title: "Premium Demand Network",
    text: "Fast reporting, global demand, and smarter delivery designed to grow publisher earnings.",
  },
];

export default function Services() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <Label text="Scale your business" color="#1900ff" />
          <div className={styles.intro}>
            <h2 className={`${styles.heading} ${tomatoGrotesk.className}`}>
              Building the future of website monetization
            </h2>
            <p className={`${styles.sub} ${tomatoGrotesk.className}`}>
              From setup to success, PubThrive helps publishers unlock higher
              earnings, stronger visibility, and faster performance.
            </p>
          </div>
          <div className={styles.gridWrapper}>
            {features.map(({ icon, title, text }) => (
              <div key={title} className={styles.gridItem}>
                <div className={styles.iconWrap}>{icon}</div>
                <h3
                  className={`${styles.itemTitle} ${tomatoGrotesk.className}`}
                >
                  {title}
                </h3>
                <p className={styles.itemText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
