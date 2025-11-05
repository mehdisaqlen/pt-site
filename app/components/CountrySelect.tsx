"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/styles/pages/contact.module.scss";
import countriesRaw from "world-countries";
import { FiChevronDown, FiSearch, FiCheck } from "react-icons/fi";
import ReactCountryFlag from "react-country-flag";

type Option = { name: string; code: string };

const ALL: Option[] = countriesRaw
  .map((c) => ({
    name: c.name.common,
    code: (c.cca2 || "").toUpperCase(), // e.g., "US", "PK"
  }))
  .filter((c) => /^[A-Z]{2}$/.test(c.code))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function CountrySelect({
  value,
  onChange,
  placeholder = "Select country",
  required,
  name = "country",
  invalid,
}: {
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => ALL.find((c) => c.name === value || c.code === value),
    [value]
  );

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ALL;
    return ALL.filter(
      (c) => c.name.toLowerCase().includes(s) || c.code.toLowerCase() === s
    );
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !popRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className={styles.country}>
      {/* store final country name for API */}
      <input type="hidden" name={name} value={selected?.name || ""} />

      <button
        type="button"
        className={`${styles.countryBtn} ${invalid ? styles.invalid : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        ref={btnRef}
      >
        {selected ? (
          <span className={styles.countryVal}>
            <ReactCountryFlag
              svg
              countryCode={selected.code}
              className={styles.flagSvg}
              title={selected.name}
            />
            {selected.name}
          </span>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <FiChevronDown />
      </button>

      {required && <span className={styles.reqPill}>Required</span>}

      {open && (
        <div className={styles.countryPopover} ref={popRef}>
          <div className={styles.searchRow}>
            <FiSearch />
            <input
              autoFocus
              placeholder="Search countries…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <ul className={styles.countryList} role="listbox">
            {list.map((c) => {
              const isSel = c.name === selected?.name;
              return (
                <li
                  key={c.code}
                  role="option"
                  aria-selected={isSel}
                  className={`${styles.countryItem} ${
                    isSel ? styles.active : ""
                  }`}
                  onClick={() => {
                    onChange(c.name); // we store name for API
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                >
                  <div className={styles.countryVal}>
                    <ReactCountryFlag
                      svg
                      countryCode={c.code}
                      className={styles.flagSvg}
                      title={c.name}
                    />
                    <span className={styles.name}>{c.name}</span>
                  </div>
                  {isSel && <FiCheck className={styles.checkIcon} />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
