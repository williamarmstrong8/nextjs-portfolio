"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhotographyImage } from "@/components/PhotographyImage";
import { cn } from "@/lib/utils";

type ImageItem = { src: string; title: string; width: number; height: number; folder: string };

function getColumnsCount(width: number) {
  if (width >= 1280) return 4; // xl
  if (width >= 1024) return 3; // lg
  if (width >= 768) return 2; // md
  return 1;
}

export default function PhotographyClient({ images }: { images: ImageItem[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [columnsCount, setColumnsCount] = useState(1);

  useEffect(() => {
    const update = () => setColumnsCount(getColumnsCount(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const folders = useMemo(() => {
    const set = new Set(images.map((i) => i.folder));
    return ["All", ...Array.from(set).sort()];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (activeFilter !== "All") {
      return images.filter((img) => img.folder === activeFilter);
    }
    // "All": interleave by folder so the grid is a mix, not grouped by event
    const byFolder = new Map<string, ImageItem[]>();
    for (const img of images) {
      const list = byFolder.get(img.folder) ?? [];
      list.push(img);
      byFolder.set(img.folder, list);
    }
    const folderNames = Array.from(byFolder.keys()).sort();
    const mixed: ImageItem[] = [];
    let round = 0;
    let hasMore = true;
    while (hasMore) {
      hasMore = false;
      for (const name of folderNames) {
        const list = byFolder.get(name)!;
        if (round < list.length) {
          mixed.push(list[round]);
          hasMore = true;
        }
      }
      round++;
    }
    return mixed;
  }, [images, activeFilter]);

  const columns = useMemo(() => {
    const cols = Array.from({ length: columnsCount }, () => ({
      items: [] as ImageItem[],
      weight: 0,
    }));

    for (const img of filteredImages) {
      const w = img.width || 1;
      const h = img.height || 1;
      const itemWeight = h / w; // relative height (width cancels out)

      let target = 0;
      for (let i = 1; i < cols.length; i++) {
        if (cols[i].weight < cols[target].weight) target = i;
      }

      cols[target].items.push(img);
      cols[target].weight += itemWeight;
    }

    return cols.map((c) => c.items);
  }, [filteredImages, columnsCount]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <motion.section
          className="text-center mb-12"
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
            Photography
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4,
            }}
          >
            Capturing moments, landscapes, and life&apos;s beautiful details.
          </motion.p>

          {/* Filter badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() => setActiveFilter(folder)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                  activeFilter === folder
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
                )}
              >
                {folder}
              </button>
            ))}
          </motion.div>
        </motion.section>

        {/* Grid (balanced columns) */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {col.map((image, index) => (
                  <motion.div
                    key={`${activeFilter}:${image.src}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.05 + index * 0.04,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                      <PhotographyImage
                        src={image.src}
                        alt={image.title}
                        width={image.width}
                        height={image.height}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  );
}
