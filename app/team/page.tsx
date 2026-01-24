// app/team/page.tsx
import styles from "@/styles/pages/team.module.scss";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import { GeistMono } from "geist/font/mono";
import Container from "../components/Container";
import CTA from "../components/CTA";
import Pulse from "../components/Pulse";
import type { Metadata } from "next";
import TeamScroller, { type TeamMember } from "../components/TeamScroller";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the people behind PubThrive — a passionate team of ad-tech experts, engineers, and strategists dedicated to helping publishers grow sustainably.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Our Team | PubThrive",
    description:
      "Get to know the PubThrive leadership and specialists driving smarter monetization, data innovation, and partner success.",
    url: "https://pubthrive.com/team",
    type: "profile",
    siteName: "PubThrive",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | PubThrive",
    description:
      "Meet the PubThrive experts behind innovative monetization solutions for publishers worldwide.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Team() {
  const team: TeamMember[] = [
    {
      name: "Saqlen Mehdi",
      title: "CEO & CTO",
      img: "/images/team/saqlen-2.jpg",
      email: "saqlen@pubthrive.com",
      linkedin: "https://linkedin.com/in/mehdisaqlen",
    },
    {
      name: "Arslan Mehdi",
      title: "Co-Founder, Co-CEO",
      img: "/images/team/arslan.jpg",
      email: "arslan@pubthrive.com",
      linkedin: "https://linkedin.com/in/mehdiarslan",
    },
    {
      name: "Salman Mehdi",
      title: "CFO",
      img: "/images/team/salman-2.jpg",
      email: "salman@pubthrive.com",
      linkedin: "https://linkedin.com/in/mehdisalman",
    },
    {
      name: "Arman Rajput",
      title: "Head of Publisher Growth",
      img: "/images/team/arman.jpg",
      email: "arman@pubthrive.com",
      linkedin: "https://linkedin.com/in/arman",
    },
    {
      name: "Adnan Mehdi",
      title: "AdOps Assistant",
      img: "/images/team/adnan.png",
      email: "adnan@pubthrive.com",
      linkedin: "https://linkedin.com/in/mehdi-adnan",
    },
  ];

  return (
    <main className={styles.page}>
      {/* ================= TEAM SECTION ================= */}
      <section className={styles.teamSection}>
        <Container>
          <section className={styles.hero}>
            <header className={styles.teamHeader}>
              <div className={styles.kickerRow}>
                <center>
                  <Pulse size={8} />
                </center>
                <span className={`${styles.kickerText} ${GeistMono.className}`}>
                  Our Teams
                </span>
              </div>

              <h1
                className={`${styles.teamTitleMain} ${tomatoGrotesk.className}`}
              >
                The Minds Behind the Momentum
              </h1>

              <p className={styles.teamSub}>
                A collective of innovators, strategists, and creators driving
                publisher success every single day.
              </p>
            </header>
          </section>
        </Container>

        <Container>
          <div className={styles.teamShell}>
            {/* Scroller is now a Client Component */}
            <TeamScroller team={team} />
          </div>
        </Container>
      </section>

      {/* ================= CONTACT / CTA SECTION ================= */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaShell}>
            <div className={styles.ctaCopy}>
              <h2
                className={`${styles.ctaHeadline} ${tomatoGrotesk.className}`}
              >
                Work with PubThrive
              </h2>
              <p className={styles.ctaSub}>
                If you’re a publisher who wants higher eCPM without wrecking
                user experience — or you’re a demand partner who cares about
                quality inventory — let’s talk.
              </p>

              <div className={styles.ctaStatsRow}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>100%+</div>
                  <div className={styles.statLabel}>
                    avg. viewable video fill on launch
                  </div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>0 drama</div>
                  <div className={styles.statLabel}>
                    policy + IVT handled for you
                  </div>
                </div>
              </div>

              <div className={styles.contactInfo}>
                <div className={styles.contactLine}>
                  <span className={styles.contactLabel}>Email</span>
                  <a
                    href="mailto:contact@pubthrive.com"
                    className={styles.contactValue}
                  >
                    contact@pubthrive.com
                  </a>
                </div>
                <div className={styles.contactLine}>
                  <span className={styles.contactLabel}>Phone</span>
                  <a href="tel:+15179713092" className={styles.contactValue}>
                    +1 (517) 971-3092
                  </a>
                </div>
                <div className={styles.contactLine}>
                  <span className={styles.contactLabel}>Address</span>
                  <div className={styles.contactValue}>
                    405 W. Greenlawn Ave. #G11 Lansing, MI, USA
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.ctaSideCard}>
              <div className={styles.sideCardInner}>
                <div className={styles.sideStatLabel}>What we do</div>
                <div className={styles.sideStatBig}>
                  Monetization that respects your audience.
                </div>
                <div className={styles.sideStatNote}>
                  Header bidding, premium demand, video inventory, IVT defense —
                  fully managed for stable, compounding revenue.
                </div>
              </div>
            </div>
          </div>
        </Container>
        <CTA
          headline="Unlock premium Google Ad Exchange demand and earn more"
          leftLabel="Monetize your Website"
          rightLabel="Explore Solutions"
          leftHref="/contact"
          rightHref="/solutions"
        />
      </section>
    </main>
  );
}
