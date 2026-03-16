import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About William Armstrong - GTM Engineer & Entrepreneur",
  description:
    "William Armstrong: GTM Engineer building revenue infrastructure—pipelines, automation, and systems that connect product, sales, and data. Boston College, entrepreneur, and leader in product and go-to-market.",
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