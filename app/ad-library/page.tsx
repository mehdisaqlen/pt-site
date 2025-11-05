// app/ad-library/page.tsx
// import type { Metadata } from "next";
"use client";
import Container from "@/app/components/Container";
import styles from "@/styles/pages/ad-library.module.scss";

// export const metadata: Metadata = {
//   title: "Ad Library | PubThrive",
//   description:
//     "Live-style demos of PubThrive ad formats across desktop, article, and mobile frames.",
//   alternates: { canonical: "/ad-library" },
// };

type Card = {
  slug: string;
  name: string;
  dims?: string;
  placement:
    | "Desktop"
    | "Article"
    | "Mobile"
    | "Overlay"
    | "Sidebar"
    | "Grid"
    | "Mixed";
  description: string;
};

const CARDS: Card[] = [
  // DISPLAY
  {
    slug: "billboard",
    name: "Billboard",
    dims: "970×250",
    placement: "Desktop",
    description: "Large brand unit above the fold.",
  },
  {
    slug: "leaderboard",
    name: "Leaderboard",
    dims: "728×90",
    placement: "Desktop",
    description: "Classic top-of-page banner.",
  },
  {
    slug: "mobile-leaderboard",
    name: "Mobile Leaderboard",
    dims: "320×50 / 320×100",
    placement: "Mobile",
    description: "Top/bottom of mobile screens.",
  },
  {
    slug: "mpu",
    name: "MPU / Box",
    dims: "300×250",
    placement: "Sidebar",
    description: "High-fill sidebar or in-article slot.",
  },
  {
    slug: "halfpage",
    name: "Half Page",
    dims: "300×600",
    placement: "Sidebar",
    description: "Tall impact unit in side rails.",
  },
  {
    slug: "skyscraper",
    name: "Skyscraper",
    dims: "160×600",
    placement: "Sidebar",
    description: "Slim tall unit for long pages.",
  },
  {
    slug: "in-article",
    name: "In-Article Display",
    dims: "Flexible",
    placement: "Article",
    description: "Injected between paragraphs.",
  },
  {
    slug: "anchor",
    name: "Bottom Anchor",
    dims: "100% × 60–90px",
    placement: "Mobile",
    description: "Sticky bottom banner on mobile.",
  },

  // NATIVE
  {
    slug: "native-card",
    name: "Native Card",
    dims: "Fluid",
    placement: "Article",
    description: "Image, headline, text, CTA.",
  },
  {
    slug: "native-recs",
    name: "Content Recommendations",
    dims: "Fluid grid",
    placement: "Article",
    description: "Multi-card native grid.",
  },

  // VIDEO
  {
    slug: "outstream-sticky",
    name: "Outstream Video (Sticky Mini)",
    dims: "16:9 (auto)",
    placement: "Article",
    description: "Autoplays in-view, docks bottom-right.",
  },
  {
    slug: "in-article-video",
    name: "In-Article Video",
    dims: "16:9",
    placement: "Article",
    description: "Inline video between paragraphs.",
  },

  // EXPERIENCES
  {
    slug: "interstitial",
    name: "Interstitial",
    dims: "Full screen",
    placement: "Overlay",
    description: "Full-screen takeover on user action.",
  },
  {
    slug: "rewarded",
    name: "Rewarded Prompt",
    dims: "Modal",
    placement: "Overlay",
    description: "Opt-in to watch and unlock content.",
  },

  // LAYOUTS
  {
    slug: "responsive-banner",
    name: "Responsive Banner",
    dims: "Auto sizes",
    placement: "Mixed",
    description: "Fluid width adapting to breakpoints.",
  },
  {
    slug: "multisize-grid",
    name: "Multi-Size Grid",
    dims: "300×250 / 336×280 / 300×600",
    placement: "Grid",
    description: "Accepts multiple sizes in a grid.",
  },
];

const Skel = ({ w = "100%", h = 12 }: { w?: string; h?: number }) => (
  <span className={styles.skel} style={{ width: w, height: h }} />
);

export default function AdLibraryPage() {
  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.hero}>
          <h1 className={styles.title}>Ad Library</h1>
          <p className={styles.sub}>
            Explore PubThrive ad formats in realistic frames. Swap shells with
            your GAM/Prebid tags when integrating.
          </p>
          <ul className={styles.chips}>
            {["Display", "Native", "Video", "Experiences", "Layouts"].map(
              (c) => (
                <li key={c} className={styles.chip}>
                  {c}
                </li>
              )
            )}
          </ul>
        </header>

        <section className={styles.grid}>
          {CARDS.map((c) => (
            <article key={c.slug} className={styles.card} id={c.slug}>
              <div className={styles.cardHead}>
                <div>
                  <h2 className={styles.cardTitle}>{c.name}</h2>
                  <p className={styles.meta}>
                    <strong>Size:</strong> {c.dims ?? "Flexible"}
                    <span className={styles.dot}>•</span>
                    <strong>Placement:</strong> {c.placement}
                  </p>
                </div>
                <span className={styles.tag}>Demo</span>
              </div>

              {/* ---------- DEMOS ---------- */}

              {/* Desktop billboard/leaderboard/responsive header */}
              {(c.slug === "billboard" ||
                c.slug === "leaderboard" ||
                c.slug === "responsive-banner") && (
                <div className={styles.demoOuter}>
                  <div className={styles.desktopFrame}>
                    <div className={styles.desktopHeader}>
                      <div
                        className={`${styles.banner} ${
                          c.slug === "billboard"
                            ? styles.b970x250
                            : styles.lb728x90
                        }`}
                      >
                        <span className={styles.label}>
                          {c.slug === "billboard" ? "970×250" : "728×90"}
                        </span>
                      </div>
                    </div>
                    <div className={styles.desktopBody}>
                      <Skel w="85%" />
                      <Skel w="92%" />
                      <Skel w="70%" />
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile leaderboard and anchor */}
              {(c.slug === "mobile-leaderboard" || c.slug === "anchor") && (
                <div className={styles.demoOuter}>
                  <div className={styles.phoneFrame}>
                    <div className={styles.phoneTop}>
                      {c.slug === "mobile-leaderboard" && (
                        <div className={`${styles.banner} ${styles.mb320x100}`}>
                          <span className={styles.label}>320×100</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.phoneScroll}>
                      {[...Array(7)].map((_, i) => (
                        <Skel key={i} w={`${80 + (i % 3) * 5}%`} />
                      ))}
                    </div>
                    {c.slug === "anchor" && (
                      <div className={styles.anchorBar}>
                        <div
                          className={`${styles.banner} ${styles.anchorUnit}`}
                        >
                          <span className={styles.label}>Anchor</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sidebar units */}
              {(c.slug === "mpu" ||
                c.slug === "halfpage" ||
                c.slug === "skyscraper") && (
                <div className={styles.demoOuter}>
                  <div className={styles.twoCol}>
                    <div className={styles.colArticle}>
                      {[...Array(8)].map((_, i) => (
                        <Skel key={i} w={`${90 - (i % 4) * 8}%`} />
                      ))}
                    </div>
                    <aside className={styles.colRail}>
                      <div
                        className={`${styles.banner} ${
                          c.slug === "mpu"
                            ? styles.box300x250
                            : c.slug === "halfpage"
                            ? styles.box300x600
                            : styles.box160x600
                        }`}
                      >
                        <span className={styles.label}>
                          {c.slug === "mpu"
                            ? "300×250"
                            : c.slug === "halfpage"
                            ? "300×600"
                            : "160×600"}
                        </span>
                      </div>
                    </aside>
                  </div>
                </div>
              )}

              {/* In-article display */}
              {c.slug === "in-article" && (
                <div className={styles.demoOuter}>
                  <div className={styles.articleFrame}>
                    <Skel w="78%" />
                    <Skel w="92%" />
                    <div className={`${styles.banner} ${styles.inArticleUnit}`}>
                      <span className={styles.label}>Display In-Article</span>
                    </div>
                    <Skel w="88%" />
                    <Skel w="60%" />
                  </div>
                </div>
              )}

              {/* Native */}
              {c.slug === "native-card" && (
                <div className={styles.demoOuter}>
                  <div className={styles.nativeCard}>
                    <div className={styles.nativeThumb} />
                    <div className={styles.nativeBody}>
                      <Skel w="30%" h={10} />
                      <Skel w="70%" h={14} />
                      <Skel w="55%" h={12} />
                      <Skel w="22%" h={28} />
                    </div>
                  </div>
                </div>
              )}

              {c.slug === "native-recs" && (
                <div className={styles.demoOuter}>
                  <div className={styles.nativeGrid}>
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={styles.nativeItem}>
                        <div className={styles.nativeThumb} />
                        <Skel w="80%" h={10} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video: outstream sticky mini */}
              {c.slug === "outstream-sticky" && (
                <div className={styles.demoOuter}>
                  <div className={styles.articleViewport}>
                    <div className={styles.articleScroll}>
                      {[...Array(12)].map((_, i) => (
                        <Skel key={i} w={`${85 - (i % 5) * 8}%`} />
                      ))}
                    </div>
                    <div className={styles.stickyMini}>
                      <div className={styles.miniHead}>
                        <Skel w="36%" h={10} />
                        <button className={styles.closeMini} aria-label="Close">
                          ×
                        </button>
                      </div>
                      <div className={styles.miniVideo}>
                        <div className={styles.playIcon} />
                      </div>
                      <div className={`${styles.miniBar} ${styles.shimmer}`} />
                    </div>
                  </div>
                </div>
              )}

              {/* Video: inline */}
              {c.slug === "in-article-video" && (
                <div className={styles.demoOuter}>
                  <div className={styles.articleFrame}>
                    <Skel w="74%" />
                    <div className={styles.videoInline}>
                      <div className={styles.playIcon} />
                    </div>
                    <Skel w="90%" />
                    <Skel w="62%" />
                  </div>
                </div>
              )}

              {/* Experiences */}
              {c.slug === "interstitial" && (
                <div className={styles.demoOuter}>
                  <details className={styles.interstWrap}>
                    <summary className={styles.openBtn}>
                      Open Interstitial
                    </summary>
                    <div
                      className={styles.interstitial}
                      role="dialog"
                      aria-modal="true"
                      aria-label="Interstitial demo"
                    >
                      <div className={styles.interCard}>
                        <Skel w="70%" />
                        <div className={styles.interActions}>
                          <span className={styles.primaryBtn}>
                            <Skel w="90px" h={14} />
                          </span>
                          <span className={styles.ghostBtn}>
                            <Skel w="60px" h={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              )}

              {c.slug === "rewarded" && (
                <div className={styles.demoOuter}>
                  <details className={styles.rewarded}>
                    <summary className={styles.openBtn}>
                      Show Rewarded Prompt
                    </summary>
                    <div className={styles.rewardBody}>
                      <Skel w="50%" />
                      <div
                        className={`${styles.progressBar} ${styles.shimmer}`}
                        aria-label="30s countdown"
                      />
                      <div className={styles.actionsRow}>
                        <span className={styles.primaryBtn}>
                          <Skel w="90px" h={14} />
                        </span>
                        <span className={styles.ghostBtn}>
                          <Skel w="60px" h={14} />
                        </span>
                      </div>
                    </div>
                  </details>
                </div>
              )}

              {/* Layouts */}
              {c.slug === "multisize-grid" && (
                <div className={styles.demoOuter}>
                  <div className={styles.msGrid}>
                    <div className={`${styles.banner} ${styles.box300x250}`}>
                      <span className={styles.label}>300×250</span>
                    </div>
                    <div className={`${styles.banner} ${styles.box336x280}`}>
                      <span className={styles.label}>336×280</span>
                    </div>
                    <div className={`${styles.banner} ${styles.box300x600}`}>
                      <span className={styles.label}>300×600</span>
                    </div>
                    <div className={`${styles.banner} ${styles.box300x250}`}>
                      <span className={styles.label}>300×250</span>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
