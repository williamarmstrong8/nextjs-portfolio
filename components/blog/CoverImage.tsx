"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

export default function CoverImage({ title, src, slug }: Props) {
  const [loaded, setLoaded] = useState(false);
  const image = (
    <span className="block relative w-full aspect-[21/10] rounded-lg overflow-hidden bg-muted">
      <Image
        src={src}
        alt={`Cover image for ${title}`}
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        className={cn(
          "rounded-lg shadow-sm object-cover transition-opacity duration-300",
          slug && "hover:shadow-md transition-shadow duration-200",
          loaded ? "opacity-100" : "opacity-0"
        )}
        priority={!!slug}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
  return (
    <div className="sm:mx-0 overflow-hidden rounded-lg">
      {slug ? (
        <Link href={`/blog/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
