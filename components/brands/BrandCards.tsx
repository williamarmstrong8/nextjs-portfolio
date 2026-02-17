"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/blur";
import BrandModal from "@/components/BrandModal";
import { brands } from "@/data/brands";

const BrandCards = () => {
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (brand: any) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <>
      <motion.section
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        {brands.map((brand, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.7 + index * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-card border border-border rounded-3xl p-6 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg cursor-pointer group flex flex-col justify-between h-full min-h-[320px] shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
          >
            <div className="flex flex-col justify-between h-full">
              {/* Header with logo and status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-muted rounded overflow-hidden">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                      sizes="48px"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {brand.category}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-foreground border border-border">
                    {brand.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 mb-4">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {brand.description}
                </p>
              </div>

              {/* Metrics */}
              {brand.metrics && (
                <div className="mb-4">
                  <div className="flex gap-3">
                    {brand.metrics.map((metric, idx) => (
                      <div key={idx} className="flex-1 bg-muted/50 dark:bg-muted/50 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-foreground">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer with buttons */}
              <div className="pt-4">
                <div className="flex gap-3">
                  <Link
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>View Website</span>
                  </Link>
                  <button
                    onClick={() => openModal(brand)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-3 px-4 rounded-xl font-medium text-center group-hover:scale-[1.02] transition-transform"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <BrandModal
        isOpen={isModalOpen}
        onClose={closeModal}
        brand={selectedBrand}
      />
    </>
  );
};

export default BrandCards;
