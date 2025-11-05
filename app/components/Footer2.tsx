"use client";

import styles from "@/styles/components/footer2.module.scss";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaYoutube, FaBitcoin } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { SiWise } from "react-icons/si";

export default function Footer2() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerInner}>
        {/* TOP GRID */}
        <div className={styles.topRow}>
          {/* Brand / pitch */}
          <div className={styles.brandBlock}>
            <div className={`${styles.brandName} ${tomatoGrotesk.className}`}>
              PubThrive
            </div>

            <div className={styles.brandLine}>
              Revenue optimization for serious publishers.
            </div>

            <div className={styles.paymentBlock}>
              <div className={styles.paymentLabel}>Affiliate payouts via</div>
              <div className={styles.paymentIcons}>
                <div className={styles.paymentIcon}>
                  <BsBank2 />
                  <span>Bank / Wire</span>
                </div>
                <div className={styles.paymentIcon}>
                  <SiWise />
                  <span>Wise</span>
                </div>
                <div className={styles.paymentIcon}>
                  <FaBitcoin />
                  <span>Crypto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className={styles.linksBlock}>
            <div className={styles.linksCol}>
              <div className={styles.linksHead}>Solutions</div>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/solutions" className={styles.linkItem}>
                    Monetization & Demand
                  </Link>
                </li>
                <li>
                  <Link href="/solutions#video" className={styles.linkItem}>
                    Video Ad Formats
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions#compliance"
                    className={styles.linkItem}
                  >
                    IVT & Compliance
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.linksCol}>
              <div className={styles.linksHead}>Resources</div>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/affiliate" className={styles.linkItem}>
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    href="/affiliate#calculator"
                    className={styles.linkItem}
                  >
                    Affiliate Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/ad-formats" className={styles.linkItem}>
                    Ad Formats
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.linksCol}>
              <div className={styles.linksHead}>Get in touch</div>
              <ul className={styles.linkList}>
                <li>
                  <a
                    href="mailto:contact@pubthrive.com"
                    className={styles.linkItem}
                  >
                    contact@pubthrive.com
                  </a>
                </li>
                <li>
                  <a href="tel:+15179713092" className={styles.linkItem}>
                    +1 (517) 971-3092
                  </a>
                </li>
              </ul>

              <div className={styles.addressBlock}>
                <div className={styles.addressLine}>
                  405 W. Greenlawn Ave. #G11
                </div>
                <div className={styles.addressLine}>Lansing, MI, USA</div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className={styles.socialBlock}>
            <div className={styles.socialHead}>Follow</div>
            <div className={styles.socialRow}>
              <a
                href="https://twitter.com/pubthrive"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.linkedin.com/company/pubthrive"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <FaLinkedin />
              </a>

              <a
                href="https://youtube.com/@pubthrive"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottomRow}>
          <div className={styles.legalLeft}>
            <span>© {new Date().getFullYear()} PubThrive LLC</span>
            <span className={styles.dot}>•</span>
            <span>All rights reserved.</span>
          </div>

          <div className={styles.legalRight}>
            <Link href="/terms" className={styles.legalLink}>
              Terms
            </Link>
            <Link href="/privacy" className={styles.legalLink}>
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
