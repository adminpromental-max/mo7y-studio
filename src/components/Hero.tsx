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
      className="relative min-h-screen flex items-center overflow-hidden pt-20 scroll-mt-20"
    >
      <HeroBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image — mobile first, desktop left (RTL col 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-start"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] aspect-square"
            >
              <Image
                src={heroSrc}
                alt="معدات تصوير احترافية"
                fill
                unoptimized
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 1024px) 280px, 380px"
                onError={() => setHeroSrc(HERO_IMAGE_FALLBACK)}
              />
            </motion.div>
          </motion.div>

          {/* Text — mobile second, desktop right (RTL col 1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-right"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md text-purple-700 text-sm font-medium mb-6 border border-purple-200/50 shadow-sm"
            >
              استوديو تصوير ومونتاج احترافي
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 mb-6">
              نحول{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-purple-400">
                لحظاتك
              </span>{" "}
              إلى ذكريات خالدة
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 lg:mr-0 leading-relaxed">
              {SITE.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 hover:-translate-y-0.5"
              >
                احجز الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-purple-600 text-purple-600 font-semibold hover:bg-purple-50/80 backdrop-blur-sm transition-all"
              >
                شاهد أعمالنا
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-purple-200/50">
              {[
                { value: "+10", label: "سنوات خبرة" },
                { value: "+500", label: "مشروع منجز" },
                { value: "+200", label: "عميل سعيد" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
