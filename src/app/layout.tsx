import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PromoBanner from "@/components/layout/PromoBanner";
import OfflineNotice from "@/components/ui/OfflineNotice";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.juniorssupermarket.com"),
  title: {
    default: `${BRAND.name} – ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Junior's Supermarket – The Real Meat People. Fresh meat, produce, and family value at 8 locations across the Rio Grande Valley, TX. EBT/WIC accepted.",
  keywords: [
    "Junior's Supermarket",
    "grocery store",
    "Rio Grande Valley",
    "meat market",
    "EBT accepted",
    "WIC accepted",
    "weekly ad",
    "Texas grocery",
    "Hispanic supermarket",
    "RGV",
    "supermercado",
    "carnicería",
    "carne asada",
    "Valle del Rio Grande",
    "ofertas semanales",
    "Edinburg TX grocery",
    "Pharr TX grocery",
    "San Juan TX grocery",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "https://www.juniorssupermarket.com",
    languages: {
      "en-US": "https://www.juniorssupermarket.com",
      "es-MX": "https://www.juniorssupermarket.com",
      "es-US": "https://www.juniorssupermarket.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.juniorssupermarket.com",
    siteName: BRAND.name,
    title: `${BRAND.name} – ${BRAND.tagline}`,
    description:
      "Fresh meat, produce, and family value at 8 locations across the Rio Grande Valley, TX. EBT/WIC accepted.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Junior's Supermarket – The Real Meat People",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} – ${BRAND.tagline}`,
    description:
      "Fresh meat, produce, and family value at 8 locations across the Rio Grande Valley, TX.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-bg text-fg antialiased">
        <LanguageProvider>
          <OfflineNotice />
          {/* Skip to main content — keyboard / screen-reader nav ✅ */}
          <a
            href="#main-content"
            className="skip-link"
          >
            Skip to main content
          </a>
          <PromoBanner />
          <Header />
          <main id="main-content" className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
          {/* Floating language toggle — bottom-left, all pages */}
          <LanguageToggle variant="floating" />
        </LanguageProvider>
      </body>
    </html>
  );
}
