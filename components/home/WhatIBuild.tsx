"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const capabilitiesData = [
  {
    title: "Web platforms that scale",
    description:
      "I build modern web platforms with Next.js, focusing on static-first architecture and edge rendering. Every decision balances performance, developer experience, and real-world constraints to create systems that grow with your business.",
    tags: ["Next.js", "Edge", "Static-first", "Performance", "DX"],
  },
  {
    title: "Brands brought to life",
    description:
      "I build brands from the ground up through community, leadership, and product driven storytelling. From launching clubs and startups to shaping their digital presence, I turn ideas into brands people actually show up for both online and in real life.",
    tags: ["Community building", "Brand systems", "Leadership and growth", "UX and storytelling"],
  },
  {
    title: "Where product meets people",
    description:
      "I translate complex technical products into experiences people quickly understand. With a human centered engineering mindset, I design clear demos, thoughtful onboarding, and practical enablement that connect product value to real user needs.",
    tags: ["Demos", "Enablement", "Onboarding", "Human centered design"],
  },
];

const additionalCapabilitiesData = [
  {
    title: "Full-stack product development",
    description:
      "End-to-end ownership from concept to deployment. I architect scalable systems, implement robust backends, and craft intuitive frontends that work seamlessly together. Every feature ships with comprehensive testing and monitoring.",
    tags: ["Architecture", "Backend", "Frontend", "Testing", "Monitoring"],
    size: "large" as const,
    hasAnimation: true,
  },
  {
    title: "Technical leadership",
    description:
      "I guide cross-functional teams through complex technical challenges, mentor developers, and ensure engineering excellence while keeping business goals in focus.",
    tags: ["Leadership", "Mentoring", "Strategy", "Communication"],
    size: "small" as const,
    hasAnimation: false,
  },
];

const WhatIBuild = () => {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -4,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      className={`bg-background py-16 ${isMobile ? "px-6" : "px-20"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* First Row - 3 Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {capabilitiesData.map((capability, index) => (
            <motion.div
              key={index}
              className="group"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 h-full transition-all duration-300 ease-out hover:border-primary/20 hover:shadow-xl relative overflow-hidden">
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 to-primary/5" />

                {/* Content */}
                <div className="pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight">
                    {capability.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6 text-[15px] md:text-base">
                    {capability.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {capability.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-muted/50 text-muted-foreground text-sm rounded-full border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Second Row - 2 Cards (2/3 and 1/3) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {additionalCapabilitiesData.map((capability, index) => (
            <motion.div
              key={index + 3}
              className={`group ${
                capability.size === "large" ? "md:col-span-2" : "md:col-span-1"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 h-full transition-all duration-300 ease-out hover:border-primary/20 hover:shadow-xl relative overflow-hidden">
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 to-primary/5" />

                {/* Animated indicator for the large card */}
                {capability.hasAnimation && (
                  <motion.div
                    className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Content */}
                <div className="pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight">
                    {capability.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6 text-[15px] md:text-base">
                    {capability.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {capability.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-muted/50 text-muted-foreground text-sm rounded-full border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIBuild;
