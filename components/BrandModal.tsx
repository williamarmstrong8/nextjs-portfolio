"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/lib/blur";

interface Brand {
  name: string;
  logo: string;
  description: string;
  longDescription?: string;
  category: string;
  status: "Active" | "Launched" | "In Beta" | "In Funding";
  metrics: { label: string; value: string }[];
  website: string;
  frameworks?: string[];
  screenshots?: string[];
  accomplishments?: string[];
  features?: string[];
}

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand | null;
}

const BrandModal = ({ isOpen, onClose, brand }: BrandModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaAspectRatios, setMediaAspectRatios] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Same mental model as Projects modal (variable widths based on aspect ratio)
  const mediaItems = useMemo(
    () => [...(brand?.screenshots?.map((img) => ({ type: "image" as const, src: img })) || [])],
    [brand]
  );

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      };
    } else {
      setCurrentMediaIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // ✅ Preload first 2 images when modal opens
  useEffect(() => {
    if (!isOpen || !brand?.screenshots?.length) return;

    const toPreload = brand.screenshots.slice(0, 2);
    const links: HTMLLinkElement[] = [];

    toPreload.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((l) => {
        try {
          document.head.removeChild(l);
        } catch {
          // ignore
        }
      });
    };
  }, [isOpen, brand]);

  // ✅ Match Projects modal: measure aspect ratios so vertical + horizontal sit correctly
  useEffect(() => {
    if (!isOpen) return;

    if (mediaItems.length === 0) {
      setMediaAspectRatios([]);
      return;
    }

    // Set instant fallbacks to avoid initial "jump"
    setMediaAspectRatios(mediaItems.map(() => 4 / 3));

    let cancelled = false;

    const loadAspectRatios = async () => {
      const ratios = await Promise.all(
        mediaItems.map(
          (item) =>
            new Promise<number>((resolve) => {
              const img = new window.Image();
              img.onload = () => {
                const w = img.naturalWidth || 4;
                const h = img.naturalHeight || 3;
                resolve(w / h);
              };
              img.onerror = () => resolve(4 / 3);
              img.src = item.src;
            })
        )
      );

      if (!cancelled) setMediaAspectRatios(ratios);
    };

    loadAspectRatios();

    return () => {
      cancelled = true;
    };
  }, [isOpen, mediaItems]);

  if (!isOpen || !brand) return null;

  const nextMedia = () => {
    if (mediaItems.length > 0) {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }
  };

  const prevMedia = () => {
    if (mediaItems.length > 0) {
      setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  // Same centering logic as Projects modal
  const calculateTransform = () => {
    if (!containerRef.current || mediaItems.length === 0 || mediaAspectRatios.length === 0) {
      return "translateX(0)";
    }

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const mediaWidths = mediaAspectRatios.map((ratio) => containerHeight * ratio);

    let cumulativeWidth = 0;
    const mediaPositions = mediaWidths.map((width) => {
      const position = cumulativeWidth;
      cumulativeWidth += width;
      return position;
    });

    const currentMediaPosition = mediaPositions[currentMediaIndex] || 0;
    const currentMediaWidth = mediaWidths[currentMediaIndex] || containerWidth;
    const currentMediaCenter = currentMediaPosition + currentMediaWidth / 2;

    if (currentMediaIndex === 0) return "translateX(0px)";

    if (currentMediaIndex === mediaItems.length - 1) {
      const totalWidth =
        (mediaPositions[mediaPositions.length - 1] || 0) +
        (mediaWidths[mediaWidths.length - 1] || 0);
      const translateX = Math.max(0, totalWidth - containerWidth);
      return `translateX(-${translateX}px)`;
    }

    const containerCenter = containerWidth / 2;
    const translateX = Math.max(0, currentMediaCenter - containerCenter);
    return `translateX(-${translateX}px)`;
  };

  const statusBadgeClass = "bg-muted text-foreground border border-border";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-background border border-border rounded-3xl shadow-2xl max-w-7xl max-h-[95vh] w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={48}
              height={48}
              className="object-contain"
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
            <div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {brand.category}
              </span>
              <h2 className="text-2xl font-bold text-foreground mt-1">{brand.name}</h2>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${statusBadgeClass}`}
              >
                {brand.status}
              </span>
            </div>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 pb-12">
            {/* Media Gallery */}
            {mediaItems.length > 0 && (
              <div className="mb-8">
                {mediaItems.length === 1 ? (
                  <div className="flex justify-center">
                    <div className="relative max-h-[70vh] w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
                      <Image
                        src={mediaItems[0].src}
                        alt={`${brand.name} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        className="object-contain"
                        priority
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden bg-muted">
                    <div ref={containerRef} className="h-[600px] overflow-hidden">
                      <div
                        className="flex transition-transform duration-300 ease-in-out h-full"
                        style={{ transform: calculateTransform() }}
                      >
                        {mediaItems.map((mediaItem, index) => {
                          const ratio = mediaAspectRatios[index] ?? 4 / 3;
                          return (
                            <div
                              key={index}
                              className="flex-shrink-0 relative overflow-hidden h-full"
                              style={{ width: `${600 * ratio}px` }} // height is 600px; width derived from ratio
                            >
                              <Image
                                src={mediaItem.src}
                                alt={`${brand.name} - Screenshot ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 1200px"
                                className="object-contain"
                                priority={index === 0}
                                loading={index === 0 ? "eager" : "lazy"}
                                placeholder="blur"
                                blurDataURL={BLUR_DATA_URL}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation */}
                    {mediaItems.length > 1 && (
                      <>
                        <button
                          onClick={prevMedia}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        <button
                          onClick={nextMedia}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full z-10">
                          {currentMediaIndex + 1} / {mediaItems.length}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Thumbnails */}
                {mediaItems.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {mediaItems.map((mediaItem, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors relative bg-muted",
                          currentMediaIndex === index
                            ? "border-primary"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <Image
                          src={mediaItem.src}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Brand Details */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">About This Brand</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {brand.longDescription || brand.description}
                  </p>
                </div>

                {/* Metrics */}
                {brand.metrics && brand.metrics.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {brand.metrics.map((metric, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accomplishments */}
                {brand.accomplishments && brand.accomplishments.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Major Accomplishments
                    </h3>
                    <ul className="space-y-2">
                      {brand.accomplishments.map((accomplishment, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{accomplishment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Frameworks */}
                {brand.frameworks && brand.frameworks.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {brand.frameworks.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {brand.features && brand.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {brand.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Links</h3>
                  <div className="space-y-3">
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                      <span className="text-foreground font-medium">Visit Website</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end details */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
