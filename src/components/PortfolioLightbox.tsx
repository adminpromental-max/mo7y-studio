"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { isVideoEmbed, toEmbedUrl } from "@/data/portfolio";

interface Props {
  items: PortfolioItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function PortfolioLightbox({
  items,
  index,
  onClose,
  onChange,
}: Props) {
  const item = index !== null ? items[index] : null;
  const hasPrev = index !== null && index > 0;
  const hasNext = index !== null && index < items.length - 1;

  const goPrev = useCallback(() => {
    if (index !== null && hasPrev) onChange(index - 1);
  }, [index, hasPrev, onChange]);

  const goNext = useCallback(() => {
    if (index !== null && hasNext) onChange(index + 1);
  }, [index, hasNext, onChange]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goPrev();
      if (e.key === "ArrowLeft") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onClick={onClose}
        >
          <div
            className="flex items-center justify-between p-4 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-white font-medium text-sm sm:text-base truncate px-4">
              {item.title}
            </p>
            <span className="text-white/60 text-sm w-10 text-center">
              {index + 1}/{items.length}
            </span>
          </div>

          <div
            className="flex-1 flex items-center justify-center px-4 pb-4 min-h-0 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {hasPrev && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                aria-label="السابق"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className={`relative w-full max-h-full ${
                item.aspect === "portrait"
                  ? "max-w-[min(100%,320px)] aspect-[9/16]"
                  : item.aspect === "landscape" || item.videoUrl
                    ? "max-w-4xl aspect-video"
                    : "max-w-3xl aspect-[4/5] sm:aspect-square"
              }`}
            >
              {item.videoUrl ? (
                isVideoEmbed(item.videoUrl) ? (
                  <iframe
                    src={toEmbedUrl(item.videoUrl)}
                    title={item.title}
                    className="absolute inset-0 w-full h-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={item.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-contain rounded-xl bg-black"
                  />
                )
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized={item.image.startsWith("/portfolio")}
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </motion.div>

            {hasNext && (
              <button
                type="button"
                onClick={goNext}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                aria-label="التالي"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {item.siteUrl && item.siteUrl !== "#" && (
              <a
                href={item.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors shadow-lg"
              >
                زيارة الموقع
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <div
            className="shrink-0 px-4 pb-6 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 justify-center min-w-min mx-auto">
              {items.map((thumb, i) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => onChange(i)}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    i === index
                      ? "border-purple-400 scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={thumb.image}
                    alt=""
                    fill
                    unoptimized={thumb.image.startsWith("/portfolio")}
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
