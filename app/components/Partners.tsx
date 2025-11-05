"use client";

import styles from "@/styles/components/partners.module.scss";
import Container from "./Container";
import Image from "next/image";

const LOGOS = [
  { src: "/images/logos/stardomlabs.png", alt: "StardomLabs" },
  { src: "/images/logos/152media.png", alt: "152Media" },
  { src: "/images/logos/360playvid.png", alt: "PlayVid" },
  { src: "/images/logos/triplelift.svg", alt: "Triplelift" },
  { src: "/images/logos/nobeta.jpeg", alt: "Nobeta" },
  { src: "/images/logos/adzone.jpeg", alt: "AdZone" },
  { src: "/images/logos/wortise.png", alt: "Wortise" },
];

// helper: we repeat the logos twice to create the seamless infinite loop
const LOGO_STRIP = [...LOGOS, ...LOGOS];

export default function Partners() {
  return (
    <section className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.headlineBlock}>
            <p className={styles.eyebrow}>
              Trusted by companies our publishers rely on
            </p>
          </div>

          {/* marquee / scroller */}
          <div className={styles.scrollerMask}>
            <ul className={styles.scrollerTrack}>
              {LOGO_STRIP.map((logo, i) => (
                <li className={styles.logoItem} key={i}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200} // placeholder to satisfy Next.js
                    height={100} // any reasonable values are fine
                    className={styles.logoImg}
                    draggable={false}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
