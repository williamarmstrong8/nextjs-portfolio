import type { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/blog/api";
import BlogClient from "@/components/blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog | William Armstrong - Product Engineer & Entrepreneur",
  description:
    "Insights on human-centered design, product engineering, and building innovative solutions. Read William Armstrong's thoughts on startups, Next.js, and modern web development.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <BlogClient posts={allPosts} categories={categories} />
      </main>
    </div>
  );
}
