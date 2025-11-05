// app/GaPageView.tsx
"use client";

import { useEffect, useMemo } from "react";
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

  const pageLocation = useMemo(() => {
    const q = search?.toString();
    return q ? `${pathname}?${q}` : pathname;
  }, [pathname, search]);

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    window.gtag("config", GA_ID, {
      page_path: pathname,
      page_location: pageLocation,
    });
  }, [pathname, pageLocation]);

  return null;
}
