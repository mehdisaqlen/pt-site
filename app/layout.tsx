import type { Metadata } from "next";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            {/* Load GA4 */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            {/* Init */}
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // We’ll send SPA pageviews manually, so disable the auto one:
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
      <body
        className={`${GeistSans.className}`}
        suppressHydrationWarning={true}
      >
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

        {/* SPA page_view events */}
        <GtmPageView />
        {/* SPA pageviews */}
        <GaPageView />
        {children}
        <Footer />
        {/* <Footer2 /> */}
      </body>
    </html>
  );
}
