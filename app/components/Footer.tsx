// app/components/Footer.tsx
"use client";

import styles from "@/styles/components/footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import { BsLinkedin, BsFacebook, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import Container from "./Container";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.topRow}>
            {/* Left column: Logo + contact info */}
            <div className={styles.brandBlock}>
              <div className={styles.logoWrap}>
                <Image
                  src="/images/logos/pt-logo.svg"
                  width={120}
                  height={0}
                  alt="PT Logo"
                  priority
                  style={{ width: "150px", height: "auto" }}
                  className={styles.logo}
                />
              </div>
              <address className={`${styles.contact}`}>
                <span>405 W. Greenlawn Ave. #G11</span>{" "}
                <span> Lansing, MI, USA</span>
                <a href="mailto:contact@pubthrive.com">
                  <BiLogoGmail /> contact@pubthrive.com
                </a>
                <a href="http://wa.me/923093797625">
                  <BsWhatsapp /> +1 (517) 971-3092
                </a>
              </address>
            </div>

            {/* Footer Navigation */}
            <nav className={styles.links} aria-label="Footer">
              <div className={styles.col}>
                <h4 className={`${styles.colTitle} ${tomatoGrotesk.className}`}>
                  Publishers
                </h4>
                <ul>
                  <li>
                    <Link href="/solutions#header-bidding">Header Bidding</Link>
                  </li>
                  <li>
                    <Link href="/solutions#video-ads">Video Ads</Link>
                  </li>
                  <li>
                    <Link href="/solutions#ivt">IVT Reduction</Link>
                  </li>
                  <li>
                    <Link href="/solutions#demand">Premium AdX Demand</Link>
                  </li>
                  <li>
                    <Link href="/ad-library">Ad Formats</Link>
                  </li>
                  <li>
                    <Link href="/affiliate#affiliate-calculator">
                      Affiliate Calculator
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={styles.col}>
                <h4 className={`${styles.colTitle} ${tomatoGrotesk.className}`}>
                  Company
                </h4>
                <ul>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link href="/team">Team</Link>
                  </li>
                  <li>
                    <Link href="/affiliate">
                      Affiliate <small className={styles.badge}>NEW</small>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>

              <div className={styles.col}>
                <h4 className={`${styles.colTitle} ${tomatoGrotesk.className}`}>
                  Legal
                </h4>
                <ul>
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms</Link>
                  </li>
                  <li>
                    <Link href="/cookie">Cookies Policy</Link>
                  </li>
                  <li>
                    <Link href="/disclaimer">Disclaimer</Link>
                  </li>
                  <li>
                    <Link href="/affiliate-terms">Affiliate Terms</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <hr className={styles.divider} />

          <div className={styles.bottomRow}>
            <p className={styles.copy}>
              ©{year} PubThrive LLC — All rights reserved
            </p>

            <ul className={styles.social} role="list" aria-label="Social media">
              <li>
                <a
                  href="https://www.linkedin.com/company/pubthrive"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsLinkedin />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/pubthrive"
                  aria-label="X (Twitter)"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsTwitterX />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/thepubthrive"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsFacebook />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
