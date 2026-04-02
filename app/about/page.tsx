import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About William Armstrong - Solutions Engineer & Entrepreneur",
  description:
    "William Armstrong: Solutions Engineer bridging product, engineering, and business—automation, integrations, and systems thinking. Boston College, entrepreneur, and builder with a bias toward shipping.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <StructuredData type="profile" />
      <AboutClient />
    </>
  );
}