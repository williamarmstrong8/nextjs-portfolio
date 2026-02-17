"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectGridCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectModal from "@/components/ProjectModal";
import { useIsMobile } from "@/hooks/use-mobile";

interface Project {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  images?: string[];
  videos?: string[];
  technologies?: string[];
  features?: string[];
  link?: string;
  github?: string;
}

interface ProjectsClientProps {
  projects: Project[];
}

const ProjectsClient = ({ projects }: ProjectsClientProps) => {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const selectedProjectData = selectedProject
    ? projects.find(project => project.id === selectedProject)
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className={`${isMobile ? 'px-4' : 'px-20'} pt-8 pb-16`}>
        {/* Page Header */}
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1
          }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
          >
            Projects
          </motion.h1>
        </motion.section>

        {/* Filter Section */}
        <motion.section
          className={`flex ${isMobile ? 'justify-center' : 'justify-end'} mb-12`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4
          }}
        >
          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.section>

        {/* Projects Grid - same pattern as Startups: section then cards animate in order */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.7 + index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <ProjectGridCard
                title={project.title}
                category={project.category}
                description={project.description}
                date={project.date}
                image={
                  project.thumbnail ||
                  (project.images && project.images.length > 0 ? project.images[0] : undefined)
                }
                onClick={() => handleProjectClick(project.id)}
              />
            </motion.div>
          ))}
        </motion.section>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-muted-foreground text-lg">
                No projects found for the selected category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Project Modal */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={handleCloseModal}
        project={selectedProjectData}
      />
    </div>
  );
};

export default ProjectsClient;