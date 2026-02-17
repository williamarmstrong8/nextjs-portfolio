"use client";

import { useState } from "react";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function PhotographyImage({ src, alt, width, height }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-muted"
          aria-hidden
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover transition-opacity duration-300"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
    </div>
  );
}
