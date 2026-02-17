"use client";

import { motion } from "framer-motion";
import CoverImage from "./CoverImage";
import DateFormatter from "./DateFormatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  number?: string;
};

export default function PostHeader({
  title,
  coverImage,
  date,
  number,
}: Props) {
  return (
    <>
      {number && (
        <motion.div
          className="flex items-baseline justify-between gap-4 mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0,
          }}
        >
          <span className="text-5xl md:text-6xl font-bold tabular-nums text-muted-foreground/50">
            {number}
          </span>
          <div className="text-muted-foreground">
            <DateFormatter dateString={date} />
          </div>
        </motion.div>
      )}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8 text-foreground"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0,
        }}
      >
        {title}
      </motion.h1>
      <motion.div
        className="mb-8 md:mb-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.15,
        }}
      >
        <CoverImage title={title} src={coverImage} />
      </motion.div>
    </>
  );
}
