import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog/api";
import markdownToHtml from "@/lib/blog/markdownToHtml";
import BlogPostClient from "@/components/blog/BlogPostClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null; // newer
  const prevPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null; // older

  return (
    <main className="min-h-screen bg-background px-4 md:px-20 pt-8 pb-16">
      <BlogPostClient
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        number={post.number}
        content={content}
        prevPost={prevPost ? { slug: prevPost.slug, title: prevPost.title } : null}
        nextPost={nextPost ? { slug: nextPost.slug, title: nextPost.title } : null}
      />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = `${post.title} | William Armstrong`;
  const description = post.excerpt;
  const imageUrl = post.ogImage?.url || post.coverImage;

  return {
    title,
    description,
    authors: [{ name: post.author.name }],
    metadataBase: new URL("https://williamarmstrong.dev"),
    openGraph: {
      title,
      description,
      url: `https://williamarmstrong.dev/blog/${post.slug}`,
      siteName: "William Armstrong Portfolio",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@williamarmstrong",
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
