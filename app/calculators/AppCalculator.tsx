"use client";

import { useState } from "react";
import styles from "./revenue-calculators.module.scss";

const REGIONS = {
  "Tier 1 (US, UK, CA)": 1.3,
  "Tier 2 (EU, AUS)": 1.0,
  "Tier 3 (Asia, Africa)": 0.7,
};

export default function AppCalculator() {
  const [impressions, setImpressions] = useState(1000000);

  const [region, setRegion] = useState("Tier 1 (US, UK, CA)");

  const [ecpm, setEcpm] = useState(2.5);
  const [boost, setBoost] = useState(50);

  const multiplier = REGIONS[region as keyof typeof REGIONS];

  const admobMonthly = (impressions / 1000) * ecpm * multiplier;

  const adxMonthly = admobMonthly * (1 + boost / 100);

  return (
    <section className={styles.calculator}>
      <h2>App Revenue Calculator</h2>
      <p>AdMob vs PubThrive AdX</p>

      <div className={styles.layout}>
        {/* LEFT */}
        <div className={styles.controls}>
          <label>Traffic Region</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            {Object.keys(REGIONS).map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <label>Current eCPM ($)</label>
          <input
            type="number"
            value={ecpm}
            onChange={(e) => setEcpm(Number(e.target.value))}
          />

          <label>Monthly Impressions</label>
          <input
            type="range"
            min={100000}
            max={50000000}
            step={100000}
            value={impressions}
            onChange={(e) => setImpressions(Number(e.target.value))}
          />

          <div className={styles.rangeValue}>
            {impressions.toLocaleString()}
          </div>

          <label>AdX Boost (%)</label>
          <input
            type="number"
            value={boost}
            onChange={(e) => setBoost(Number(e.target.value))}
          />
        </div>

        {/* RIGHT */}
        <div className={styles.resultCard}>
          <h3>Your Potential Yearly Earnings</h3>

          <div className={styles.amount}>${(adxMonthly * 12).toFixed(0)}</div>

          <div className={styles.compare}>
            <span>AdMob: ${(admobMonthly * 12).toFixed(0)}</span>
            <span>With AdX: ${(adxMonthly * 12).toFixed(0)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
