import Container from "../components/Container";
import styles from "@/styles/pages/contact.module.scss";
import ContactForm from "../components/ContactForm";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Link from "next/link";
import Pulse from "../components/Pulse";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monetize",
  description:
    "Monetize your website effortlessly with PubThrive’s unified ad-tech stack. Connect premium demand, launch header bidding, and maximize eCPM across display, video, and native formats.",
  alternates: { canonical: "/monetize" },
  openGraph: {
    title: "ss PubThrive",
    description:
      "Boost your revenue with PubThrive’s all-in-one monetization platform — smarter demand, faster setup, and transparent reporting.",
    url: "https://pubthrive.com/monetize",
    type: "website",
    siteName: "PubThrive",
    images: ["/og.jpg"], // replace with your real OG image
  },
  twitter: {
    card: "summary_large_image",
    title: "Monetize with PubThrive",
    description:
      "Start earning more from every impression. Set up smarter monetization with PubThrive in minutes.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};
export default function ContactPage() {
  return (
    <main className={styles.contactPage}>
      <Container>
        <div className={styles.centerWrap}>
          {/* Left column — concise info */}
          <section
            className={styles.cardsGrid}
            aria-labelledby="contact-heading"
          >
            <header className={styles.header}>
              <div className={styles.flexPulse}>
                <Pulse size={10} />
                <span className={styles.GeistMono}>CONTACT OUR TEAM</span>
              </div>

              <h1 id="contact-heading" className={styles.h1}>
                Contact PubThrive for Partnerships & Support
              </h1>
              <p className={styles.subtitle}>
                Reach out and we’ll get in touch within 02 hours.
              </p>
            </header>

            {/* <Link
              className={styles.card}
              href="https://wa.me/+447511227672"
              target="_blank"
              rel="noreferrer"
              style={{
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
              }}
            >
              <div className={styles.inner}>
                <div className={`${styles.cardIcon} ${styles.whatsapp}`}>
                  <FaWhatsapp />
                </div>
                <div className={styles.text}>
                  <p>WhatsApp</p>
                  <p>
                    <span>
                      <small>Perferred for instant replies</small>
                    </span>
                  </p>
                  <span className={styles.cardLink}>+44 7511 227672</span>
                </div>
              </div>
            </Link> */}

            <Link className={styles.card} href="mailto:contact@pubthrive.com">
              <div className={styles.inner}>
                <div className={styles.cardIcon}>
                  <CiMail />
                </div>
                <div className={styles.text}>
                  <p>Email us</p>
                  <span className={`${styles.cardLink} `}>
                    contact@pubthrive.com
                  </span>
                </div>
              </div>
            </Link>
          </section>

          {/* Right column — compact form */}
          <div className={styles.col1}>
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
