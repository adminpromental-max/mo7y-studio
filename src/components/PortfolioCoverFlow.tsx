"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";

interface Props {
  items: PortfolioItem[];
  isVideo?: boolean;
  onOpen: (index: number) => void;
  activeIndex: number;
  onSelect: (index: number) => void;
}

const TWEEN_FACTOR = 0.52;

export default function PortfolioCoverFlow({
  items,
  isVideo,
  onOpen,
  activeIndex,
  onSelect,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: items.length > 2,
    align: "center",
    direction: "rtl",
    skipSnaps: false,
    dragFree: false,
  });

  const [slideStyles, setSlideStyles] = useState<
    { scale: number; opacity: number; rotateY: number }[]
  >([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.scrollSnapList().length;

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }

      const tween =
        1 - Math.min(Math.abs(diffToTarget * slidesInView * TWEEN_FACTOR), 1);
      const rotateY = Math.max(-42, Math.min(42, diffToTarget * slidesInView * -55));

      return {
        scale: 0.72 + tween * 0.28,
        opacity: 0.45 + tween * 0.55,
        rotateY,
      };
    });

    setSlideStyles(styles);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("reInit", onScroll);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("select", () => {
      onSelect(emblaApi.selectedScrollSnap());
      onScroll();
    });
    return () => {
      emblaApi.off("reInit", onScroll);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onScroll, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(activeIndex, true);
  }, [activeIndex, emblaApi, items]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 py-16">لا توجد عناصر في هذا التصنيف</p>
    );
  }

  return (
    <div className="relative mb-10">
      <div className="overflow-hidden px-1" ref={emblaRef}>
        <div className="flex touch-pan-y" style={{ backfaceVisibility: "hidden" }}>
          {items.map((item, index) => {
            const style = slideStyles[index] ?? {
              scale: index === 0 ? 1 : 0.72,
              opacity: index === 0 ? 1 : 0.45,
              rotateY: 0,
            };
            const isPortrait = item.aspect === "portrait";
            const isLandscape = item.aspect === "landscape";

            return (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_58%] lg:flex-[0_0_42%] pl-3 sm:pl-4"
                style={{ perspective: "1200px" }}
              >
                <button
                  type="button"
                  onClick={() => onOpen(index)}
                  className="w-full block text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl"
                  style={{
                    transform: `scale(${style.scale}) rotateY(${style.rotateY}deg)`,
                    opacity: style.opacity,
                    transition: "transform 0.35s ease, opacity 0.35s ease",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl shadow-xl bg-gray-900 ${
                      isPortrait
                        ? "aspect-[9/16] max-h-[420px] mx-auto max-w-[240px] sm:max-w-[280px]"
                        : isLandscape
                          ? "aspect-video"
                          : "aspect-[4/5] sm:aspect-square"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 78vw, 42vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                          <Play
                            className="w-7 h-7 text-purple-600 mr-0.5"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 left-0 p-4">
                      <p className="text-white font-semibold text-sm sm:text-base drop-shadow-md">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-2 z-10 w-10 h-10 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors"
            aria-label="التالي"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-2 z-10 w-10 h-10 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors"
            aria-label="السابق"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </>
      )}

      <p className="text-center text-xs text-gray-400 mt-4">
        اسحب يمين وشمال أو اضغط على الصورة للتكبير
      </p>
    </div>
  );
}
