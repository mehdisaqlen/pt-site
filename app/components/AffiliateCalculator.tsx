"use client";

import styles from "@/styles/pages/affiliate.module.scss";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import { useState } from "react";
import Container from "./Container";
import Label from "./Label";

const TIERS = [
  { label: "Standard", rate: 0.05 }, // 30% of parent revenue
  { label: "Growth", rate: 0.15 }, // 15%
  { label: "Elite (up to)", rate: 0.5 }, // 50%
];

export default function AffiliateCalculator() {
  const [publisherRevenue, setPublisherRevenue] = useState<number>(5000);
  const [parentRevPct, setParentRevPct] = useState<number>(10); // "10" in a 10/90 split

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = Number(raw);
    setPublisherRevenue(isNaN(num) ? 0 : num);
  };

  const handleParentPctChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const num = Number(raw);
    setParentRevPct(isNaN(num) ? 0 : num);
  };

  return (
    <section className={styles.calculatorSection} id="affiliate-calculator">
      <Container>
        <div className={styles.calculatorShell}>
          {/* header row */}
          <div className={styles.calcHeaderRow}>
            <div className={styles.calcHeaderLeft}>
              <div className={styles.labelGroup}>
                <Label text="Affiliate Calculator" color="#1900ff" />
              </div>

              <h2
                className={`${styles.calculatorHeadline} ${tomatoGrotesk.className}`}
              >
                See what your referrals could pay you every month
              </h2>

              <p className={styles.calculatorSub}>
                You earn a percentage of the <strong>parent revenue</strong> —
                not the publisher’s total. Example: in a 10/90 split, 10% is
                parent revenue. We’ll show what your monthly cut looks like at
                different tiers (up to 50%).
              </p>
            </div>

            {/* INPUTS */}
            <div className={styles.calcHeaderRight}>
              <label className={styles.inputLabel}>
                Publisher monthly ad revenue (USD)
              </label>
              <div className={styles.inputWrap}>
                <span className={styles.inputPrefix}>$</span>
                <input
                  className={styles.revenueInput}
                  value={publisherRevenue.toLocaleString("en-US")}
                  onChange={handleRevenueChange}
                  inputMode="numeric"
                />
              </div>
              <div className={styles.inputHint}>
                Example: 5,000 / 20,000 / 100,000+
              </div>

              <label
                className={styles.inputLabel}
                style={{ marginTop: "1rem" }}
              >
                Parent rev share % (ex: 10 in a 10/90 split)
              </label>
              <div className={styles.inputWrap}>
                <input
                  className={styles.revenueInput}
                  value={parentRevPct}
                  onChange={handleParentPctChange}
                  inputMode="decimal"
                />
                <span className={styles.inputSuffix}>%</span>
              </div>
              <div className={styles.inputHint}>
                This is the revenue pool commission comes from.
              </div>
            </div>
          </div>

          {/* results strip */}
          <div className={styles.tiersStripOuter}>
            <div className={styles.tiersStripInner}>
              {TIERS.map(({ label, rate }, i) => {
                // math:
                // parentRevenue = publisherGross * (parentRevPct / 100)
                // affiliateCommission = parentRevenue * rate (up to 50%)
                const parentRevenue = publisherRevenue * (parentRevPct / 100);
                const affiliateCommission = parentRevenue * rate;

                return (
                  <div className={styles.tierCol} key={i}>
                    <div className={styles.tierRateRow}>
                      <div className={styles.tierRateLabel}>{label}</div>
                      <div className={styles.tierRatePct}>
                        {(rate * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className={styles.tierEarnBlock}>
                      <div className={styles.earnHeader}>Your est. payout</div>
                      <div className={styles.earnValue}>
                        ${affiliateCommission.toLocaleString("en-US")}
                        <span className={styles.earnUnit}>/mo</span>
                      </div>
                    </div>

                    <div className={styles.tierNote}>
                      <span className={styles.tierDot}>▣</span>
                      <span>
                        Recurring, as long as that publisher stays active.
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.calcFootNote}>
            * “Up to 50%” means up to 50% of the parent revenue pool (the
            non-publisher share).
          </div>
        </div>
      </Container>
    </section>
  );
}
