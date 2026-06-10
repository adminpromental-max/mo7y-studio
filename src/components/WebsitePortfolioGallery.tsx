"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";

interface Filter {
  id: string;
  label: string;
}

interface Props {
  items: PortfolioItem[];
  filters: Filter[];
}

function isValidUrl(url?: string) {
  return !!url && url !== "#" && url.startsWith("http");
}

export default function WebsitePortfolioGallery({ items, filters }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((item) => item.tag === activeFilter),
    [items, activeFilter]
  );

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

      <p className="text-gray-500 text-center text-sm mb-8">
        {filtered.length} موقع — اضغط على أي بطاقة لزيارة الموقع
      </p>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const hasLink = isValidUrl(item.siteUrl);
            const CardWrapper = hasLink ? "a" : "div";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <CardWrapper
                  {...(hasLink
                    ? {
                        href: item.siteUrl,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className={`group block relative rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 transition-all ${
                    hasLink
                      ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      : "opacity-90"
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {hasLink ? (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-purple-900/30">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-purple-700 font-semibold shadow-lg">
                          <ExternalLink className="w-4 h-4" />
                          زيارة الموقع
                        </span>
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                        قريباً
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0 text-right flex-1">
                      <h3 className="font-bold text-gray-900 truncate">
                        {item.title}
                      </h3>
                      {hasLink && (
                        <p
                          className="text-xs text-purple-600 truncate mt-0.5 dir-ltr text-left"
                          dir="ltr"
                        >
                          {item.siteUrl?.replace(/^https?:\/\//, "")}
                        </p>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-purple-600 transition-colors">
                      {hasLink ? (
                        <ExternalLink className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
                      ) : (
                        <Globe className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
