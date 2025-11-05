// app/GaPageView.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GaPageView() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    const url = pathname + (search?.toString() ? `?${search}` : "");
    window.gtag("config", GA_ID, {
      page_path: pathname,
      page_location: url,
    });
  }, [pathname, search]);

  return null;
}
