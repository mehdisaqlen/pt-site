"use client";

import styles from "@/styles/components/solutions.module.scss";
import { ArrowRight } from "lucide-react";
import { BiCode, BiPlay, BiCheckShield, BiGlobe } from "react-icons/bi";
import Container from "./Container";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Label from "./Label";
import Link from "next/link";

const SOLUTIONS = [
  {
    icon: <BiCode />,
    title: "Header Bidding Wrapper",
    desc: "Plug into a custom, lightweight Prebid wrapper built for higher yield and faster auctions.",
    cta: "Explore",
    url: "/solutions#header-bidding",
  },
  {
    icon: <BiPlay />,
    title: "In / Out-Stream Video Ads",
    desc: "Monetize every surface with high-viewability in-content and out-stream video formats.",
    cta: "Explore",
    featured: true,
    url: "/solutions#video-ads",
  },
  {
    icon: <BiCheckShield />,
    title: "IVT Reduction & Compliance",
    desc: "Real-time invalid-traffic control, policy safety, and ad-quality monitoring across all partners.",
    cta: "Explore",
    url: "/solutions#ivt",
  },
  {
    icon: <BiGlobe />,
    title: "Premium Google & Other Demand",
    desc: "Access top-tier MCM demand — AdX, Open Bidding, and premium SSP partners — through PubThrive.",
    cta: "Explore",
    url: "/solutions#demand",
  },
];

export default function Solutions() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.outer}>
          {/* Top label row */}
          <div className={styles.topRow}>
            <Label text=" Explore Solutions" color="#1900ff" />
          </div>

          {/* Grid of solution cards */}
          <div className={styles.grid}>
            {SOLUTIONS.map(({ icon, url, title, desc, cta, featured }, i) => (
              <div
                key={i}
                className={`${styles.col} ${i === 0 ? styles.colFirst : ""} ${
                  i === SOLUTIONS.length - 1 ? styles.colLast : ""
                }`}
              >
                <div className={styles.iconRow}>
                  <span className={styles.iconMark}>{icon}</span>
                </div>

                <div className={`${styles.title} ${tomatoGrotesk.className}`}>
                  {title}
                </div>
                <div className={styles.desc}>{desc}</div>

                {featured ? (
                  <Link href={url} className={styles.ctaInline}>
                    <span>{cta}</span>
                    <ArrowRight className={styles.inlineIcon} />
                  </Link>
                ) : (
                  <Link href={url} className={styles.ctaInline}>
                    <span>{cta}</span>
                    <ArrowRight className={styles.inlineIcon} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
