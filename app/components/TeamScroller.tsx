// app/team/TeamScroller.tsx
"use client";
import Image from "next/image";
import { useRef } from "react";
import styles from "@/styles/pages/team.module.scss";
import { FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type TeamMember = {
  name: string;
  title: string;
  img: string;
  email: string;
  linkedin: string;
};

export default function TeamScroller({ team }: { team: TeamMember[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dx: number) =>
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <>
      {/* slider row with arrow controls on the right */}
      <div className={styles.sliderHeaderRow}>
        <div className={styles.sliderHeaderSpacer} />
        <div className={styles.arrowControls}>
          <button
            className={styles.arrowButton}
            aria-label="Previous"
            onClick={() => scroll(-400)}
          >
            <ChevronLeft />
          </button>
          <button
            className={styles.arrowButton}
            aria-label="Next"
            onClick={() => scroll(400)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* horizontal scroller of members */}
      <div className={styles.membersScrollerWrapper}>
        <div className={styles.membersScroller} ref={scrollerRef}>
          {team.map((person, i) => (
            <div className={styles.memberCard} key={i}>
              <div className={styles.memberImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={person.img}
                  alt={person.name}
                  width={300}
                  height={500}
                  quality={90}
                  className={styles.memberImage}
                />

                <div className={styles.memberOverlayActions}>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.overlayIcon}
                    aria-label={`${person.name} LinkedIn`}
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={`mailto:${person.email}`}
                    className={styles.overlayIcon}
                    aria-label={`Email ${person.name}`}
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>

              <div className={styles.memberMeta}>
                <div className={styles.memberName}>{person.name}</div>
                <div className={styles.memberTitle}>{person.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
