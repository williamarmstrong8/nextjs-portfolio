"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DateFormatter from "./DateFormatter";
import { BLUR_DATA_URL } from "@/lib/blur";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  number?: string;
};

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  number,
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <article className="group border border-border rounded-2xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <Link
        href={`/blog/${slug}`}
        className="flex flex-col h-full cursor-pointer"
      >
        {/* Image Section - full width, top of card */}
        <div className="relative h-72 overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-300 group-hover:scale-105"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>
        {/* Content Section */}
        <div className="flex flex-col flex-1 px-3 md:px-6 py-6">
          {number && (
            <span className="text-2xl font-bold tabular-nums text-muted-foreground/50 mb-3 block">
              {number}
            </span>
          )}
          <h3 className="text-2xl font-bold mb-2 leading-snug text-foreground group-hover:text-nav-active transition-colors">
            {title}
          </h3>
          <div className="text-muted-foreground text-sm mb-4">
            <DateFormatter dateString={date} />
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
