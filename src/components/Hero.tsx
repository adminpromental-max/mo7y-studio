"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Layers,
  Camera,
  Video,
  Film,
  Globe,
  TrendingUp,
} from "lucide-react";
import { SITE, HERO_IMAGE, HERO_IMAGE_FALLBACK } from "@/lib/constants";

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
});

const servicePills = [
  { icon: Layers, label: "محتوى بصري" },
  { icon: Camera, label: "تصوير" },
  { icon: Video, label: "فيديو" },
  { icon: Film, label: "مونتاج" },
  { icon: Globe, label: "مواقع" },
  { icon: TrendingUp, label: "نمو رقمي" },
];

export default function Hero() {
  const [heroSrc, setHeroSrc] = useState(HERO_IMAGE);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleImageError = () => {
    if (!triedFallback) {
      setTriedFallback(true);
      setHeroSrc(HERO_IMAGE_FALLBACK);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] lg:min-h-screen flex items-start lg:items-center overflow-hidden pt-16 sm:pt-20 scroll-mt-16 sm:scroll-mt-20"
    >
      <HeroBackground />

      {/* desktop scrim — يحمي النص من خلفية الـ 3D */}
      <div
        className="hidden lg:block absolute inset-y-0 right-0 w-[58%] z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 55%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* صورة الهيرو */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-center xl:justify-start"
          >
            <div className="relative w-full max-w-[200px] sm:max-w-[280px] lg:max-w-[460px] xl:max-w-[520px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 m-auto aspect-square pointer-events-none scale-[1.15] lg:scale-[1.1]"
              >
                {servicePills.map((pill, i) => {
                  const angle =
                    (i / servicePills.length) * 2 * Math.PI - Math.PI / 2;
                  const r = 50;
                  const x = 50 + Math.cos(angle) * r;
                  const y = 50 + Math.sin(angle) * r;
                  const Icon = pill.icon;
                  return (
                    <motion.div
                      key={pill.label}
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl bg-white/95 backdrop-blur-sm shadow-md border border-purple-100 flex items-center justify-center"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-square w-full"
              >
                <div className="absolute inset-[12%] rounded-full bg-purple-300/10 blur-2xl" />
                <Image
                  src={heroSrc}
                  alt="Mo7y Studio — شريك نمو علامتك التجارية"
                  fill
                  unoptimized
                  className="object-contain drop-shadow-[0_20px_50px_rgba(107,40,217,0.15)]"
                  priority
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 520px"
                  onError={handleImageError}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* النص */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1 text-center lg:text-right min-w-0 relative"
          >
            <div className="lg:bg-white/60 lg:backdrop-blur-sm lg:rounded-3xl lg:p-6 xl:p-8 lg:border lg:border-white/80">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-purple-700 text-xs sm:text-sm font-medium mb-3 sm:mb-5 border border-purple-200/50 shadow-sm"
              >
                Mo7y Studio — حلول نمو متكاملة
              </motion.span>

              <h1 className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-snug sm:leading-tight text-gray-900 mb-2 sm:mb-4">
                {SITE.tagline}
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-purple-400 mb-3 sm:mb-5">
                {SITE.taglineSub}
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {SITE.description}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4 sm:mb-6">
                {servicePills.map((pill) => {
                  const Icon = pill.icon;
                  return (
                    <span
                      key={pill.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-purple-100 text-gray-700 text-xs sm:text-sm shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-purple-600" />
                      {pill.label}
                    </span>
                  );
                })}
              </div>

              <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/booking"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-purple-600 text-white text-sm sm:text-base font-semibold hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/30"
                >
                  احجز استشارة
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-purple-600 text-purple-600 text-sm sm:text-base font-semibold hover:bg-purple-50/80 backdrop-blur-sm transition-all"
                >
                  خدماتنا
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-purple-200/50">
                {[
                  { value: "6", label: "خدمات متكاملة" },
                  { value: "+500", label: "مشروع منجز" },
                  { value: "+200", label: "عميل راضي" },
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
