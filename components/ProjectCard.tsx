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
    <div
      onClick={onClick}
      className={cn(
        "bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:bg-accent/5 hover:scale-[1.02] hover:shadow-lg cursor-pointer group",
        "flex flex-col h-full",
        size === "compact" ? "min-h-[280px]" : "min-h-[540px]",
        "shadow-[0_2px_8px_hsl(222_47%_11%_/_0.06)]",
        className
      )}
    >
      {/* Image Section */}
      {image && (
        <div className={cn(
          "relative overflow-hidden",
          size === "compact" ? "h-32" : "h-72"
        )}>
          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-muted-foreground/20 flex items-center justify-center animate-pulse">
                <svg
                  className="w-4 h-4 text-muted-foreground"
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
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-500"
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
              "object-cover transition-all duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1 px-3 md:px-6 py-6">
        <div className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {category}
            </span>
            {date && (
              <span className="text-xs text-muted-foreground">
                {date}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">View Project</span>
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg
                className="w-3 h-3 text-primary group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGridCard;