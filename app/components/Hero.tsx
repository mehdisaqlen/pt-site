"use client";

import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import styles from "@/styles/components/hero.module.scss";
import Container from "./Container"; // uses your mainContainer
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Buttons from "./Buttons";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.grid}>
          {/* Left side text */}
          <div className={styles.text}>
            <p className={styles.eyebrow}>
              {/* SCALE AI AGENTS WITH ZAPIER */}
              GROW YOUR BUSINESS WITH PUBTHRIVE
            </p>

            <h1 className={`${styles.title} ${tomatoGrotesk.className}`}>
              The all-in-one monetization platform for publishers
            </h1>

            <p className={`${styles.sub} ${tomatoGrotesk.className}`}>
              Set up smarter monetization in minutes—no tech hurdles, no delays.
              Just revenue.
            </p>

            {/* <div className={styles.ctaRow}>
              <Link
                href="/signup"
                className={`${styles.ctaPrimary} ${tomatoGrotesk.className}`}
              >
                Monetize your Website
              </Link>

              <Link href="/signup/google" className={styles.ctaIcon}>
                <FcGoogle className={styles.gIcon} />
                <span>Explore Solutions</span>
              </Link>
            </div> */}

            <Buttons
              primaryText="Start Monetization"
              primaryHref="/contact"
              secondaryText="Explore Solutions"
              secondaryHref="/solutions"
              icon={BsArrowRight}
            />
          </div>

          {/* Right side image */}
          <div className={styles.imageWrap}>
            <Image
              src="/images/hero-image2.png"
              alt="Hero Illustration"
              width={680}
              height={520}
              priority
              className={styles.image}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
