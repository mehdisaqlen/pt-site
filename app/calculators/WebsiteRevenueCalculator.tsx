"use client";

import { useState } from "react";
import styles from "./revenue-calculators.module.scss";
import { tomatoGrotesk } from "@/public/fonts/fonts";

const REGIONS = {
  "Tier 1 (US, UK, CA)": 1.2,
  "Tier 2 (EU, AUS)": 1.0,
  "Tier 3 (Asia, Africa)": 0.7,
};

export default function WebsiteCalculator() {
  const [pageviews, setPageviews] = useState(50000);
  const [region, setRegion] = useState("Tier 1 (US, UK, CA)");
  const [cpm, setCpm] = useState(2);

  const multiplier = REGIONS[region as keyof typeof REGIONS];

  /* Gross revenue */
  const gross = (pageviews / 1000) * cpm * multiplier;

  /* Google cuts */
  const adsenseNet = gross * 0.68; // 32% cut
  const adxNet = gross * 0.85; // 15% cut

  const adsenseYear = adsenseNet * 12;
  const adxYear = adxNet * 12;

  return (
    <div>
      <div className={styles.header}>
        <div className="main-container">
          <section
            className={`${styles.calculator} ${tomatoGrotesk.className}`}
          >
            <h2>Estimate Your Website Ad Revenue</h2>
            <p>
              See what you earn with AdSense. Compare it with Google AdX demand.
            </p>

            <div className={styles.layout}>
              {/* LEFT */}
              <div className={styles.controls}>
                <label>Traffic Region</label>

                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {Object.keys(REGIONS).map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>

                <label>Average CPM ($)</label>

                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={cpm}
                  onChange={(e) => setCpm(Number(e.target.value))}
                />

                <label>Monthly Pageviews</label>

                <input
                  type="range"
                  min={10000}
                  max={10000000}
                  step={10000}
                  value={pageviews}
                  onChange={(e) => setPageviews(Number(e.target.value))}
                />

                <div className={styles.rangeValue}>
                  {pageviews.toLocaleString()}
                </div>
              </div>

              {/* RIGHT */}
              <div className={styles.resultCard}>
                <h3>Estimated Yearly Revenue</h3>

                <div className={styles.resultRow}>
                  <span>AdSense</span>
                  <strong>${adsenseYear.toFixed(0)}</strong>
                </div>

                <div className={styles.resultRow}>
                  <span>With AdX</span>
                  <strong className={styles.highlight}>
                    ${adxYear.toFixed(0)}
                  </strong>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="main-container">
        <div>What is thi</div>
      </div>
    </div>
  );
}
