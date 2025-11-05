"use client";

import styles from "@/styles/components/payment.module.scss";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import Container from "../components/Container";
import { FaUniversity, FaBitcoin, FaCheckCircle } from "react-icons/fa";
import Label from "./Label";
import { SiWise } from "react-icons/si";

export default function Payout() {
  return (
    <section className={styles.payoutSection}>
      <Container>
        <div className={styles.payoutInner}>
          {/* Header copy */}
          <div className={styles.payoutHeader}>
            <div className={styles.payoutEyebrowRow}>
              <Label text="Get paid, your way" color="#1900ff" />
            </div>

            <h2
              className={`${styles.payoutHeadline} ${tomatoGrotesk.className}`}
            >
              Multiple payout methods.
              <br />
              No weird delays.
            </h2>

            <p className={styles.payoutSub}>
              We pay on time, every month, using the method that actually works
              for you. No “net 90.” No surprise clawbacks. Just clean revenue
              share.
            </p>
          </div>

          {/* Cards row */}
          <div className={styles.payoutGrid}>
            <div className={styles.payoutCard}>
              <div className={styles.cardHead}>
                <div className={styles.cardIcon}>
                  <FaUniversity />
                </div>
                <div className={styles.cardTitle}>Direct bank / wire</div>
              </div>
              <div className={styles.cardDesc}>
                Get paid via traditional bank transfer or international wire, in
                US dollar.
              </div>
            </div>

            <div className={styles.payoutCard}>
              <div className={styles.cardHead}>
                <div className={styles.cardIcon}>
                  <SiWise />
                </div>
                <div className={styles.cardTitle}>Wise</div>
              </div>
              <div className={styles.cardDesc}>
                For smaller teams and international partners, we support Wise
                transfers for low-fee, fast global payouts.
              </div>
            </div>

            <div className={styles.payoutCard}>
              <div className={styles.cardHead}>
                <div className={styles.cardIcon}>
                  <FaBitcoin />
                </div>
                <div className={styles.cardTitle}>Crypto </div>
              </div>
              <div className={styles.cardDesc}>
                Prefer crypto? We can support alternative payout rails for
                qualified partners.
              </div>
            </div>
          </div>

          {/* Footnote / reassurance */}
          <div className={styles.payoutNote}>
            <span className={styles.noteBadge}>
              <FaCheckCircle />
            </span>
            <span className={styles.noteText}>
              Complete payout transparency — verified earnings, visible
              deductions.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
