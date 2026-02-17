import type { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/blog/api";
import BlogClient from "@/components/blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog | William Armstrong - Product Engineer & Entrepreneur",
  description:
    "Insights on human-centered design, product engineering, and building innovative solutions. Read William Armstrong's thoughts on startups, Next.js, and modern web development.",
  keywords: [
    "William Armstrong",
    "Blog",
    "Product Engineering",
    "Human-Centered Design",
    "Next.js",
    "Startups",
    "Web Development",
  ],
  authors: [{ name: "William Armstrong" }],
  metadataBase: new URL("https://williamarmstrong.dev"),
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | William Armstrong - Product Engineer & Entrepreneur",
    description:
      "Insights on human-centered design, product engineering, and building innovative solutions.",
    url: "https://williamarmstrong.dev/blog",
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | William Armstrong",
    description: "Insights on product engineering and human-centered design.",
    creator: "@williamarmstrong",
  },
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
