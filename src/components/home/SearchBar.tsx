"use client";

/**
 * SearchBar — Section 2: Search input + filter category pills
 * Preserved from Stitch home_dashboard Section 2.
 */

import { useState } from "react";
import { FILTER_CATEGORIES } from "@/lib/mock-data";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (categoryId: string) => void;
}

export default function SearchBar({ onSearch, onCategoryChange }: SearchBarProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  function handleSearch() {
    if (!query.trim()) return;
    setSearching(true);
    onSearch?.(query.trim());
    setTimeout(() => setSearching(false), 300);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  function handleCategoryClick(cat: typeof FILTER_CATEGORIES[number]) {
    setActiveCategory(cat.id);
    if (cat.id !== "all") {
      setQuery(cat.labelEn);
    } else {
      setQuery("");
    }
    onCategoryChange?.(cat.id);
  }

  return (
    <section className="rounded-xl bg-surface-container-lowest p-space-md lg:p-space-lg shadow-sm flex flex-col gap-space-md">
      {/* Search input row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-space-sm">
        <div
          className={`relative flex-1 flex items-center bg-surface-container-low rounded-xl px-space-md shadow-sm transition-all
            focus-within:bg-surface-container-lowest focus-within:shadow-md ${searching ? "opacity-50" : "opacity-100"}`}
        >
          <span className="material-symbols-outlined text-primary text-2xl mr-space-sm" aria-hidden="true">
            search
          </span>
          <input
            id="medicine-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ঔষধের নাম, জেনেরিক নাম বা প্রস্তুতকারকের নাম অনুসন্ধান করুন..."
            aria-label="ঔষধ অনুসন্ধান"
            className="w-full bg-transparent py-3.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
          />
          <div className="flex items-center gap-space-xs ml-space-xs">
            <button
              type="button"
              title="ভয়েস অনুসন্ধান"
              className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
              aria-label="ভয়েস দিয়ে অনুসন্ধান"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">mic</span>
            </button>
            <span className="h-5 w-px bg-outline-variant" aria-hidden="true" />
            <span className="hidden sm:flex items-center gap-1 px-space-xs py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">barcode_scanner</span>
              <span>বারকোড স্ক্যান (Soon)</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="px-space-lg py-3.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-sm hover:bg-primary-dark transition-all active:scale-[0.98]"
          aria-label="ঔষধ খুঁজুন"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">travel_explore</span>
          <span>খুঁজুন</span>
        </button>
      </div>

      {/* Filter category pills */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none" role="group" aria-label="ঔষধ বিভাগ ফিল্টার">
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1 mr-1 shrink-0">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">tune</span>
          বিভাগ:
        </span>
        {FILTER_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryClick(cat)}
            aria-pressed={activeCategory === cat.id}
            className={`filter-pill shrink-0 px-space-sm py-1 rounded-full font-label-sm text-label-sm transition-colors
              ${activeCategory === cat.id
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
          >
            {cat.labelBn} {cat.id === "all" ? `(All)` : ""}
          </button>
        ))}
      </div>
    </section>
  );
}
