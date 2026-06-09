"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Play, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioItem } from "@/data/portfolio";
import PortfolioCoverFlow from "./PortfolioCoverFlow";
import PortfolioLightbox from "./PortfolioLightbox";

interface Filter {
  id: string;
  label: string;
}

interface Props {
  items: PortfolioItem[];
  filters: Filter[];
  isVideo?: boolean;
}

export default function PortfolioGallery({ items, filters, isVideo }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((item) => item.tag === activeFilter),
    [items, activeFilter]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  const openLightbox = (index: number) => setLightboxIndex(index);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6 max-w-4xl mx-auto">
        <p className="text-gray-500 text-sm">
          {filtered.length} {isVideo ? "فيديو" : "صورة"}
        </p>
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-200">
          <button
            type="button"
            onClick={() => setViewMode("carousel")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === "carousel"
                ? "bg-purple-600 text-white"
                : "text-gray-500 hover:text-purple-600"
            }`}
          >
            عرض سينمائي
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              viewMode === "grid"
                ? "bg-purple-600 text-white"
                : "text-gray-500 hover:text-purple-600"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            شبكة
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "carousel" ? (
          <motion.div
            key={`carousel-${activeFilter}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <PortfolioCoverFlow
              key={`flow-${activeFilter}-${filtered.length}`}
              items={filtered}
              isVideo={isVideo}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              onOpen={openLightbox}
            />

            {filtered.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 px-1 max-w-4xl mx-auto scrollbar-hide">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      i === activeIndex
                        ? "border-purple-500 scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${activeFilter}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {filtered.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openLightbox(index)}
                className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  item.aspect === "portrait"
                    ? "aspect-[9/16] col-span-1"
                    : item.aspect === "landscape"
                      ? "aspect-video col-span-2 sm:col-span-1"
                      : "aspect-square"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-purple-600 mr-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 right-0 left-0 p-3">
                  <p className="text-white text-xs sm:text-sm font-medium line-clamp-1">
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <PortfolioLightbox
        items={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
}
