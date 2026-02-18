import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// Canonical base URL so og:image is always an absolute URL that works when shared (Vercel sets VERCEL_URL)
const baseUrl =
  process.env.VERCEL_URL != null
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? "https://williamarmstrong.vercel.app";
const ogImageUrl = `${baseUrl}/william-armstrong-og.png`;

export const metadata: Metadata = {
  title: "William Armstrong - Product Engineer & Entrepreneur",
  description: "Portfolio of William Armstrong: Product Engineer specializing in human-centered design, entrepreneur, and creative professional building innovative solutions.",
  keywords: ["William Armstrong", "Product Engineer", "Human-Centered Design", "Entrepreneur", "Portfolio"],
  authors: [{ name: "William Armstrong" }],
  creator: "William Armstrong",
  publisher: "William Armstrong",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  manifest: '/manifest.json',
  icons: {
    icon: '/fav1.jpg',
    shortcut: '/fav1.jpg',
    apple: '/fav1.jpg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'William Armstrong',
  },
  openGraph: {
    title: "William Armstrong - Product Engineer & Entrepreneur",
    description: "Portfolio of William Armstrong: Product Engineer specializing in human-centered design, entrepreneur, and creative professional.",
    url: baseUrl,
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "William Armstrong - Product Engineer & Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Armstrong - Product Engineer & Entrepreneur",
    description: "Portfolio of William Armstrong: Product Engineer specializing in human-centered design and innovative solutions.",
    creator: "@williamarmstrong",
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
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
        <StructuredData type="website" />
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}