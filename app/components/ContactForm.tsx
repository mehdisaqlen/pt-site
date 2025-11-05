"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/pages/contact.module.scss";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { GoPeople, GoPerson } from "react-icons/go";
import CountrySelect from "./CountrySelect";

type Role = "Individual" | "Agency";
const REVENUE_OPTIONS = [
  "$0",
  "$1k – $5k USD / month",
  "$5k – $10k USD / month",
  "$10k – $30k USD / month",
  "$30k – $50k USD / month",
  "Over $50k USD / month",
] as const;

const schema = z
  .object({
    role: z.enum(["Individual", "Agency"]),
    name: z.string().min(2, "Required"),
    email: z.string().email("Enter a valid email"),
    company: z.string().optional(),
    monthlyRevenue: z.string().optional(),
    country: z.string().min(1, "Required"),
    website: z.string().url("Enter a valid URL"),
    phone: z.string().min(6, "Required"),
    message: z.string().min(5, "Required"),
    consent: z.boolean().refine((v) => v === true, { message: "Required" }),
  })
  .superRefine((v, ctx) => {
    if (v.role === "Individual") {
      if (!v.company)
        ctx.addIssue({
          code: "custom",
          path: ["company"],
          message: "Required",
        });
      if (!v.monthlyRevenue)
        ctx.addIssue({
          code: "custom",
          path: ["monthlyRevenue"],
          message: "Required",
        });
    }
  });

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "Individual",
      name: "",
      email: "",
      company: "",
      monthlyRevenue: "",
      country: "",
      website: "",
      phone: "",
      message: "",
      consent: false,
    },
    mode: "onSubmit",
  });

  const role = watch("role");
  const [toast, setToast] = useState<{
    type: "ok" | "err";
    msg: string;
  } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const onSubmit = async (data: FormValues) => {
    try {
      const fd = new FormData();
      (Object.keys(data) as (keyof FormValues)[]).forEach((k) => {
        const v = data[k];
        fd.set(k, typeof v === "boolean" ? (v ? "on" : "") : v ?? "");
      });
      if (data.role === "Agency") fd.delete("company");

      const r = await fetch("/api/contact", { method: "POST", body: fd });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "Failed");
      reset({
        ...data,
        company: "",
        monthlyRevenue: "",
        country: "",
        message: "",
        consent: false,
      });
      setToast({ type: "ok", msg: "Message sent successfully!" });
    } catch {
      setToast({ type: "err", msg: "Failed to send. Please try again." });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Role (side-by-side cards) */}
      <div className={styles.roleGrid}>
        {(["Individual", "Agency"] as Role[]).map((r) => (
          <label
            key={r}
            className={`${styles.roleCard} ${
              watch("role") === r ? styles.selected : ""
            }`}
          >
            <input type="radio" value={r} {...register("role")} />
            <div className={styles.roleIcon}>
              {r === "Individual" ? <GoPerson /> : <GoPeople />}
            </div>
            <div className={styles.roleText}>
              <div className={styles.roleTitle}>
                {r === "Individual"
                  ? "I’m an individual publisher"
                  : "I’m an agency"}
              </div>
              <div className={styles.roleSub}>
                {r === "Individual"
                  ? "Automate monetization and growth."
                  : "Multi-site workflows."}
              </div>
            </div>
            <span className={styles.tick} />
          </label>
        ))}
      </div>

      {/* Two-column compact grid */}
      <div className={styles.formGrid}>
        <div className={`${styles.field} ${styles.two}`}>
          <label htmlFor="name">
            Your name <span className={styles.reqStar}>*</span>
          </label>
          <input
            id="name"
            {...register("name")}
            className={errors.name ? styles.invalid : ""}
          />
          {isSubmitted && errors.name && (
            <p className={styles.error}>{errors.name.message}</p>
          )}
        </div>

        <div className={`${styles.field} ${styles.two}`}>
          <label htmlFor="email">
            Business email <span className={styles.reqStar}>*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={errors.email ? styles.invalid : ""}
          />
          {isSubmitted && errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        {role === "Individual" && (
          <>
            <div className={`${styles.field} ${styles.two}`}>
              <label htmlFor="company">
                Company <span className={styles.reqStar}>*</span>
              </label>
              <input
                id="company"
                {...register("company")}
                className={errors.company ? styles.invalid : ""}
              />
              {isSubmitted && errors.company && (
                <p className={styles.error}>{errors.company.message}</p>
              )}
            </div>

            <div className={`${styles.field} ${styles.two}`}>
              <label>
                Monthly ad revenue <span className={styles.reqStar}>*</span>
              </label>
              <Controller
                control={control}
                name="monthlyRevenue"
                render={({ field }) => (
                  <>
                    <input type="hidden" {...field} />
                    <RevenueSelect
                      value={field.value || ""}
                      onChange={field.onChange}
                      invalid={!!errors.monthlyRevenue}
                    />
                  </>
                )}
              />
              {isSubmitted && errors.monthlyRevenue && (
                <p className={styles.error}>{errors.monthlyRevenue.message}</p>
              )}
            </div>
          </>
        )}

        <div className={`${styles.field} ${styles.two}`}>
          <label>
            Country <span className={styles.reqStar}>*</span>
          </label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <CountrySelect
                value={field.value || ""}
                onChange={field.onChange}
                required
                name="country"
                invalid={!!errors.country}
              />
            )}
          />
          {isSubmitted && errors.country && (
            <p className={styles.error}>{errors.country.message}</p>
          )}
        </div>

        <div className={`${styles.field} ${styles.two}`}>
          <label htmlFor="website">
            Website <span className={styles.reqStar}>*</span>
          </label>
          <input
            id="website"
            type="url"
            placeholder="https://…"
            {...register("website")}
            className={errors.website ? styles.invalid : ""}
          />
          {isSubmitted && errors.website && (
            <p className={styles.error}>{errors.website.message}</p>
          )}
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="phone">
            Phone / WhatsApp <span className={styles.reqStar}>*</span>
          </label>
          <input
            id="phone"
            {...register("phone")}
            className={errors.phone ? styles.invalid : ""}
          />
          {isSubmitted && errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="message">
            Message <span className={styles.reqStar}>*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            className={errors.message ? styles.invalid : ""}
          />
          {isSubmitted && errors.message && (
            <p className={styles.error}>{errors.message.message}</p>
          )}
        </div>
      </div>

      <label className={styles.inlineCheck}>
        <input type="checkbox" {...register("consent")} />I agree to be
        contacted about this inquiry.
      </label>
      {isSubmitted && errors.consent && (
        <p className={styles.error}>{errors.consent.message}</p>
      )}

      <button type="submit" className={styles.cta} disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </button>

      {toast && (
        <div
          className={`${styles.toast} ${
            toast.type === "ok" ? styles.ok : styles.err
          }`}
        >
          {toast.msg}
        </div>
      )}
    </form>
  );
}

/* minimal custom select for revenue */
function RevenueSelect({
  value,
  onChange,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      )
        setOpen(false);
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
    <div className={styles.selectCustom}>
      <button
        type="button"
        className={`${styles.selectBtn} ${invalid ? styles.invalid : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        ref={btnRef}
      >
        <span>{value || "Select monthly revenue"}</span>
        <FiChevronDown />
      </button>
      {open && (
        <ul className={styles.selectList} role="listbox" ref={listRef}>
          {REVENUE_OPTIONS.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              className={`${styles.selectItem} ${
                value === opt ? styles.active : ""
              }`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
                btnRef.current?.focus();
              }}
            >
              <span>{opt}</span>
              {value === opt && <FiCheck className={styles.checkIcon} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
