import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact William Armstrong - Let's Collaborate | Product Engineer & Entrepreneur",
  description: "Get in touch with William Armstrong. Discuss opportunities in product engineering, human-centered design, entrepreneurship, or creative collaborations. Available via email, LinkedIn, and GitHub.",
  keywords: [
    "William Armstrong",
    "Contact",
    "Product Engineer",
    "Human-Centered Design",
    "Entrepreneur",
    "Collaboration",
    "Email",
    "LinkedIn",
    "GitHub",
    "Boston College",
    "Engineering Opportunities",
    "Creative Collaboration"
  ],
  authors: [{ name: "William Armstrong" }],
  creator: "William Armstrong",
  publisher: "William Armstrong",
  metadataBase: new URL('https://williamarmstrong.dev'),
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact William Armstrong - Let's Build Something Together",
    description: "Connect with William Armstrong for product engineering opportunities, design collaborations, and entrepreneurial ventures. Boston College Human-Centered Engineering graduate.",
    url: "https://williamarmstrong.dev/contact",
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/william-armstrong-og.png",
        width: 1200,
        height: 630,
        alt: "Contact William Armstrong - Product Engineer & Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact William Armstrong - Let's Collaborate",
    description: "Connect with William Armstrong for product engineering, design, and entrepreneurial opportunities.",
    creator: "@williamarmstrong",
    images: ["/william-armstrong-og.png"],
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
  category: "Contact",
};

export default function ContactPage() {
  return <ContactClient />;
}
