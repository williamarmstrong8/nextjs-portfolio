import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";

interface ProjectGridCardProps {
  title: string;
  category?: string;
  description?: string;
  date?: string;
  image?: string;
  className?: string;
  onClick?: () => void;
  size?: "default" | "compact";
}

const ProjectGridCard = ({
  title,
  category = "Project",
  description = "Project description coming soon...",
  date,
  image,
  className,
  onClick,
  size = "default"
}: ProjectGridCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left flex flex-col transition-all duration-300 ease-out hover:scale-[1.02] cursor-pointer group",
        size === "compact" ? "min-h-0" : "",
        className
      )}
    >
      {/* Image Card - distinct visual card with rounded corners and subtle styling */}
      {image && (
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-muted/20 via-muted/10 to-muted/30",
            "shadow-[0_2px_12px_hsl(222_47%_11%_/_0.08)] transition-shadow duration-300 group-hover:shadow-lg",
            "aspect-video"
          )}
        >
          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-muted-foreground/15 flex items-center justify-center animate-pulse">
                <svg
                  className="w-5 h-5 text-muted-foreground/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}

          {/* Error state */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          )}

          {/* Actual image */}
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* Text and details - separate from image card */}
      <div className="mt-5 flex flex-col gap-1">
        <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {date && category ? (
            <>
              {date}
              <span className="mx-1.5 text-muted-foreground/60" aria-hidden>•</span>
              {category}
            </>
          ) : (
            date || category
          )}
        </p>
        {description && size !== "compact" && (
          <p className="text-sm text-muted-foreground/90 leading-relaxed mt-2 line-clamp-2">
            {description}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          View Project
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </button>
  );
};

export default ProjectGridCard;