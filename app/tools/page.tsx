"use client";

import WebsiteCalculator from "../calculators/WebsiteRevenueCalculator";
import AppCalculator from "../calculators/AppCalculator";
import styles from "../calculators/revenue-calculators.module.scss";

export default function RevenueCalculatorsPage() {
  return (
    <main className={styles.page}>
      <WebsiteCalculator />

      {/* <AppCalculator /> */}
    </main>
  );
}
