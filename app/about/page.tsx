import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About William Armstrong - Journey as Product Engineer & Entrepreneur",
  description:
    "Discover William Armstrong's background: Boston College graduate in Human-Centered Engineering, entrepreneur, and leader. Learn about his experience in product development, venture building, and community impact.",
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