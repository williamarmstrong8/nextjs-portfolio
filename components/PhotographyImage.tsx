"use client";

import { useState } from "react";
import Image from "next/image";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AL3k9/c2WkzT207xSqVw6MQw5HcV5zqOo3l7dNNd3M08rdvI5Y/2aKKVZ2J5M//Z";

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
