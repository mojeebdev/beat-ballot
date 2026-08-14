import type { Metadata } from "next";
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
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
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
