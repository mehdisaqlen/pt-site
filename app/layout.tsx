// app/layout.tsx
import type { Metadata } from "next";
import { Suspense } from "react"; // <-- add this
import JsonLd from "./components/JsonLd";
import { websiteLd, organizationLd } from "@/lib/jsonld";
import { GeistSans } from "geist/font/sans";
import "@/styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";
import GtmPageView from "./GtmPageView";
import GaPageView from "./GaPageView";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;

export const metadata: Metadata = {
  metadataBase: new URL("https://pubthrive.com"),
  title: {
    template: "%s | PubThrive",
    default: "The all-in-one monetization platform for publishers | PubThrive",
  },
  description:
    "PubThrive helps publishers scale revenue with intelligent monetization.",
  openGraph: {
    type: "website",
    url: "https://pubthrive.com",
    siteName: "PubThrive",
    images: ["/og.jpg"],
    title: "PubThrive | The all-in-one monetization platform for publishers",
    description: "Helping publishers grow sustainably.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PubThrive | The all-in-one monetization platform for publishers",
    description: "Helping publishers grow sustainably.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "https://pubthrive.com/rss.xml",
      "application/atom+xml": "https://pubthrive.com/atom.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            {/* GA4 loader */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            {/* GA init (no auto page_view) */}
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        )}

        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0], j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:''; j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </head>
      <body className={GeistSans.className} suppressHydrationWarning>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <Navbar />
        <JsonLd id="ld-website" data={websiteLd()} />
        <JsonLd id="ld-org" data={organizationLd()} />

        {/* Wrap client analytics that use useSearchParams/usePathname in Suspense */}
        <Suspense fallback={null}>{GTM_ID ? <GtmPageView /> : null}</Suspense>
        <Suspense fallback={null}>{GA_ID ? <GaPageView /> : null}</Suspense>

        {children}
        <Footer />
      </body>
    </html>
  );
}
