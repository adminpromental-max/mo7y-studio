"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioItem } from "@/data/portfolio";

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

  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.tag === activeFilter);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
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

      <p className="text-gray-500 text-center text-sm mb-6">
        {filtered.length} {isVideo ? "فيديو" : "صورة"}
      </p>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow ${
                item.aspect === "portrait"
                  ? "aspect-[9/16] max-w-xs mx-auto w-full sm:max-w-none"
                  : item.aspect === "landscape"
                    ? "aspect-video"
                    : "aspect-square"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play
                      className="w-6 h-6 text-purple-600 mr-0.5"
                      fill="currentColor"
                    />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 right-0 left-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white font-medium text-sm">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
