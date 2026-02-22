import HeroSection from "@/components/home/HeroSection";
import WhatIBuild from "@/components/home/WhatIBuild";
import ProjectsSection from "@/components/ProjectsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "William Armstrong | Portfolio",
  description:
    "Discover William Armstrong's portfolio: Product Engineer specializing in human-centered design, entrepreneur, and creative professional. Explore innovative projects, startups, and photography.",
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