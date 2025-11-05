"use client";

import styles from "@/styles/components/pulse.module.scss";

type PulseProps = {
  size?: number; // default 20px
  className?: string;
};

export default function Pulse({ size = 20, className }: PulseProps) {
  return (
    <div
      className={`${styles.pulse} ${className || ""}`}
      style={{ width: size, height: size }}
    />
  );
}
