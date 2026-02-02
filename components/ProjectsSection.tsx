import Link from "next/link";
import Image from "next/image";
import { brands, type Brand } from "@/data/brands";

const FEATURED_BRAND_NAMES = ["Club Pack", "Happy Mile Run Club", "Mod Brew"];

const ProjectsSection = () => {
  const featuredBrands = FEATURED_BRAND_NAMES.map((name) =>
    brands.find((b) => b.name === name)
  ).filter((b): b is Brand => b != null);

  return (
    <section className="py-16 px-4 md:px-20 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Startups
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Clubs and startups brought to life through community, product, and storytelling
          </p>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.name}
              href="/startups"
              className="block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
            >
              {/* Brand Image */}
              {brand.screenshots && brand.screenshots.length > 0 ? (
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={brand.screenshots[0]}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground rounded-full text-xs font-medium">
                      {brand.category}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 overflow-hidden bg-muted flex items-center justify-center p-6">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={120}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground rounded-full text-xs font-medium">
                      {brand.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Brand Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {brand.description}
                </p>

                {/* Frameworks / Tags */}
                {brand.frameworks && brand.frameworks.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {brand.frameworks.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {brand.frameworks.length > 3 && (
                      <span className="px-2 py-1 text-muted-foreground rounded text-xs">
                        +{brand.frameworks.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/startups"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-out hover:scale-105 shadow-sm hover:shadow-md"
          >
            View All Startups
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
