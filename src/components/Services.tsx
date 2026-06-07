"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { mainServices, extraServiceChips } from "@/data/services";
import ServicesBanner from "./ServicesBanner";
import { COLORS } from "@/lib/constants";

const ServiceCardCanvas = dynamic(() => import("./ServiceCardCanvas"), {
  ssr: false,
});

const cardThemes: Record<
  string,
  { color: string; accent: string; gradient: string; border: string }
> = {
  photo: {
    color: COLORS.primary,
    accent: COLORS.primaryLight,
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
    border: "border-violet-200/80 hover:border-violet-400",
  },
  video: {
    color: COLORS.accentCyan,
    accent: "#38BDF8",
    gradient: "from-cyan-500/20 via-sky-400/10 to-transparent",
    border: "border-cyan-200/80 hover:border-cyan-400",
  },
  montage: {
    color: COLORS.accentYellow,
    accent: "#FBBF24",
    gradient: "from-amber-500/20 via-yellow-400/10 to-transparent",
    border: "border-amber-200/80 hover:border-amber-400",
  },
  creative: {
    color: "#A855F7",
    accent: COLORS.accentRed,
    gradient: "from-fuchsia-500/20 via-pink-400/10 to-transparent",
    border: "border-fuchsia-200/80 hover:border-fuchsia-400",
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden scroll-mt-20"
      style={{
        background: `
          radial-gradient(ellipse 60% 40% at 90% 10%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 50% 30% at 10% 90%, rgba(0, 180, 216, 0.06) 0%, transparent 50%),
          #faf8ff
        `,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            ما نقدمه
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            خدماتنا
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من خدمات التصوير والإنتاج المرئي والمونتاج
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            const theme = cardThemes[service.id];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group relative overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-sm shadow-md hover:shadow-xl transition-shadow duration-300 ${theme.border}`}
              >
                {/* 3D canvas header */}
                <div className="relative h-36 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}
                  />
                  <ServiceCardCanvas
                    serviceId={service.id}
                    color={theme.color}
                    accent={theme.accent}
                  />
                  <div className="absolute bottom-3 right-4 z-10 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center">
                    <Icon className="w-5 h-5" style={{ color: theme.color }} />
                  </div>
                </div>

                <div className="p-6 pt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto"
        >
          {extraServiceChips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-purple-100 text-gray-700 text-sm shadow-sm"
            >
              <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              {chip}
            </span>
          ))}
        </motion.div>

        <ServicesBanner />
      </div>
    </section>
  );
}
