import HeroSection from "@/components/home/HeroSection";
import WhatIBuild from "@/components/home/WhatIBuild";
import ProjectsSection from "@/components/ProjectsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "William Armstrong | Portfolio",
  description:
    "William Armstrong — GTM Engineer building revenue infrastructure: pipelines, automation, and systems that connect product, sales, and data. Explore projects, startups, and writing.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-hero text-hero-foreground">
      <HeroSection />
      <WhatIBuild />
      <ProjectsSection />
    </div>
  );
}