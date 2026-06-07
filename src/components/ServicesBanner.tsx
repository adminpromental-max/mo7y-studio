"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Clapperboard,
  Sparkles,
  Palette,
  Film,
  Wand2,
} from "lucide-react";

const icons = [Camera, Clapperboard, Film, Palette, Sparkles, Wand2];

export default function ServicesBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mt-16 overflow-hidden rounded-3xl border border-purple-200/60"
    >
      {/* Light premium gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-violet-100 via-purple-50 to-cyan-50" />

      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
      />

      {/* Floating decorative dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          className="absolute w-2 h-2 rounded-full bg-purple-400/40"
          style={{
            top: `${20 + i * 12}%`,
            right: `${10 + i * 14}%`,
          }}
        />
      ))}

      <div className="relative px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
        {/* Animated icons row */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {icons.map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm border border-purple-100 flex items-center justify-center"
            >
              <Icon className="w-5 h-5 text-purple-600" />
            </motion.div>
          ))}
        </div>

        <motion.p
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-base sm:text-lg md:text-xl font-bold text-purple-800 text-center sm:text-right leading-relaxed"
        >
          نعمل بأحدث برامج التصوير والمونتاج لضمان أفضل النتائج
        </motion.p>
      </div>
    </motion.div>
  );
}
