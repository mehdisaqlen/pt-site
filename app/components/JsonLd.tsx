import Script from "next/script";

type Props = { data: Record<string, any> | Record<string, any>[]; id?: string };
export default function JsonLd({ data, id }: Props) {
  return (
    <Script
      id={id || "jsonld"}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
