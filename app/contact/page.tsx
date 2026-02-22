import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact William Armstrong - Let's Collaborate | Product Engineer & Entrepreneur",
  description:
    "Get in touch with William Armstrong. Discuss opportunities in product engineering, human-centered design, entrepreneurship, or creative collaborations. Available via email, LinkedIn, and GitHub.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
