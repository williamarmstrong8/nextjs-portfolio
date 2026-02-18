"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { brands, type Brand } from "@/data/brands";
import { BLUR_DATA_URL } from "@/lib/blur";

const FEATURED_BRAND_NAMES = ["Club Pack", "Happy Mile Run Club", "Mod Brew"];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const ProjectsSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const featuredBrands = FEATURED_BRAND_NAMES.map((name) =>
    brands.find((b) => b.name === name)
  ).filter((b): b is Brand => b != null);

  return (
    <section className="py-16 px-4 md:px-20 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Startups
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Clubs and startups brought to life through community, product, and storytelling
          </p>
        </motion.div>

        {/* Startups Grid - one column until lg */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredBrands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={shouldReduceMotion ? false : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.5,
                ease,
                delay: 0.2 + index * 0.1,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { duration: 0.2 } }}
            >
            <Link
              href="/startups"
              className="block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer h-full"
            >
              {/* Brand Image - 16:9 */}
              {brand.screenshots && brand.screenshots.length > 0 ? (
                <div className="relative w-full aspect-video overflow-hidden bg-muted">
                  <Image
                    src={brand.screenshots[0]}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground rounded-full text-xs font-medium">
                      {brand.category}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full aspect-video overflow-hidden bg-muted flex items-center justify-center p-6">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={120}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground rounded-full text-xs font-medium">
                      {brand.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Brand Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {brand.description}
                </p>

                {/* Frameworks / Tags */}
                {brand.frameworks && brand.frameworks.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {brand.frameworks.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {brand.frameworks.length > 3 && (
                      <span className="px-2 py-1 text-muted-foreground rounded text-xs">
                        +{brand.frameworks.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
        >
          <Link
            href="/startups"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-out hover:scale-105 shadow-sm hover:shadow-md"
          >
            View All Startups
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
