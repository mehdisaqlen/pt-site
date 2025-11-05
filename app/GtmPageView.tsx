// app/GtmPageView.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function GtmPageView() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!GTM_ID) return;
    const url = pathname + (search?.toString() ? `?${search}` : "");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_location: url,
      page_path: pathname,
    });
  }, [pathname, search]);

  return null;
}
