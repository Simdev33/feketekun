import type { Metadata, Viewport } from "next";
import { Alegreya, Cinzel, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { CursorGlow, MobileCallBar, ScrollProgress } from "@/components/Chrome";
import { site } from "@/lib/site";

const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin", "latin-ext"], weight: ["700", "800", "900"] });
const alegreya = Alegreya({ variable: "--font-alegreya", subsets: ["latin", "latin-ext"], style: ["normal", "italic"] });
const inter = Inter_Tight({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });

const description =
  "Kézműves hamburgerek, kemencében sült pizza, gyros tál és ropogós Kentucky csirke Karcagon, a Deák körúton. Rendelés: 06 20 997 4589, kiszállítás 19:30-ig.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — kézműves burger, pizza, gyros | Karcag`, template: `%s | ${site.name}` },
  description,
  openGraph: { title: site.name, description, locale: "hu_HU", type: "website", siteName: site.name },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#070505" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  servesCuisine: ["Hamburger", "Pizza", "Gyros"],
  telephone: "+36209974589",
  address: { "@type": "PostalAddress", streetAddress: "Deák Ferenc krt. 78.", addressLocality: "Karcag", addressCountry: "HU" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "20:00" },
  ],
  sameAs: [site.facebook],
  url: site.url,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hu" className={`${cinzel.variable} ${alegreya.variable} ${inter.variable} antialiased`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <CursorGlow />
          {children}
          <MobileCallBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
