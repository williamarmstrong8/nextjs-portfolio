"use client";

import { cn } from "@/lib/utils";

interface BlogFilterProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

export default function BlogFilter({
  categories,
  activeFilter,
  onFilterChange,
}: BlogFilterProps) {
  return (
    <div className="flex flex-wrap justify-center md:justify-end gap-3 mb-12">
      <div className="flex flex-wrap gap-2 bg-card border border-border rounded-full p-2">
        <button
          onClick={() => onFilterChange("All")}
          className={cn(
            "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
            activeFilter === "All"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeFilter === category
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
