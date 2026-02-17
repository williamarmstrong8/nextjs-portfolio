"use client";

import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

type AdjacentPost = { slug: string; title: string };

interface BlogPostClientProps {
  title: string;
  coverImage: string;
  date: string;
  number?: string;
  content: string;
  prevPost?: AdjacentPost | null;
  nextPost?: AdjacentPost | null;
}

export default function BlogPostClient({
  title,
  coverImage,
  date,
  number,
  content,
  prevPost = null,
  nextPost = null,
}: BlogPostClientProps) {
  return (
    <>
      {/* Back link section */}
      <section className="pt-2 pb-4">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1,
            }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Article content */}
      <article className="pt-6 pb-12 md:pb-16 w-full">
        <div className="max-w-4xl mx-auto w-full">
          <div>
            <PostHeader
              title={title}
              coverImage={coverImage}
              date={date}
              number={number}
            />
          </div>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.5,
            }}
          >
            <PostBody content={content} />
          </motion.div>

          {/* Previous / Next post navigation */}
          {(prevPost || nextPost) && (
            <nav
              className="mt-16 pt-12 border-t border-border"
              aria-label="Previous and next posts"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors max-w-[min(100%,20rem)]"
                  >
                    <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">
                      <span className="text-xs uppercase tracking-wide block mb-0.5">Previous</span>
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors max-w-[min(100%,20rem)] sm:ml-auto sm:text-right"
                  >
                    <span className="truncate order-2 sm:order-1">
                      <span className="text-xs uppercase tracking-wide block mb-0.5">Next</span>
                      {nextPost.title}
                    </span>
                    <ChevronRight className="w-5 h-5 flex-shrink-0 order-1 sm:order-2" />
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            </nav>
          )}
        </div>
      </article>
    </>
  );
}
