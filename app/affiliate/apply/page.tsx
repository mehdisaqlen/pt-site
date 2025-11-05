"use client";

import styles from "@/styles/pages/affiliate-form.module.scss";
import contact from "@/styles/pages/contact.module.scss";
import Container from "@/app/components/Container";
import AffiliateForm from "@/app/components/AffiliateForm";
import { FiTrendingUp, FiCpu, FiGlobe, FiShield } from "react-icons/fi";
import { FaInfinity } from "react-icons/fa";
import { GeistMono } from "geist/font/mono";
import Label from "@/app/components/Label";
import { CiBank } from "react-icons/ci";
import { BsInfinity } from "react-icons/bs";

export default function AffiliateApplyPage() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.copy}>
            <Label text="Affiliate Program" color="#1900ff" />
            <h1 className={styles.h1}>Earn passive income </h1>
            <p className={styles.sub}>
              Onboard quality publishers with PubThrive and earn growing,
              automated, and transparent commissions.
            </p>
            <ul className={styles.pills}>
              <li>Upto 50% cut</li>
              <li>Automated growth-based tiers</li>
              <li>Multiple payout methods</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className={styles.rewards}>
        <Container>
          <header className={styles.header}>
            <h2 className={styles.rewardsTitle}>Key benefits</h2>
            <div className={styles.rewardCard}>
              <div className={styles.row}>
                <div className={styles.iconWrapper}>
                  <FiTrendingUp className={styles.icon} />
                </div>
                <span>Earn up to 50% as referred publishers grow.</span>
              </div>
              <div className={styles.row}>
                <div className={styles.iconWrapper}>
                  <FiCpu className={styles.icon} />
                </div>
                <span>Commissions scale with revenue, no manual requests.</span>
              </div>
              <div className={styles.row}>
                <div className={styles.iconWrapper}>
                  <BsInfinity className={styles.icon} />
                </div>
                <span>No cap on growth. Bring more, make more.</span>
              </div>
              <div className={styles.row}>
                <div className={styles.iconWrapper}>
                  <CiBank className={styles.icon} />
                </div>
                <span>
                  Multiple payout methods (Wise / bank wire / crypto), net-90
                  cycle.
                </span>
              </div>
            </div>
          </header>
        </Container>
      </section>

      {/* APPLY FORM */}
      <section className={styles.formWrap}>
        <div className={styles.wrapper}>
          <header className={styles.text}>
            <h2 className={styles.title}>Apply now</h2>
            <p className={`${styles.sub} ${GeistMono.className}`}>
              Fast review · Policy-first onboarding
            </p>
          </header>
          <div className={styles.form}>
            <AffiliateForm />
          </div>
        </div>
      </section>
    </main>
  );
}
