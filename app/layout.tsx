import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beatballot.space"),
  title: "Beat Ballot — Hit for Hit",
  description:
    "A neutral, fan-led ballot for the Olamide and Davido hit-for-hit conversation.",
  openGraph: {
    title: "Beat Ballot — Hit for Hit",
    description:
      "The songs. The moment. Your ballot. An independent cultural experiment by BlindspotLab.",
    url: "https://beatballot.space",
    siteName: "Beat Ballot",
    locale: "en_NG",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Beat Ballot — Hit for Hit" }],
  },
  twitter: { card: "summary_large_image", title: "Beat Ballot — Hit for Hit", description: "An independent cultural game around the Olamide vs Davido hit-for-hit conversation.", images: ["/opengraph-image"] },
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Beat Ballot",
      url: "https://beatballot.space",
      description: "An independent, fan-led Nigerian music-culture ballot.",
    },
    {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Beat Ballot",
    url: "https://beatballot.space",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web",
    description:
      "An independent, fan-led music ballot centred on Nigerian music culture.",
    creator: {
      "@type": "Person",
      name: "Mojeeb Titilayo",
      jobTitle: "Product Engineer & Strategist",
    },
    publisher: {
      "@type": "Organization",
      name: "BlindspotLab",
    },
    },
  ];

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
