"use client";

import Link from "next/link";
import styles from "@/styles/components/buttons.module.scss";
import { IconType } from "react-icons";

type CtaRowProps = {
  primaryText: string;
  primaryHref: string;
  secondaryText?: string;
  secondaryHref?: string;
  icon?: IconType;
  showSecondary?: boolean;
  className?: string;
};

export default function Buttons({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  icon: Icon,
  showSecondary = true,
  className,
}: CtaRowProps) {
  return (
    <div className={`${styles.ctaRow} ${className || ""}`}>
      <Link href={primaryHref} className={styles.ctaPrimary}>
        <span>{primaryText}</span>
      </Link>

      {showSecondary && secondaryText && secondaryHref && (
        <Link href={secondaryHref} className={styles.ctaIcon}>
          <span>{secondaryText}</span>
          {Icon && <Icon className={styles.gIcon} />}
        </Link>
      )}
    </div>
  );
}
