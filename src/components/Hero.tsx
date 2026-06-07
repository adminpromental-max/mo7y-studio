"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SITE, HERO_IMAGE, HERO_IMAGE_FALLBACK } from "@/lib/constants";

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
});

export default function Hero() {
  const [heroSrc, setHeroSrc] = useState(HERO_IMAGE);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] lg:min-h-screen flex items-start lg:items-center overflow-hidden pt-16 sm:pt-20 scroll-mt-16 sm:scroll-mt-20"
    >
      <HeroBackground />

      <div className="relative z-10 w-full max-w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-16 items-center">
          {/* Image — أولاً على الموبايل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-start"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px] xl:w-[340px] xl:h-[340px]"
            >
              <Image
                src={heroSrc}
                alt="معدات تصوير احترافية"
                fill
                unoptimized
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 340px"
                onError={() => setHeroSrc(HERO_IMAGE_FALLBACK)}
              />
            </motion.div>
          </motion.div>

          {/* Text — تحت الصورة على الموبايل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1 text-center lg:text-right min-w-0"
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="inline-block px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-purple-700 text-xs sm:text-sm font-medium mb-3 sm:mb-5 border border-purple-200/50 shadow-sm"
            >
              استوديو تصوير ومونتاج احترافي
            </motion.span>

            <h1 className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-snug sm:leading-tight text-gray-900 mb-3 sm:mb-6">
              نحول{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-purple-400">
                لحظاتك
              </span>{" "}
              إلى ذكريات خالدة
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {SITE.description}
            </p>

            <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="#booking"
                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-purple-600 text-white text-sm sm:text-base font-semibold hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/30"
              >
                احجز الآن
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-purple-600 text-purple-600 text-sm sm:text-base font-semibold hover:bg-purple-50/80 backdrop-blur-sm transition-all"
              >
                شاهد أعمالنا
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-5 sm:mt-12 pt-4 sm:pt-8 border-t border-purple-200/50">
              {[
                { value: "+10", label: "سنوات خبرة" },
                { value: "+500", label: "مشروع منجز" },
                { value: "+200", label: "عميل سعيد" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-purple-600">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
