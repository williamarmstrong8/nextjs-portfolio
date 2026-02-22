import type { Metadata } from "next";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Engineering Projects - William Armstrong Portfolio | AI, IoT & Product Development",
  description:
    "Explore William Armstrong's engineering portfolio: AI Blog Generator, Cora Fitness brand, Proof social health tracker, PWS smart refrigeration system, waste management solutions, and innovative product development projects.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return <ProjectsClient projects={projects} />;
}