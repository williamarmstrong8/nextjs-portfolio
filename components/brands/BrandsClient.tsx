"use client";

import { motion } from "framer-motion";
import BrandCards from "@/components/brands/BrandCards";

export default function BrandsClient() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1,
          }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2,
            }}
          >
            Startups
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4,
            }}
          >
            Entrepreneurial ventures and startups.
          </motion.p>
        </motion.section>

        <BrandCards />
      </main>
    </div>
  );
}
