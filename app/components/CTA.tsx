"use client";

import styles from "@/styles/components/cta.module.scss";
import Container from "./Container";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Link from "next/link";

type CtaSectionProps = {
  headline: string;
  leftLabel: string;
  rightLabel: string;
  leftHref: string;
  rightHref: string;
  className?: string;
};

export default function CTA({
  headline,
  leftLabel,
  rightLabel,
  leftHref,
  rightHref,
  className,
}: CtaSectionProps) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <Container>
        <div className={styles.inner}>
          <h2 className={`${styles.headline} ${tomatoGrotesk.className}`}>
            {headline}
          </h2>

          <div className={styles.ctaBar}>
            <Link href={leftHref} className={styles.ctaButtonLeft}>
              <span>{leftLabel} →</span>
            </Link>

            <Link href={rightHref} className={styles.ctaButtonRight}>
              <span>{rightLabel} →</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
