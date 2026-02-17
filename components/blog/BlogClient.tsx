"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Post } from "@/interfaces/post";
import BlogFilter from "./BlogFilter";
import MoreStories from "./MoreStories";

interface BlogClientProps {
  posts: Post[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  return (
    <>
      {/* Page Header */}
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
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
        >
          Blog
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4,
          }}
        >
          Thoughts on human-centered design, product engineering, and building
          things that matter.
        </motion.p>
      </motion.section>

      {/* Filter Section - coded out until we have enough content to warrant it */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.4,
        }}
      >
        <BlogFilter
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </motion.div> */}

      {/* Posts Grid - same pattern as Startups/Projects: section then cards animate in order */}
      {posts.length > 0 ? (
        filteredPosts.length > 0 ? (
          <MoreStories posts={filteredPosts} />
        ) : (
          <motion.p
            className="text-muted-foreground text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            No posts found in this category.
          </motion.p>
        )
      ) : (
        <motion.p
          className="text-muted-foreground text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          No posts yet. Check back soon.
        </motion.p>
      )}
    </>
  );
}
