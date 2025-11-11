"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CountrySelect from "@/app/components/CountrySelect";
import styles from "@/styles/pages/contact.module.scss";
import Link from "next/link";
const schema = z.object({
  name: z.string().min(2, "Required"),
  email: z.email({ message: "Enter a valid email" }).min(1, "Required"),
  company: z.string().min(3, "Required"),
  country: z.string().min(1, "Required"),
  websites: z.string().min(3, "Required"),
  phone: z.string().min(1, "Required"),
  publishersCount: z.string().min(1, "Required"),
  niches: z.string().min(1, "Required"),
  regions: z.string().min(1, "Required"),
  acquisitionNotes: z.string().min(1, "Required"),
  consent: z.boolean().refine((v) => v === true, { message: "Required" }),
});
type FormValues = z.infer<typeof schema>;

export default function AffiliateForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [toast, setToast] = useState<{
    type: "ok" | "err";
    msg: string;
  } | null>(null);
  useEffect(() => {
    if (toast) setTimeout(() => setToast(null), 3000);
  }, [toast]);

  const onSubmit = async (data: FormValues) => {
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) =>
        fd.set(k, typeof v === "boolean" ? (v ? "on" : "") : v ?? "")
      );
      const r = await fetch("/api/affiliate", {
        method: "POST",
        body: fd,
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "Failed");
      reset();
      setToast({ type: "ok", msg: "Application submitted successfully." });
    } catch {
      setToast({ type: "err", msg: "Failed to submit. Try again." });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label>
          Your name <span className={styles.reqStar}>*</span>
        </label>
        <input
          {...register("name")}
          className={errors.name ? styles.invalid : ""}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label>
          Business email <span className={styles.reqStar}>*</span>
        </label>
        <input
          type="email"
          {...register("email")}
          className={errors.email ? styles.invalid : ""}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label>Company</label>
        <input {...register("company")} />
      </div>

      <div className={styles.field}>
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
              required={true}
              invalid={!!errors.country}
            />
          )}
        />
        {errors.country && (
          <p className={styles.error}>{errors.country.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label>
          Website(s) you can bring <span className={styles.reqStar}>*</span>
        </label>
        <input
          placeholder="example.com, site2.com"
          {...register("websites")}
          className={errors.websites ? styles.invalid : ""}
        />
        {errors.websites && (
          <p className={styles.error}>{errors.websites.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label>Phone / WhatsApp</label>
        <input placeholder="+1…" {...register("phone")} />
      </div>

      <div className={styles.field}>
        <label>How many publishers can you onboard?</label>
        <input
          placeholder="e.g., 5–20 in first month"
          {...register("publishersCount")}
        />
      </div>

      <div className={styles.field}>
        <label>Primary niches</label>
        <input
          placeholder="News, Entertainment, Sports…"
          {...register("niches")}
        />
      </div>

      <div className={styles.field}>
        <label>Regions</label>
        <input placeholder="US, EU, MENA, APAC…" {...register("regions")} />
      </div>

      <div className={styles.field}>
        <label>How will you acquire publishers?</label>
        <textarea
          rows={4}
          placeholder="Cold outreach, communities, events…"
          {...register("acquisitionNotes")}
        />
      </div>

      <label className={styles.inlineCheck}>
        <input type="checkbox" {...register("consent")} /> I agree to
        <Link href="/affiliate-terms" style={{ color: "blue" }}>
          PubThrive&apos;s Affiliate Terms.
        </Link>
      </label>
      {errors.consent && (
        <p className={styles.error}>{errors.consent.message}</p>
      )}

      <button type="submit" className={styles.cta} disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit Application →"}
      </button>

      {toast && (
        <div className={`${styles.toast} ${toast.type}`}>{toast.msg}</div>
      )}
    </form>
  );
}
