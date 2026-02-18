import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";

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
  ],
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
        url: "/images/og-default.jpg",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
