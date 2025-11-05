"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "@/styles/components/navbar.module.scss";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Image from "next/image";
import Container from "./Container";

const LINKS = [
  { label: "Solution", href: "/solutions" },
  { label: "Affiliate", href: "/affiliate", badge: "New" },
  { label: "Blog", href: "/blog" },
  // { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 1024 && setOpen(false);
    handleResize();
    window.addEventListener("resize", handleResize);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.bar}>
      <Container>
        <nav className={styles.nav}>
          <Link href="/" className={styles.brand}>
            <Image
              src="/images/logos/pt-logo.svg" // <-- your logo path (adjust as needed)
              alt="PubThrive"
              width={120} // <-- set width only
              height={0} // <-- let height auto-scale
              className={styles.logoImg}
              priority
            />
          </Link>
          <div className={styles.rightSide}>
            <Link
              href="/monetize"
              className={`${styles.ctaMobile} ${tomatoGrotesk.className}`}
            >
              Monetize Now
            </Link>
            <button
              className={styles.burger}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <div className={styles.links}>
            {LINKS.map(({ label, href, badge }) => (
              <Link
                key={label}
                href={href}
                className={`${styles.link} ${tomatoGrotesk.className}`}
              >
                {label}
                {badge && <span className={styles.badge}>{badge}</span>}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className={`${styles.cta} ${tomatoGrotesk.className}`}
          >
            Monetize Now
          </Link>
        </nav>

        <div className={`${styles.drawer} ${open ? styles.open : ""}`}>
          <div className={styles.drawerInner}>
            {LINKS.map(({ label, href, badge }) => (
              <Link
                key={`m-${label}`}
                href={href}
                className={styles.mLink}
                onClick={() => setOpen(false)}
              >
                {label}
                {badge && <span className={styles.mBadge}>{badge}</span>}
              </Link>
            ))}
            <Link
              href="/monetize"
              className={styles.mCta}
              onClick={() => setOpen(false)}
            >
              Monetize Now
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
