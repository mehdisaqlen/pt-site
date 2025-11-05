"use client";
import { GeistMono } from "geist/font/mono";
import styles from "@/styles/components/label.module.scss";

type SectionLabelProps = {
  text: string;
  color?: string; // optional override for bar color
  className?: string;
};

export default function Label({ text, color, className }: SectionLabelProps) {
  return (
    <div className={`${styles.sectionLabel} ${className || ""}`}>
      <span
        className={styles.bar}
        style={color ? { backgroundColor: color } : undefined}
      ></span>
      <span className={GeistMono.className}>{text}</span>
    </div>
  );
}
